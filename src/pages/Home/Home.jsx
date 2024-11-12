import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Home.module.css';
import unectLogo from '../../assets/images/unectLogo.png';
import unectLogoDark from '../../assets/images/unectLogoDark.png';
import { MdAdd, MdClose, MdDarkMode, MdFavorite, MdLightMode, MdNavigateBefore, MdNavigateNext, MdTipsAndUpdates } from 'react-icons/md';
import DailyPhrase from '../../components/DailyPhrase/DailyPhrase';
import Task from '../../components/Task/Task';
import TaskModal from '../../components/TaskModal/TaskModal';
const url = 'http://localhost:3000/tasks';

const Home = () => {
  const [modal, setModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false)
  const [showDpModal, setShowDpModal] = useState(false);
  const [responsive, setResponsive] = useState(window.innerWidth <= 440);
  const [currentColumn, setCurrentColumn] = useState(0);

  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);
  const changeTheme = () => setDarkMode(!darkMode)
  const toggleDpModal = () => setShowDpModal(!showDpModal);

  const nextColumn = () => {
    setCurrentColumn((prevColumn) => (prevColumn + 1) % 3);
  };

  const previousColumn = () => {
    setCurrentColumn((prevColumn) => (prevColumn - 1 + 3) % 3);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(url);
        setTasks(res.data);
      } catch (error) {
        console.error("Erro ao buscar tasks:", error);
      }
    };
    fetchTasks();

    const handleResize = () => {
      setResponsive(window.innerWidth <= 440);
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${url}/${taskId}`);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Erro ao deletar a task:", error);
    }
  };

  const updateStatus = async (taskId, updateTask) => {
    try {
      await axios.put(`${url}/${taskId}`, updateTask);
      setTasks(tasks.map(task => task.id === taskId ? updateTask : task));
    } catch (error) {
      console.error("Erro ao atualizar status da task:", error);
    }
  };

  const moveTask = (taskId, direction) => {
    const task = tasks.find((task) => task.id === taskId);
    if (!task) return;

    let newStatus = task.status;
    if (direction === 'next') {
      if (task.status === 'A fazer') newStatus = 'Em andamento';
      else if (task.status === 'Em andamento') newStatus = 'Feito';
    } else if (direction === 'previous') {
      if (task.status === 'Feito') newStatus = 'Em andamento';
      else if (task.status === 'Em andamento') newStatus = 'A fazer';
    } else if (direction === 'replay') {
      if (task.status === "Feito") newStatus = 'A fazer';
    }

    if (newStatus !== task.status) {
      const updatedTask = { ...task, status: newStatus };
      updateStatus(taskId, updatedTask);
    }
  };

  return (
    <div className={`${styles.container} ${darkMode ? styles.dark : ''}`}>
      {modal && <TaskModal close={closeModal} addTask={handleTask} darkMode={darkMode} />}
      <div className={styles.header}>
        {darkMode ? <img src={unectLogoDark} alt='logo-unect-dark' /> : <img src={unectLogo} alt='logo-unect' />}
        <p className={styles.title}>uTask 3.0</p>
        <div className={styles.toggleIcon} onClick={changeTheme}>
          <MdLightMode className={styles.lightIcon} size={26} />
          <MdDarkMode className={styles.darkIcon} size={26} />
        </div>
      </div>
      <div className={styles.body}>
      {responsive ? (
        <button onClick={toggleDpModal} className={styles.responsiveBtn}>
          <div className={styles.responsiveIcon}><MdTipsAndUpdates size={30} /></div>
          <p style={{fontSize: "16px", fontWeight: "bold"}}>Frase do Dia</p>
        </button>
      ) : (<DailyPhrase darkMode={darkMode} />)}
      {showDpModal && (
        <div className={styles.overlay} onClick={toggleDpModal}>
          <div className={styles.dailyPhraseModal} onClick={(e) => e.stopPropagation()}>
          <MdClose className={styles.closeIcon} onClick={toggleDpModal} />
          <DailyPhrase darkMode={darkMode} responsive={responsive} />
          </div>
        </div>
      )}
      <div className={styles.taskContainer}>
      {responsive ? (
        <div>
          <div className={styles.responsiveContainer}>
            <MdNavigateBefore size={40} onClick={previousColumn} className={styles.navButton} />
            <div className={styles.taskColumn}>
              {currentColumn === 0 && (
                <div>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <p style={{ fontSize: '20px' }}>A fazer</p>
                    <MdAdd size={30} className={styles.addIcon} onClick={openModal} />
                  </span>
                  <div className={styles.taskBox}>
                    {tasks.filter(task => task.status === 'A fazer').map(task => (
                      <Task 
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        description={task.description}
                        onMove={moveTask}
                        darkMode={darkMode}
                      />
                    ))}
                  </div>
                </div>
              )}
              {currentColumn === 1 && (
                <div>
                  <p style={{ fontSize: '20px' }}>Em andamento</p>
                  <div className={styles.taskBox}>
                    {tasks.filter(task => task.status === 'Em andamento').map(task => (
                      <Task 
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        description={task.description}
                        onMove={moveTask}
                        darkMode={darkMode}
                      />
                    ))}
                  </div>
                </div>
              )}
              {currentColumn === 2 && (
                <div>
                  <p style={{ fontSize: '20px' }}>Feito</p>
                  <div className={styles.taskBox}>
                    {tasks.filter(task => task.status === 'Feito').map(task => (
                      <Task 
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        description={task.description}
                        onMove={moveTask}
                        darkMode={darkMode}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
            <MdNavigateNext size={40} onClick={nextColumn} className={styles.navButton} />
          </div>
          <div className={styles.navDots}>
            <div className={`${styles.dot} ${currentColumn === 0 ? styles.active : ''}`} />
            <div className={`${styles.dot} ${currentColumn === 1 ? styles.active : ''}`} />
            <div className={`${styles.dot} ${currentColumn === 2 ? styles.active : ''}`} />
          </div>
        </div>
      ) : (
        <div className={styles.taskContainer}>
          <div className={styles.taskColumn}>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <p style={{ fontSize: '20px' }}>A fazer</p>
              <MdAdd size={30} className={styles.addIcon} onClick={openModal} />
            </span>
            <div className={styles.taskBox}>
              {tasks.filter(task => task.status === 'A fazer').map(task => (
                <Task
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  onDelete={deleteTask}
                  onMove={moveTask}
                  status={task.status}
                  darkMode={darkMode}
                />
              ))}
            </div>
          </div>
          <div className={styles.taskColumn}>
            <p style={{ fontSize: '20px' }}>Em andamento</p>
            <div className={styles.taskBox}>
              {tasks.filter(task => task.status === 'Em andamento').map(task => (
                <Task
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  onMove={moveTask}
                  darkMode={darkMode}
                />
              ))}
            </div>
          </div>
          <div className={styles.taskColumn}>
            <p style={{ fontSize: '20px' }}>Feito</p>
            <div className={styles.taskBox}>
              {tasks.filter(task => task.status === 'Feito').map(task => (
                <Task
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  onMove={moveTask}
                  status={task.status}
                  darkMode={darkMode}
                />
              ))}
            </div>
          </div>
        </div>
      )}
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
