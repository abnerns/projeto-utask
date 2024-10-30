import { useEffect, useState } from "react";
import loginImage from "../../assets/images/loginImage.png"
import Button from "../../components/Button/Button";
import FormInput from "../../components/FormInput/FormInput"
import styles from "./Login.module.css"
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Link } from "react-router-dom"
import axios from "axios"
const url = "http://localhost:5173/users"

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const userRegex = /^[A-z][A-z0-9-_]{3,23}$/;
  const passwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

  const toggleVisibility = () => {
    setShowPassword((visibility) => !visibility);
  }

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
                    <FormInput label="Senha" type={showPassword ? "text" : "password"} placeholder="Senha secreta">
                      {showPassword ? (<MdVisibility size={25} color="#395B8A" onClick={toggleVisibility} style={{ cursor: "pointer" }} />) 
                      : (<MdVisibilityOff size={25} color="#395B8A" onClick={toggleVisibility} style={{ cursor: "pointer" }} />)}
                    </FormInput>
                    <p className={styles.senhaRecup}>Esqueceu a senha?</p>
                </div>
                <Button value="Entrar" />
                <span className={styles.divisor2} />
                <Link to="/register" className={styles.cadastro}>Não tem cadastro ? Crie uma conta</Link>
            </form>
        </div>
        
    </div>
  )
}

export default Login