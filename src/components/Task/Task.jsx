import { MdExpandLess, MdExpandMore, MdMoreVert, MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import styles from './Task.module.css';
import { useState } from 'react';
import PropTypes from 'prop-types';

const Task = ({ title, description }) => {
  const [expand, setExpand] = useState(false);

  const toggleExpand = () => {
    setExpand(!expand);
  };

  return (
    <div className={styles.container}>
      <div className={styles.taskItem}>
        <p style={{ fontWeight: '600' }}>{title}</p>
        <MdMoreVert size={20} />
      </div>
      <div className={styles.taskItem}>
        <div>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer', color: expand ? '#002D6C' : 'inherit' }} onClick={toggleExpand}>
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
    title: PropTypes.string,
    description: PropTypes.string
  };

export default Task;
