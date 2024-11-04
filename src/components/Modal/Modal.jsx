import styles from './Modal.module.css'
import verifyModal from "../../assets/images/verifyModal.png"

const Modal = ({show, title, message}) => {
    if (!show) return null;

  return (
    <div className={styles.overlay}>
        <div className={styles.modal}>
            <span style={{display: "flex", gap: "0.5rem"}}>
            <img src={verifyModal} alt="Cadastro registrado" />
            <p style={{fontSize: "20px"}}>{title}</p>
            </span>
            <p>{message}</p>
        </div>
    </div>

  )
}

export default Modal