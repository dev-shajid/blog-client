import Transitions from '../components/Transitions'
import style from '../styles/Home.module.css'
import Posts from '../components/Posts'
import LeftNav from '../components/LeftNav'

export default function Home() {
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