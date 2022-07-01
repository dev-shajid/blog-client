import React from 'react'
import styles from '../styles/Post.module.css'
import Link from 'next/link'

const Post = ({post}) => {
  return (
    <>
      {/* single post here */}
      <div className={styles.post}>
        <div className={styles.post_header}>
          {/* post image here */}
        </div>
        <div className={styles.post_body}>
          <div className={styles.post_author}>
            <div className={styles.post_author_image}>

            </div>
            <div className={styles.post_author_details}>
              <div className={styles.post_author_name}>Mohammed Sajidul Islam</div>
              <div className={styles.post_published_time}>5 minutes ago</div>
            </div>
          </div>
          <div className={styles.post_title}>
            <Link href={`/post/${post.id}`}>{post.title}</Link>
          </div>
          <div className={styles.post_tags}>
            {
              /* tags here */
              ['HTML', 'CSS', 'JavaScript','React JS'].map((tag, index) => {
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
          <div className={styles.post_reacts}>
            <div className={styles.post_like}>Like</div>
            <div className={styles.post_comment}>Comment</div>
          </div>
          <div className={styles.post_save_button}>
            Save
          </div>
        </div>
      </div>
    </>
  )
}

export default Post