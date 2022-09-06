import Head from 'next/head'
import React, { useEffect, useRef } from 'react'
import { useInfiniteQuery, QueryClient, dehydrate } from '@tanstack/react-query'
import LoadingPost from '../components/LoadingPost'
import Post from '../components/Post'
import axios from 'axios'
import { useRouter } from 'next/router'

// const CLIENT='https://shajib-blog.herokuapp.com'

const fetchPosts = async ({ pageParam = 1 }) => {
  await new Promise((res) => setTimeout(res, 1000))
  const res = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10&_page=' + pageParam)
  return res.data
}

export default function Home() {
  const ref = useRef()

  const { isLoading, isError, data, error, isFetching, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      ['posts'],
      fetchPosts,
      {
        getNextPageParam: (_, pages) => pages.length<10?pages.length+1:undefined,
        // enabled:false,
      }
    )

  // Infinite Scrolling Data Fetching
  useEffect(()=>{
    // after scrolling to the bottom of the page, fetch the next page
    const onScroll=(e)=>{
      const {scrollHeight, scrollTop, clientHeight} = e.target.scrollingElement
      if(scrollHeight - scrollTop <= clientHeight*1.2 && ref.current && hasNextPage && !isFetching){
        console.log(ref.current)
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
      
      <div ref={ref} style={{ maxWidth: "700px", padding: "5px 10px", margin: "0 auto" }}>

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
