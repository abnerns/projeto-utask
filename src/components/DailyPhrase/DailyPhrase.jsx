import { MdTipsAndUpdates } from 'react-icons/md'
import styles from './DailyPhrase.module.css'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react';

const DailyPhrase = ({ darkMode, responsive }) => {
  const [phrase, setPhrase] = useState('');

  useEffect(() => {
    const fetchPhrase = async () => {
      try {
        const response = await fetch('https://api.adviceslip.com/advice');
        const data = await response.json();
        const englishPhrase = data.slip.advice;

        const translate = await fetch(
          `https://api.mymemory.translated.net/get?q=${encodeURIComponent(englishPhrase)}&langpair=en|pt-BR`
        );
        const translateData = await translate.json();
        const translatePhrase = translateData.responseData.translatedText;

        setPhrase(translatePhrase);
      } catch (error) {
        console.error('Erro ao buscar ou traduzir a frase:', error);
      }
    };

    fetchPhrase();
  }, []);

  return responsive ? (
    <div style={{display: "flex", flexDirection: "column", gap: "1rem"}} className={darkMode ? styles.dark : ''}>
      <div style={{display: "flex", alignItems: "center", gap: "1rem"}}>
        <div className={styles.icon}><MdTipsAndUpdates size={30} /></div>
        <p style={{fontWeight: "bold"}}>Frase do dia</p>
      </div>
      <p>{phrase || 'Carregando...'}</p>
    </div>
  ) : (
    <div className={`${styles.container} ${darkMode ? styles.dark : ''}`}>
      <div className={styles.icon}><MdTipsAndUpdates size={30} /></div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <p style={{ fontSize: '12px', fontWeight: 'bold' }}>Frase do dia</p>
        <p>{phrase || 'Carregando...'}</p>
      </div>
    </div>
  );
};

DailyPhrase.propTypes = {
  darkMode: PropTypes.bool
}

export default DailyPhrase