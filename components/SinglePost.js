import React, { useState } from 'react'
import styles from '../styles/SinglePost.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { Avatar } from '@mui/material'
import Moment from 'react-moment';

const SinglePost = ({ post }) => {
    
    return (
        <>
            {/* single post here */}
            <div className={styles.post}>
                <div className={styles.post_cover_image}>
                    {/* post image here */}
                    {post.image && <BlurImage image={post.image} />}
                </div>
                <div className={styles.post_body}>
                    <div className={styles.post_author}>
                        <div className={styles.post_author_image}>
                            <Avatar sx={{height:'100%', width:'100%'}} alt={post.user.name} src='https://mui.com/static/images/avatar/1.jpg' />
                        </div>
                        <div className={styles.post_author_details}>
                            <div className={styles.post_author_name}>{post.user.name}</div>
                            <div className={styles.post_published_time}><Moment fromNow>{post.createdAt}</Moment></div>
                        </div>
                    </div>
                    <div className={styles.post_title}>
                        <Link href={`/post/${post._id}`} passHref>{post.title}</Link>
                    </div>
                    <div className={styles.post_tags}>
                        {
                            /* tags here */
                            post.tags && post.tags.split(',').map((tag, index) => {
                                return (
                                    <div key={index} className={styles.post_tag}>
                                        #{tag}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className={styles.post_footer}>
                    <div className={styles.post_save_button}>
                        Save
                    </div>
                </div>
            </div>
        </>
    )
}

export default SinglePost


const BlurImage = ({ image }) => {
    const [loading, setLoading] = useState(true)
    return (
        <Image
            src={image}
            width={500}
            height={400}
            objectFit='cover'
            className={`${styles.img} ${loading ? styles.loading : styles.not_loading}`}
            onLoadingComplete={() => setTimeout(() => setLoading(false), 100)}
        />
    )
}