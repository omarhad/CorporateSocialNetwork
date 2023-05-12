import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStyles } from "../../styles/LoginPageStyles";
import AuthService from "../../services/AuthService";
import { Button, TextField, Typography } from "@mui/material";
interface LoginFormProps {
  className?: string; // Ajoutez la propriété className avec un type optionnel
  // Autres propriétés du formulaire de connexion
}
const LoginForm: React.FC<LoginFormProps> = ({ className }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const classes = useStyles();
  const handleLogin = async (event: React.FormEvent) => {

    event.preventDefault();
    try {
      const response = await AuthService.login({
        email,
        password
      });
      localStorage.setItem("token", response.token);
      navigate("/");

    } catch (error: any) {
      const serverErrorMessage = error.response?.data?.message || "Une erreur est survenue lors de la tentative de connexion. Veuillez réessayer plus tard.";
      setErrorMessage(serverErrorMessage);

    }
  };

  return (
    <div className={className}>
      <form onSubmit={handleLogin} className={`${classes.form} form-login`}>
      {errorMessage && (
        <Typography color="error" style={{ marginBottom: "1rem" }}>
          {errorMessage}
        </Typography>
      )}
      <TextField
        label="Email"
        type="email"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        style={{ marginTop: "1rem" }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "1rem" }}
        fullWidth
        type="submit"
      >
        Login
      </Button>
    </form>
    </div>

  );
};

export default LoginForm;