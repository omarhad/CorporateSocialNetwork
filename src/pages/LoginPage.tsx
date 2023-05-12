import React, { useEffect, useRef, useState } from "react";
import "css-doodle";
import { Container, Paper, Tab, Tabs } from "@mui/material";
import { useStyles } from "../styles/LoginPageStyles";
import LoginForm from "../components/loginPage/LoginForm";
import SignupForm from "../components/loginPage/SignupForm";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const LoginPage: React.FC = () => {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState(0);

  const doodleRef = useRef<any>(null);

  const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    if (!doodleRef.current) return;

    const handleClick = () => {
      doodleRef.current.update();
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [doodleRef]);

  return (
    <div className={classes.loginPage}>
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
      <TransitionGroup component={Paper} className={classes.form}>
        <CSSTransition key={activeTab} classNames="fade" timeout={300}>
          {activeTab === 0 ? (
            <LoginForm className="fade" />
          ) : (
            <SignupForm className="fade" />
          )}
        </CSSTransition>
      </TransitionGroup>
    </Container>
    </div>

  );
};

export default LoginPage;
