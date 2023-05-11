import React, { useState } from 'react';
import AuthService from '../services/AuthService';
import {
    Container,
    Grid,
    Paper,
    Tab,
    Tabs,
    TextField,
    Button,
    Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useAuth } from "../components/AuthContext";

const useStyles = makeStyles({
    container: {
        marginTop: '2rem',
    },
    form: {
        padding: '2rem',
    },
    button: {
        marginTop: '1rem',
    },
});

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (event: React.FormEvent) => {
  event.preventDefault();
  try {
    const response = await AuthService.login({
      email,
      password,
    });
    localStorage.setItem('token', response.token);

  } catch (error) {
    if (error) {
        setErrorMessage("Email ou mot de passe incorrect.");
    } else {
        setErrorMessage("Une erreur est survenue lors de la tentative de connexion. Veuillez réessayer plus tard.");
    }
  }
    };

    return (
        <form onSubmit={handleLogin}>
            {errorMessage && (
                <Typography color="error" style={{ marginBottom: '1rem' }}>
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
                style={{ marginTop: '1rem' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                variant="contained"
                color="primary"
                style={{ marginTop: '1rem' }}
                fullWidth
                type="submit"
            >
                Login
            </Button>
        </form>
    );
};

const SignupForm: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [position, setPosition] = useState('');
    const [location, setLocation] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { login } = useAuth();

    const handleSignup = async (event: React.FormEvent) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage('Les mots de passe ne correspondent pas.');
            return;
        }

        if (!firstName || !lastName || !email || !password) {
            setErrorMessage('Veuillez remplir tous les champs requis.');
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
                location,
            });

            login(response.token, response.user);

        } catch (error) {
            setErrorMessage('Une erreur est survenue lors de l\'inscription. Veuillez réessayer.');
        }
    };

    return (
        <form onSubmit={handleSignup}>
            {errorMessage && (
                <Typography color="error" style={{ marginBottom: '1rem' }}>
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
                style={{ marginTop: '1rem' }}
                required
            />
            <TextField
                label="Last Name"
                type="text"
                variant="outlined"
                fullWidth
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                style={{ marginTop: '1rem' }}
                required
            />
            <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ marginTop: '1rem' }}
                required
            />
            <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ marginTop: '1rem' }}
                required
            />
            <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ marginTop: '1rem' }}
                required
            />
            <TextField
                label="Birthdate"
                type="date"
                variant="outlined"
                fullWidth
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                style={{ marginTop: '1rem' }}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                label="Position"
                type="text"
                variant="outlined"
                fullWidth
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                style={{ marginTop: '1rem' }}
            />
            <TextField
                label="Location"
                type="text"
                variant="outlined"
                fullWidth
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{ marginTop: '1rem' }}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: '1rem' }}
                fullWidth
                >
                Signup
            </Button>
        </form>
        );
};

const LoginPage: React.FC = () => {
    const classes = useStyles();
    const [activeTab, setActiveTab] = useState(0);

    const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
        setActiveTab(newValue);
    };

    return (
        <Container maxWidth="sm" className={classes.container}>
            <Paper square>
                <Tabs
                    value={activeTab}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChangeTab}
                    aria-label="login and signup tabs"
                    variant="fullWidth"
                >
                    <Tab label="Login" />
                    <Tab label="Signup" />
                </Tabs>
            </Paper>
            <Paper className={classes.form}>
                <Grid container direction="column" spacing={2}>
                    {activeTab === 0 ? <LoginForm /> : <SignupForm />}
                </Grid>
            </Paper>
        </Container>
    );
};

export default LoginPage;
