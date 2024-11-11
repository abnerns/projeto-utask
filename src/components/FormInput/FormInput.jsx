import styles from "./FormInput.module.css";
import PropTypes from "prop-types";

const FormInput = ({ label, type, placeholder, value, onChange, children, isInvalid }) => {
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <div className={`${styles.inputContainer} ${isInvalid ? styles.invalid : ""}`}>
        <input type={type} className={styles.input} placeholder={placeholder} value={value} onChange={onChange} required />
        {children}
      </div>
    </div>
  );
};

FormInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.node,
  isInvalid: PropTypes.string,
};

export default FormInput;
