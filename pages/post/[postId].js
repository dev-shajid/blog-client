import { Avatar, Box, Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getSession, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Moment from 'react-moment';
import Transitions from '../../components/Transitions';
import style from '../../styles/Post.module.css'
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';


export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  if (session?.user?.name) {
    const res = await fetch(`${process.env.CLIENT_URL}/api/post/${ctx.query.postId}`)
    const data = await res.json()
    // if(data){
    return {
      props: {
        post: data.message
      }
    }
    // }
  } else {
    return {
      redirect: {
        permanent: false,
        destination: `/login`
      }
    }
  }
}

const Post = ({ post: data }) => {
  const [checked, setChecked] = useState({ fav: false, save: false })
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status == 'unauthenticated') {
    router.push('/login')
  }

  return (
    <>
      {data?.user?.name && <Transitions>
        <section className={style.post_section}>
          <Box>
            <Box position='sticky' top='105px' className={style.post_react}>
              <Checkbox
                onClick={() => setChecked({ ...checked, fav: !checked.fav })}
                checked={checked.fav}
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                sx={{ color: 'red !important', display: 'block' }}
              />
              <Checkbox
                onClick={(e) => setChecked({ ...checked, save: !checked.save })}
                checked={checked.save}
                icon={<BookmarkBorderIcon />}
                checkedIcon={<BookmarkIcon />}
                sx={{ color: '#536bcd!important' }}
              />
            </Box>
          </Box>
          <div style={{ flex: 1, maxWidth: '100%' }}>
            <div className={style.post_details_container}>
              <div className={style.post_details}>
                <div className={style.post_cover_image}>
                  <BlurImage image={data?.image} />
                </div>
                <div className={style.post_content_wrapper}>
                  <div className={style.post_info}>
                    <div className={style.post_info_author_img}>
                      <Avatar sx={{ height: '100%', width: '100%', textTransform: 'uppercase' }} alt={data?.user?.name} src='/' />
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
                      <div className={`ql-container ql-snow ${style.post_page_ql_container}`}>
                        <div className='ql-editor'>
                          <div dangerouslySetInnerHTML={{ __html: data.description }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className={style.post_author_main_profile}>
              <div className={style.post_author_main_info}>
                <div className={style.post_author_main_img}>
                  <Avatar sx={{ height: '100%', width: '100%', textTransform: 'uppercase' }} alt={data?.user?.name} src='/' />
                </div>
                <div className={style.post_author_main_name}>{data?.user?.name}</div>
              </div>
              <div className={style.post_author_main_follow}>Follow</div>
              <div className={style.post_author_main_description}>
                I am a web developer, graphic designer, type designer, musician, comicbook-geek, LEGO-collector, food lover … as well as husband and father, located just south of Copenhagen, Denmark.
              </div>
            </div>
          </div>
        </section>
      </Transitions>}
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
