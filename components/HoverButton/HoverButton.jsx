import React from 'react'
import style from '../../styles/HoverButton.module.css'

const HoverButton = () => {
    
    const handleMove = (e) => {        
        e.target.style.setProperty("--x",e.clientX - e.target.offsetLeft + window.scrollX + "px")
        e.target.style.setProperty("--y", e.clientY - e.target.offsetTop + window.scrollY + "px")
    }

  return (
    <div onMouseMove={handleMove} className={`${style.hover_button}`}>
        Create New Account
    </div>     
  )
}

export default HoverButton