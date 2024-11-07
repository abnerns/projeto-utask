import { useState } from 'react';
import axios from 'axios';
import { MdClose } from 'react-icons/md';
import styles from './TaskModal.module.css';
const url = "http://localhost:3000/tasks";
import PropTypes from 'prop-types';

const TaskModal = ({ close, addTask, darkMode }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const createTask = async (e) => {
    e.preventDefault();

    const newTask = {
      title,
      description,
      status: 'A fazer'
    };

    try {
      const res = await axios.post(url, newTask);
      addTask(res.data);
      setTitle("");
      setDescription("");
      close();
    } catch (error) {
      console.error("Erro ao criar task:", error);
    }
  };

  return (
    <div className={`${styles.overlay} ${darkMode ? styles.dark : ''}`}>
      <div className={styles.modal}>
        <span style={{ display: 'flex', justifyContent: 'flex-end', gap: '7rem' }}>
          <p className={styles.title}>Nova Task</p>
          <MdClose size={32} className={styles.closeIcon} onClick={close} />
        </span>
        <form className={styles.form} onSubmit={createTask}>
          <div>
            <label>Título *</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <label>Descrição</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <button type="submit">Criar task</button>
        </form>
      </div>
    </div>
  );
};

TaskModal.propTypes = {
    close: PropTypes.func,
    addTask: PropTypes.func,
    darkMode: PropTypes.bool
  };

export default TaskModal;
