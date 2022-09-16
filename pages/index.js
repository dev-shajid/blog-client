import Head from 'next/head'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Transitions from '../components/Transitions'
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
      <Posts />
    )
  }

  return <></>

}