import PropTypes from "prop-types";
import styles from "./Button.module.css"


const Button = ({ value, onClick }) => {
  return (
    <button className={styles.btn} onClick={onClick}>
        <p className={styles.btnText}>{value}</p>
    </button>
  )
}

Button.propTypes = {
    value: PropTypes.string,
    onClick: PropTypes.func
  };

export default Button