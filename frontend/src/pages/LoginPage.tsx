import React, { useState } from 'react';
import {
    Container,
    Grid,
    Paper,
    Tab,
    Tabs,
    TextField,
    Button,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

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

const LoginForm: React.FC = () => (
    <>
        <TextField label="Email" type="email" variant="outlined" fullWidth />
        <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            style={{ marginTop: '1rem' }}
        />
        <Button
            variant="contained"
            color="primary"
            style={{ marginTop: '1rem' }}
            fullWidth
        >
            Login
        </Button>
    </>
);

const SignupForm: React.FC = () => (
    <>
        <TextField label="Email" type="email" variant="outlined" fullWidth />
        <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            style={{ marginTop: '1rem' }}
        />
        <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            style={{ marginTop: '1rem' }}
        />
        <Button
            variant="contained"
            color="primary"
            style={{ marginTop: '1rem' }}
            fullWidth
        >
            Signup
        </Button>
    </>
);

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
