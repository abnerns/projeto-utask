import styles from './Home.module.css'
import logoUnect from "../../assets/images/unectLogo.png"
import { MdAdd, MdFavorite, MdLightMode } from 'react-icons/md'
import DailyPhrase from '../../components/DailyPhrase/DailyPhrase'
import Task from '../../components/Task/Task'
import TaskModal from '../../components/TaskModal/TaskModal'
import { useState } from 'react'

const Home = () => {
  const[modal, setModal] = useState(false)

  const openModal = () => setModal(true)
  const closeModal = () => setModal(false)

  return (
    <div className={styles.container}>
      {modal && <TaskModal close={closeModal} />}
        <div className={styles.header}>
          <img src={logoUnect} alt='logo-unect' />
          <p style={{fontWeight: "bold", fontSize: "30px", color: "white"}}>uTask 3.0</p>
          <MdLightMode color='#FBB910' size={26} />
        </div>
        <div className={styles.body}>
          <DailyPhrase />
          <div className={styles.taskContainer}>
            <div style={{display: "flex", flexDirection: "column", gap: "0.5rem"}}>
              <span style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                <p style={{fontSize: "20px"}}>A fazer</p><MdAdd size={30} className={styles.addIcon} onClick={openModal} />
              </span>
              <div className={styles.taskBox}>
                <Task />
              </div>
            </div>
            <div style={{display: "flex", flexDirection: "column", gap: "0.5rem"}}>
              <p style={{fontSize: "20px"}}>Em andamento</p>
              <div className={styles.taskBox}>

              </div>
            </div>
            <div style={{display: "flex", flexDirection: "column", gap: "0.5rem"}}>
              <p style={{fontSize: "20px"}}>Feito</p>
              <div className={styles.taskBox}>

              </div>
            </div>
          </div>
        </div>
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