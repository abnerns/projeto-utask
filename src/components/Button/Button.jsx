import PropTypes from "prop-types";
import styles from "./Button.module.css"


const Button = ({value}) => {
  return (
    <button className={styles.btn}>
        <p className={styles.btnText}>{value}</p>
    </button>
  )
}

Button.propTypes = {
    value: PropTypes.string,
  };

export default Button