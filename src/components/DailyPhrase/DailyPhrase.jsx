import { MdTipsAndUpdates } from 'react-icons/md'
import styles from './DailyPhrase.module.css'
import PropTypes from 'prop-types'

const DailyPhrase = ({ darkMode, responsive }) => {

  return responsive ? (
    <div style={{display: "flex", flexDirection: "column", gap: "1rem"}} className={darkMode ? styles.dark : ''}>
      <div style={{display: "flex", alignItems: "center", gap: "1rem"}}>
        <div className={styles.icon}><MdTipsAndUpdates size={30} /></div>
        <p style={{fontWeight: "bold"}}>Frase do dia</p>
      </div>
      <p>Se você quer um pedacinho do paraíso, acredite em Deus. Mas se você quer conquistar o mundo, acredite em você porque Deus já te deu tudo o que você precisa para você vencer.</p>
    </div>
  ) : (
    <div className={`${styles.container} ${darkMode ? styles.dark : ''}`}>
      <div className={styles.icon}><MdTipsAndUpdates size={30} /></div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <p style={{ fontSize: '12px', fontWeight: 'bold' }}>Frase do dia</p>
        <p>Se você quer um pedacinho do paraíso, acredite em Deus...</p>
      </div>
    </div>
  );
};

DailyPhrase.propTypes = {
  darkMode: PropTypes.bool
}

export default DailyPhrase