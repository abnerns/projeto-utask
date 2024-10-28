import loginImage from "../../assets/images/loginImage.png"
import Button from "../../components/Button/Button";
import FormInput from "../../components/FormInput/FormInput"
import styles from "./Login.module.css"
import { MdVisibilityOff } from "react-icons/md";

const Login = () => {
  return (
    <div className={styles.container}>
        <div className={styles.header}></div>
        <div className={styles.body}>
            <img src={loginImage} alt='logo-image' />
            <span className={styles.divisor1} />
            <form className={styles.form}>
                <p className={styles.title}>uTask 3.0</p>
                <FormInput label="E-mail" type="email" placeholder="Endereço de e-mail" />
                <div style={{display: "flex", flexDirection: "column", gap: "0.5rem"}}>
                    <FormInput label="Senha" type="password" placeholder="Senha secreta"><MdVisibilityOff size={25} color="#395B8A" /></FormInput>
                    <p className={styles.senhaRecup}>Esqueceu a senha?</p>
                </div>
                <Button value="Entrar" />
                <span className={styles.divisor2} />
                <p className={styles.cadastro}>Não tem cadastro ? Crie uma conta</p>
            </form>
        </div>
        
    </div>
  )
}

export default Login