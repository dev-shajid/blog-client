import React, { useEffect, useState } from 'react'
import Transitions from '../../components/Transitions'
import { getSession, useSession } from 'next-auth/react'
import PostEditor from '../../components/PostEditor'
import style from '../../styles/CreatePost.module.css'
import LoadingOverlay from '../../components/LoadingOverlay'
import { useRouter } from 'next/router'

export const getServerSideProps = async (context) => {
  const session = await getSession(context)
  if (session?.user?.name) {
    return {
      props: {}
    }
  } else {
    return {
      redirect: {
        permanent: false,
        destination: `/login`
      }
    }
  }
}

const Post = () => {
  const [active, setActive] = useState(false)
  const { data: session, status } = useSession()
  const router = useRouter()

  if(status == 'unauthenticated'){
    router.push('/login')
  }
  
  return (
    <>
      <LoadingOverlay overlay={active} />
      <Transitions>
        <section>
          {/* <h1 className={style.page_title}>Create New Post</h1> */}
          <PostEditor setActive={setActive} />
        </section>
      </Transitions>
    </>
  )
}

export default Post