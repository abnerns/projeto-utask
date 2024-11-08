import { useState } from "react";
import loginImage from "../../assets/images/loginImage.png";
import Button from "../../components/Button/Button";
import FormInput from "../../components/FormInput/FormInput";
import styles from "./Login.module.css";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal/Modal";

const url = "http://localhost:3000/users";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const toggleVisibility = () => {
    setShowPassword((visibility) => !visibility);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    try {
      const emailRes = await axios.get(url, { params: { email: email } });
      
      if (emailRes.data.length === 0) {
        setEmailError("Insira um e-mail válido.");
      } else {
        const passwordRes = await axios.get(url, { params: { email: email, password: password } });

        if (passwordRes.data.length > 0) {
          setEmail("");
          setPassword("");
          setShowModal(true);
          setTimeout(() => {
            setShowModal(false);
            navigate("/home");
          }, 3000);
        } else {
          setPasswordError("Senha incorreta, tente novamente.");
        }
      }
    } catch (error) {
      console.error("Erro ao realizar login:", error);
    }

  };

  return (
    <div className={styles.container}>
      <Modal show={showModal} title={"Login realizado com sucesso"} message={"Iremos te redirecionar ao Kanban !"} />
      <div className={styles.header}></div>
      <div className={styles.body}>
        <img src={loginImage} alt="logo-image" />
        <span className={styles.divisor1} />
        <form className={styles.form} onSubmit={handleSubmit}>
          <p className={styles.title}>uTask 3.0</p>
          <div>
            <FormInput
              label="E-mail"
              type="email"
              placeholder="Endereço de e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={emailError}
            />
            <span className={styles.validate} style={{ display: emailError ? "block" : "none" }}>{emailError}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <FormInput
              label="Senha"
              type={showPassword ? "text" : "password"}
              placeholder="Senha secreta"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={passwordError}
            >
              {showPassword ? (
                <MdVisibility size={25} color="#395B8A" onClick={toggleVisibility} style={{ cursor: "pointer" }} />
              ) : (
                <MdVisibilityOff size={25} color="#395B8A" onClick={toggleVisibility} style={{ cursor: "pointer" }} />
              )}
            </FormInput>
            <span className={styles.validate} style={{ display: passwordError ? "block" : "none" }}>{passwordError}</span>
            <p className={styles.senhaRecup}>Esqueceu a senha?</p>
          </div>
          <Button value="Entrar" />
          <span className={styles.divisor2} />
          <Link to="/register" className={styles.cadastro}>Não tem cadastro? Crie uma conta</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
