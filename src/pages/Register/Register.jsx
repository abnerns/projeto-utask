import styles from "./Register.module.css";
import registerImage from "../../assets/images/registerImage.png";
import FormInput from "../../components/FormInput/FormInput";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import Button from "../../components/Button/Button";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const url = "http://localhost:3000/users";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const navigate = useNavigate();

  const passwdRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[.#?!@$%^&*-]).{5,}$/;
  const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

  const toggleVisibility = () => {
    setShowPassword((visibility) => !visibility);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setUsernameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    if (username.trim() === "") {
      setUsernameError("Preencha o campo de nome.");
      return;
    }
    if (!emailRegex.test(email)) {
      setEmailError("Insira um e-mail válido.");
      return;
    }
    if (!passwdRegex.test(password)) {
      setPasswordError("A senha deve conter pelo menos 5 caracteres, incluindo uma letra maiúscula, uma minúscula e um caractere especial.");
      return;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError("Senhas não combinam, tente novamente.");
      return;
    }

    try {
      const res = await axios.post(url, { username, email, password });
      if (res.status === 201) {
        alert("Usuário cadastrado com sucesso!");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        navigate("/");
      }
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      alert("Erro ao cadastrar o usuário.");
    }

  };

  return (
    <div className={styles.container}>
      <div className={styles.header}></div>
      <div className={styles.body}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <p className={styles.title}>uTask 3.0</p>
            <span className={styles.divisor2} />
          </div>
          <p style={{ fontSize: "20px", fontWeight: "600", alignSelf: "flex-start" }}>Crie uma conta</p>
          <div>
            <FormInput
              label="Nome de usuário"
              type="text"
              placeholder="Seu nome de usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              isInvalid={usernameError}
            />
            <span className={styles.validate} style={{ display: usernameError ? "block" : "none" }}>{usernameError}</span>
          </div>
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
          <div>
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
          </div>
          <div>
            <FormInput
              label="Confirme a senha"
              type={showPassword ? "text" : "password"}
              placeholder="Confirme a senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              isInvalid={confirmPasswordError}
            >
              {showPassword ? (
                <MdVisibility size={25} color="#395B8A" onClick={toggleVisibility} style={{ cursor: "pointer" }} />
              ) : (
                <MdVisibilityOff size={25} color="#395B8A" onClick={toggleVisibility} style={{ cursor: "pointer" }} />
              )}
            </FormInput>
            <span className={styles.validate} style={{ display: confirmPasswordError ? "block" : "none" }}>{confirmPasswordError}</span>
          </div>
          <Button value="Criar cadastro" />
        </form>
        <span className={styles.divisor1} />
        <img src={registerImage} alt="register-image" />
      </div>
    </div>
  );
};

export default Register;
