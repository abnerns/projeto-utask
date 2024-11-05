import { MdClose } from 'react-icons/md'
import styles from './TaskModal.module.css'

const TaskModal = () => {
  return (
    <div className={styles.overlay}>
        <div className={styles.modal}>
            <span style={{display: "flex", justifyContent: "flex-end", gap: "7rem"}}>
                <p className={styles.title}>Nova Task</p>
                <MdClose size={32} className={styles.closeIcon} />
            </span>
            <form className={styles.form}>
                <div>
                    <label>Título *</label>
                    <input></input>
                </div>
                <div>
                    <label>Descrição</label>
                    <textarea></textarea>
                </div>
                <button>Criar task</button>
            </form>
        </div>
    </div>
  )
}

export default TaskModal