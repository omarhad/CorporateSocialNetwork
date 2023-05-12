import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from "./pages/UserList";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NavBar from "./components/NavBar";
import { ThemeProvider } from '@mui/material/styles';
import { AuthProvider } from './components/AuthContext';
import LoginPage from './pages/LoginPage';
import theme from "./config/theme";

const App: React.FC = () => {
    return (
      <ThemeProvider theme={theme}>
          <AuthProvider>
              <Router>
                  <div className="App">
                      <Routes>
                          <Route path="/login" element={<LoginPage />} />
                          <Route path="*" element={
                              <>
                                  <NavBar />
                                  <Routes>
                                      <Route path="/" element={<Home />} />
                                      <Route path="/profile" element={<Profile />} />
                                      <Route path="/users" element={<UserList />} />
                                  </Routes>
                              </>
                          } />
                      </Routes>
                  </div>
              </Router>
          </AuthProvider>
      </ThemeProvider>
    );
};

export default App;
