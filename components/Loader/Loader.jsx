import React from 'react'
import style from './Loader.module.css'

const Loader = () => {
    return (
        <div className={style.loader_container}>
            <div className={style.loader}>
            <div className={style.loader__bar}></div>
            <div className={style.loader__bar}></div>
            <div className={style.loader__bar}></div>
            <div className={style.loader__bar}></div>
            <div className={style.loader__bar}></div>
            <div className={style.loader__ball}></div>
        </div>
        <h2>Loading...</h2>
        </div>
    )
}

export default Loader