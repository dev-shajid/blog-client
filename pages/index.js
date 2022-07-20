import Head from 'next/head'
import React, { useEffect } from 'react'
import { useInfiniteQuery, QueryClient, dehydrate } from 'react-query'
import LoadingPost from '../components/LoadingPost'
import Post from '../components/Post'
import axios from 'axios'

// const CLIENT='https://shajib-blog.herokuapp.com'

const fetchPosts = async ({ pageParam = 1 }) => {
  await new Promise((res) => setTimeout(res, 1000))
  const res = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10&_page=' + pageParam)
  return res.data
}

export default function Home() {
  const { isLoading, isError, data, error, isFetching, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      'posts',
      fetchPosts,
      {
        getNextPageParam: (_, pages) => pages.length<10?pages.length+1:undefined
      }
    )

  // Infinite Scrolling Data Fetching
  useEffect(()=>{
    // after scrolling to the bottom of the page, fetch the next page
    const onScroll=(e)=>{
      const {scrollHeight, scrollTop, clientHeight} = e.target.scrollingElement
      if(scrollHeight - scrollTop <= clientHeight*1.3 && hasNextPage && !isFetching){
        fetchNextPage()
      }
    }

    document.addEventListener('scroll', onScroll)
    return ()=>document.removeEventListener('scroll', onScroll)
  },[isFetching])

  if (isError) return <div>Error! {JSON.stringify(error)}</div>

  return (
    <div>
      <Head>
        <title>Programming Blog Website</title>
        <meta name="description" content="This is a simple Programming Blog Website where you can share your idea or any content and problem." />
        <link rel="icon" href="/images/icon-72x72.png" />
      </Head>
      
      <div style={{ maxWidth: "700px", padding: "5px 10px", margin: "0 auto" }}>

        <h1 style={{textAlign:'center', fontSize:'3rem', fontWeight:'normal'}}>Infinite Scroll Post</h1><br/><br/>

        {
        isLoading ?
        [1,2].map((v,i)=><LoadingPost key={i}/>)
        :
        data?.pages?.map((page, i) => {
            return (
            <div key={i}>
                {page?.map((post, index) => (
                <div key={index}>
                    <Post post={post} />
                </div>
                ))}
            </div>
            )
        })
        }

      {isFetching && hasNextPage ? <LoadingPost/>: null}

    </div>

    </div>
  )
}

// export async function getStaticProps() {
//   const queryClient = new QueryClient();
//   await queryClient.prefetchQuery("posts", fetchPosts);

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// }