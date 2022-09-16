import { Avatar, Box, Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Moment from 'react-moment';
import Transitions from '../../components/Transitions';
import style from '../../styles/Post.module.css'
import { Checkbox } from '@mui/material';
import { FavoriteBorder, Favorite, BookmarkBorder, Bookmark } from '@mui/icons-material';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  if (session?.user?.name) {
    const res = await fetch(`${process.env.CLIENT_URL}/api/post/${ctx.query.postId}`)
    const data = await res.json()
    if(data){
      return {
        props: {
          post: data.message
        }
      }
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

// const fetchPost = async (postId) => {
//   const res = await axios.get(`/api/post/${postId}`)
//   return res.data.message
// }

const Post = ({ post: data }) => {
  // const { query: { postId } } = useRouter()
  // const { data, isLoading, isError, error } = useQuery(['singlePost'], () => fetchPost(postId))
  // console.log({ data, isLoading, isError, error });

  // if(isLoading){
  //   return <h1></h1>
  // }
  // if(isError){
  //   return JSON.stringify(error, 2)
  // }
  return (
    <>
      <Transitions>
        <section className={style.post_section}>
          <Box style={{position:'sticky !important', top:0}} className={style.post_react}>
            <Stack>
              <Checkbox
                {...label}
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
              />
              <Checkbox
                {...label}
                icon={<BookmarkBorder />}
                checkedIcon={<Bookmark />}
              />
            </Stack>
          </Box>
          <div className={style.post_details_container}>
            <div className={style.post_details}>
              <div className={style.post_cover_image}>
                <BlurImage image={data?.image} />
              </div>
              <div className={style.post_content_wrapper}>
                <div className={style.post_info}>
                  <div className={style.post_info_author_img}>
                    <Avatar sx={{ height: '100%', width: '100%', textTransform: 'uppercase' }} alt={data.user.name} src='/' />
                  </div>
                  <div className={style.post_info_time}>
                    <div className={style.post_info_author_name}>{data.user.name}</div>
                    <div className={style.post_time}>
                      <Moment fromNow>{data.createdAt}</Moment>
                    </div>
                  </div>
                </div>
                <div className={style.post_content}>
                  <div className={style.post_title}>This is post title</div>
                  <div className={style.post_tags}>
                    {[1, 2, 3, 4].map((tag, i) => (
                      <div className={style.post_tag} key={i}>
                        #{'React JS'}
                      </div>
                    ))}
                  </div>
                  <div className={style.post_description}>
                    {/* Preview Editor Html */}
                    <div className='ql-container ql-snow'>
                      <div className='ql-editor'>
                        <div dangerouslySetInnerHTML={{ __html: data.description }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={style.post_author_main_profile}>

          </div>
        </section>
      </Transitions>
    </>
  )
}

export default Post

const BlurImage = ({ image }) => {
  const [loading, setLoading] = useState(true)
  return (
    <Image
      src={image}
      width={500}
      height={400}
      objectFit='cover'
      className={`${style.img} ${loading ? style.loading : style.not_loading}`}
      onLoadingComplete={() => setTimeout(() => setLoading(false), 100)}
    />
  )
}