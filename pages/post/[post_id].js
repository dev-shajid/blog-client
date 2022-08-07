import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

export const getPost =async (id) => {
  // new Promise(resolve=>setTimeout(id && resolve, 1000))

  if(id){
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(res=>res.json())
    .then(data=>data)
  }else{
    return {}
  }
}

const Post = () => {

  const {query:{post_id}} = useRouter()

  const { data, isLoading, isError, error } = useQuery(['post', { post_id }], ()=>getPost(post_id))

  if(isError){
    return <h1 style={{maxWidth:'800px',margin:'20px auto ', fontSize:"30px", fontWeight:'normal'}}>Error : {error.message}</h1>
  }

  return (
    <div className='post_page' style={{maxWidth:'800px',margin:'20px auto ', fontSize:"16px"}}>
      {
        isLoading?
          <h1 style={{fontWeight:'normal'}}>Loading...</h1>
          :
          data && <>
          <h1 style={{fontWeight:'normal'}}>{data.id}. {data.title}</h1>
          <p>{data.body}</p>
          </>
      }
    </div>
  )
}

export default Post