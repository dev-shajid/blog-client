import React from 'react'
import styles from '../styles/LoadingPost.module.css'

const LoadingPost = (key) => {
  return (
    <>
      {/* single post here */}
      <div key={key} className={styles.post}>
        <div className={`${styles.post_header} skeleton_box`}>
          {/* post image here */}
        </div>
        <div className={`${styles.post_body} `}>
          <div className={styles.post_author}>
            <div className={`skeleton_box ${styles.post_author_image}`}>

            </div>
            <div className={styles.post_author_details}>
              <div className={`skeleton_box ${styles.post_author_name}`}></div>
              <div className={`skeleton_box ${styles.post_published_time}`}></div>
            </div>
          </div>
          <div className={`skeleton_box ${styles.post_title}`}></div>
          <div className={styles.post_tags}>
            {
              /* tags here */
              ['HTML', 'CSS', 'JavaScript','React JS'].map((tag, index) => {
                return (
                  <div key={index} className={`skeleton_box ${styles.post_tag}`}></div>
                )
              })
            }
          </div>
        </div>
        {/* <div className={styles.post_footer}>
          <div className={`${styles.post_reacts}`}>
            <div className={`skeleton_box ${styles.post_like}`}></div>
            <div className={`skeleton_box ${styles.post_comment}`}></div>
          </div>
          <div className={`skeleton_box ${styles.post_save_button}`}></div>
        </div> */}
      </div>
    </>
  )
}

export default LoadingPost