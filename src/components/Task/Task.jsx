import { MdDeleteOutline, MdExpandLess, MdExpandMore, MdMoreVert, MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import styles from './Task.module.css';
import { useState } from 'react';
import PropTypes from 'prop-types';

const Task = ({ id, title, description, onDelete }) => {
  const [expand, setExpand] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const toggleExpand = () => {
    setExpand(!expand);
  };

  const handleDelete = () => {
    setShowDelete(!showDelete);
  };

  const deleteTask = () => {
    onDelete(id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.taskItem}>
        <p style={{ fontWeight: '600' }}>{title}</p>
        <span style={{display: "flex", flexDirection: "column", position: "relative"}}>
            <MdMoreVert size={20} onClick={handleDelete} style={{ cursor: 'pointer', color: showDelete ? "#226ED8" : "inherit" }} />
            {showDelete && (
            <button onClick={deleteTask} className={styles.deleteButton}><MdDeleteOutline />Excluir</button>
            )}
        </span>
      </div>
      <div className={styles.taskItem}>
        <div>
          <span
            style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer', color: expand ? '#002D6C' : 'inherit' }} onClick={toggleExpand}>
            <p style={{ fontSize: '12px' }}>{expand ? 'Esconder descrição' : 'Ler descrição'}</p>
            {expand ? <MdExpandLess size={20} /> : <MdExpandMore size={20} />}
          </span>
          <p style={{ fontSize: '12px', display: expand ? 'block' : 'none' }}>{description}</p>
        </div>
        <span style={{ display: 'flex', gap: '0.5rem', alignSelf: 'flex-end' }}>
          <MdNavigateBefore color='#226ED8' size={26} className={styles.navigateBefore} />
          <MdNavigateNext color='#FFF' size={26} className={styles.navigateNext} />
        </span>
      </div>
    </div>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  onDelete: PropTypes.func
};

export default Task;
