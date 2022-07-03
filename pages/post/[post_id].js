import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useQuery } from 'react-query';

export async function getServerSideProps({query}) {
  // const res = await fetch(`https://jsonplaceholder.typicode.com/posts?id=${params.post_id}`)
  // const post = await res.json()

  return {
    props: {
      query:query,
    },
  }
}

const Post = ({query: {post_id}}) => {
  const router = useRouter()

  const fetchPost = async (id) =>{
    await new Promise(resolve=>setTimeout(resolve, 500))
    const post = await axios.get(`https://jsonplaceholder.typicode.com/posts?id=${id}`)
    return post.data[0]
  }

  const { data,isError, error, status, isLoading } = useQuery(["blog_post", { post_id }], () => fetchPost(post_id) );

  if(isError){
    return <h1 style={{maxWidth:'800px',margin:'20px auto ', fontSize:"30px", fontWeight:'normal'}}>Error : {error.message}</h1>
  }

  return (
    <div className='post_page' style={{maxWidth:'800px',margin:'20px auto ', fontSize:"16px"}}>
      {
        isLoading?
          <h1 style={{fontWeight:'normal'}}>Loading...</h1>
          :
          <>
          <h1 style={{fontWeight:'normal'}}>{data.id}. {data.title}</h1>
          <p>{data.body}</p>
          </>
      }
    </div>
  )
}

export default Post