import React, { useState } from "react";
import { useStyles } from "../../styles/LoginPageStyles";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { Button, TextField, Typography } from "@mui/material";
interface SignupFormProps {
  className?: string; // Ajoutez la propriété className avec un type optionnel
  // Autres propriétés du formulaire de connexion
}
const SignupForm: React.FC<SignupFormProps> = ({ className }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [position, setPosition] = useState("");
  const [location, setLocation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const classes = useStyles();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();

    const requiredFields = [firstName, lastName, email, password, confirmPassword];

    if (password !== confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    if (requiredFields.some(field => !field)) {
      setErrorMessage("Reveille remplir tous les champs requis.");
      return;
    }

    try {
      const response = await AuthService.signup({
        firstName,
        lastName,
        email,
        password,
        birthdate,
        position,
        location
      });

      login(response.token, response.user);
      navigate("/");

    } catch (error: any) {
      const serverErrorMessage = error.response?.data?.message || "Une erreur est survenue lors de l'inscription. Veuillez réessayer.";
      setErrorMessage(serverErrorMessage);
    }
  };

  return (
    <div className={className}>
      <form onSubmit={handleSignup} className={`${classes.form} form-signup`}>
      {errorMessage && (
        <Typography color="error" style={{ marginBottom: "1rem" }}>
          {errorMessage}
        </Typography>
      )}
      <TextField
        label="First Name"
        type="text"
        variant="outlined"
        fullWidth
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        style={{ marginTop: "1rem" }}
        required
      />
      <TextField
        label="Last Name"
        type="text"
        variant="outlined"
        fullWidth
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        style={{ marginTop: "1rem" }}
        required
      />
      <TextField
        label="Email"
        type="email"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginTop: "1rem" }}
        required
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginTop: "1rem" }}
        required
      />
      <TextField
        label="Confirm Password"
        type="password"
        variant="outlined"
        fullWidth
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        style={{ marginTop: "1rem" }}
        required
      />
      <TextField
        label="Birthdate"
        type="date"
        variant="outlined"
        fullWidth
        value={birthdate}
        onChange={(e) => setBirthdate(e.target.value)}
        style={{ marginTop: "1rem" }}
        InputLabelProps={{
          shrink: true
        }}
      />
      <TextField
        label="Position"
        type="text"
        variant="outlined"
        fullWidth
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        style={{ marginTop: "1rem" }}
      />
      <TextField
        label="Location"
        type="text"
        variant="outlined"
        fullWidth
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        style={{ marginTop: "1rem" }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ marginTop: "1rem" }}
        fullWidth
      >
        Signup
      </Button>
    </form>
    </div>

  );
};

export default SignupForm;