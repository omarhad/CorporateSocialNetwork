import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from "./pages/UserList";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NavBar from "./components/NavBar";
import { ThemeProvider } from '@mui/material/styles';
import { AuthProvider } from './components/AuthContext';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import theme from "./config/theme";

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <Router>
                    <div className="App">
                        <NavBar />
                        <Routes>
                            <React.Fragment>
                                <PrivateRoute path="/" render={() => <Home />} />
                                <PrivateRoute path="/profile" render={() => <Profile />} />
                                <PrivateRoute path="/users" render={() => <UserList />} />
                            </React.Fragment>
                            <Route path="/login" element={<LoginPage />} />
                        </Routes>
                    </div>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;
