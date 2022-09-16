import { useRouter } from 'next/router'
import React from 'react'

const Post = () => { 
    const {query:{postId}} = useRouter()
  return (
    <>
        <h1>Post ID: {postId}</h1>
    </>
  )
}

export default Post