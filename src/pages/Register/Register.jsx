import styles from "./Register.module.css"
import registerImage from "../../assets/images/registerImage.png"
import FormInput from "../../components/FormInput/FormInput"
import { MdVisibility, MdVisibilityOff } from "react-icons/md"
import Button from "../../components/Button/Button"
import { useState } from "react"

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => {
    setShowPassword((visibility) => !visibility);
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}></div>
      <div className={styles.body}>
        <form className={styles.form}>
          <div style={{display: "flex", flexDirection: "column", gap: "0.5rem"}}>
            <p className={styles.title}>uTask 3.0</p>
            <span className={styles.divisor2} />
          </div>
          <p style={{fontSize: "20px", fontWeight: "600", alignSelf: "flex-start"}}>Crie uma conta</p>
          <FormInput label="Nome de usuário" type="name" placeholder="Seu nome de usuário" />
          <FormInput label="E-mail" type="email" placeholder="Endereço de e-mail" />
          <FormInput label="Senha" type={showPassword ? "text" : "password"} placeholder="Senha secreta">
            {showPassword ? (<MdVisibility size={25} color="#395B8A" onClick={toggleVisibility} style={{ cursor: "pointer" }} />) 
            : (<MdVisibilityOff size={25} color="#395B8A" onClick={toggleVisibility} style={{ cursor: "pointer" }} />)}
          </FormInput>
          <FormInput label="Confirme a senha" type={showPassword ? "text" : "password"} placeholder="Senha secreta">
            {showPassword ? (<MdVisibility size={25} color="#395B8A" onClick={toggleVisibility} style={{ cursor: "pointer" }} />) 
            : (<MdVisibilityOff size={25} color="#395B8A" onClick={toggleVisibility} style={{ cursor: "pointer" }} />)}
          </FormInput>
          <Button value="Criar cadastro" />
        </form>
        <span className={styles.divisor1} />
        <img src={registerImage} alt='register-image' />
      </div>
    </div>
  )
}

export default Register