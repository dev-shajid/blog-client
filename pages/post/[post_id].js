import React from 'react'

export async function getServerSideProps({params}) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?id=${params.post_id}`)
  const post = await res.json()

  return {
    props: {
      post:post[0],
    },
  }
}

const post = ({post}) => {
  
  return (
    <div className='post_page' style={{maxWidth:'800px',margin:'20px auto ', fontSize:"16px"}}>
      <h1 style={{fontWeight:'normal'}}>{post.id}. {post.title}</h1>
      <p>{post.body}</p>
    </div>
  )
}

export default post