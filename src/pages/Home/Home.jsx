import styles from './Home.module.css'
import logoUnect from "../../assets/images/unectLogo.png"
import { MdFavorite, MdLightMode } from 'react-icons/md'
import DailyPhrase from '../../components/DailyPhrase/DailyPhrase'
import Task from '../../components/Task/Task'

const Home = () => {
  return (
    <div className={styles.container}>
        <div className={styles.header}>
          <img src={logoUnect} alt='logo-unect' />
          <p style={{fontWeight: "bold", fontSize: "30px", color: "white"}}>uTask 3.0</p>
          <MdLightMode color='#FBB910' size={26} />
        </div>
        <DailyPhrase />
        <Task />
        <div className={styles.footer}>
          <p>© Processo de Trainee <a href='https://unect.com.br/' target="_blank">Unect Jr. </a></p>
          <span style={{display: "flex", alignItems: "center", gap: "0.5rem"}}>
            <p>Feito com</p><MdFavorite color='#FFAFAF' /><p>por Abner</p>
          </span>
        </div>
    </div>
  )
}

export default Home