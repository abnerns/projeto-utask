import styles from "./FormInput.module.css"
import PropTypes from "prop-types"

const FormInput = ({label, type, placeholder, children}) => {
  return (
    <div className={styles.container}>
        <label>{label}</label>
        <div className={styles.inputContainer}>
            <input type={type} className={styles.input} placeholder={placeholder} required />
            {children}
        </div>
    </div>
  )
}

FormInput.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    children: PropTypes.node,
  };


export default FormInput