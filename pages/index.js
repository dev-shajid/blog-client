import Head from 'next/head'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Transitions from '../components/Transitions'
import style from '../styles/Home.module.css'
import Posts from '../components/Posts'
import LeftNav from '../components/LeftNav'

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
      <Transitions>
        <section className={style.container}>
          <LeftNav />
          <Posts />
          <div className={style.right_nav}></div>
        </section>
      </Transitions>
    )
  }

  return <></>

}