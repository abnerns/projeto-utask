import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Home.module.css';
import logoUnect from '../../assets/images/unectLogo.png';
import { MdAdd, MdFavorite, MdLightMode } from 'react-icons/md';
import DailyPhrase from '../../components/DailyPhrase/DailyPhrase';
import Task from '../../components/Task/Task';
import TaskModal from '../../components/TaskModal/TaskModal';
const url = 'http://localhost:3000/tasks';

const Home = () => {
  const [modal, setModal] = useState(false);
  const [tasks, setTasks] = useState([]);

  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(url)
        setTasks(res.data)
      } catch (error) {
        console.error("Erro ao buscar tasks:", error)
      }
    }
    fetchTasks()
  }, [])

  const handleTask = (newTask) => {
    setTasks([...tasks, newTask])
  }

  return (
    <div className={styles.container}>
      {modal && <TaskModal close={closeModal} addTask={handleTask} />}
      <div className={styles.header}>
        <img src={logoUnect} alt='logo-unect' />
        <p style={{ fontWeight: 'bold', fontSize: '30px', color: 'white' }}>uTask 3.0</p>
        <MdLightMode color='#FBB910' size={26} />
      </div>
      <div className={styles.body}>
        <DailyPhrase />
        <div className={styles.taskContainer}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <p style={{ fontSize: '20px' }}>A fazer</p>
              <MdAdd size={30} className={styles.addIcon} onClick={openModal} />
            </span>
            <div className={styles.taskBox}>
              {tasks.filter(task => task.status === 'A fazer').map(task => (
                  <Task key={task.id} title={task.title} description={task.description} />
                ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <p style={{ fontSize: '20px' }}>Em andamento</p>
            <div className={styles.taskBox}>
              {tasks.filter(task => task.status === 'Em andamento').map(task => (
                  <Task key={task.id} title={task.title} description={task.description} />
                ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <p style={{ fontSize: '20px' }}>Feito</p>
            <div className={styles.taskBox}>
              {tasks.filter(task => task.status === 'Feito').map(task => (
                  <Task key={task.id} title={task.title} description={task.description} />
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <p>© Processo de Trainee <a href='https://unect.com.br/' target="_blank">Unect Jr.</a></p>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <p>Feito com</p><MdFavorite color='#FFAFAF' /><p>por Abner</p>
        </span>
      </div>
    </div>
  );
};

export default Home;
