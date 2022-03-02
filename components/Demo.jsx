import React from 'react'
import { useRef } from 'react'
import style from '../styles/Demo.module.css'

const Demo = () => {
    const ref=useRef(null)

    const handleMove = (e) => {
       e.target.style.setProperty("--x", e.clientX - ref.current.offsetLeft + window.scrollX + "px")
       e.target.style.setProperty("--y", e.clientY - ref.current.offsetTop + window.scrollY + "px")        
    }

  return (
    <div ref={ref} className={style.demo_container}>
    
        <div onMouseMove={handleMove} className={style.cursor_container}>
            <div className={style.cursor}></div>
        </div>
        
        <div className={style.demo_title}>This is a Title</div>
        <div className={style.demo_des}>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</div>
    </div>
  )
}

export default Demo