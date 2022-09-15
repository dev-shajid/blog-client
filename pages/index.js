import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useSession, getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Transitions from '../components/Transitions'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import LoadingPost from '../components/LoadingPost'
import Post from '../components/Post'
import axios from 'axios'
import { usePostContext } from '../store'
import Posts from '../components/Posts'

// export const getServerSideProps = async (context) => {
//   const session = await getSession(context)
//   if (session?.user?.name) {
//     return {
//       props: {}
//     }
//   } else {
//     return {
//       redirect: {
//         permanent: false,
//         destination: `/login`
//       }
//     }
//   }
// }

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status == 'unauthenticated') {
    router.push('/login')
  }

  if (status == 'authenticated') {
    return (
      <Posts/>
    )
  }

  return <></>

}