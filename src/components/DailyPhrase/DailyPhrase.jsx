import { MdTipsAndUpdates } from 'react-icons/md'
import styles from './DailyPhrase.module.css'

const DailyPhrase = () => {
  return (
    <div className={styles.container}>
        <div className={styles.icon} ><MdTipsAndUpdates color='#FBB910' size={30} /></div>
        <div style={{display: "flex", flexDirection: "column", gap: "0.25rem"}}>
            <p style={{fontSize: "12px", fontWeight: "bold"}}>Frase do dia</p>
            <p>Se você quer um pedacinho do paraíso, acredite em Deus. Mas se você quer conquistar o mundo, acredite em você porque Deus já te deu tudo o que você precisa para você vencer.</p>
        </div>
    </div>
  )
}

export default DailyPhrase