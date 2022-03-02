import Head from 'next/head'
import { useEffect } from 'react'
import Demo from '../components/Demo'

export default function Home() {

  const CLIENT='https://shajib-blog.herokuapp.com'

  const getData = async () => {
    const res = await fetch(`${CLIENT}/api/post/get_posts`, {
      method: "get",
    })
    const data = await res.json()
    console.log(data);
  }

  useEffect(() => {
    getData()
    console.log(process.env.NEXT_PUBLIC);
  },[])

  return (
    <div>
      <Head>
        <title>Programming Blog Website</title>
        <meta name="description" content="This is a simple Programming Blog Website where you can share your idea or any content and problem." />
        <link rel="icon" href="/images/icon-72x72.png" />
      </Head>
      
      <Demo/>    

    </div>
  )
}
