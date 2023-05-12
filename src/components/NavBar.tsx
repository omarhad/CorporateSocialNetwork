import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "./AuthContext";
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import ProfileIcon from '@mui/icons-material/AccountCircle';
import UsersIcon from '@mui/icons-material/People';

import logo from '../assets/logo.svg';
const NavBar: React.FC = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
      <AppBar position="static">
          <Toolbar>
              <div style={{ flexGrow: 1, marginRight: '1rem', maxHeight: '3.5rem', overflow:'hidden' }}>
                <img src={logo} alt="Logo" style={{ objectFit:'cover', objectPosition: '50% 50%', maxWidth: '7rem', }} />
              </div>
              <IconButton component={Link} to="/" style={{ color: '#4E5166' }}>
                  <HomeIcon />
              </IconButton>
              <IconButton component={Link} to="/profile" style={{ color: '#4E5166' }}>
                  <ProfileIcon />
              </IconButton>
              <IconButton component={Link} to="/users" style={{ color: '#4E5166' }}>
                  <UsersIcon />
              </IconButton>
              <IconButton style={{ color: '#4E5166' }} onClick={handleLogout}>
                  <LogoutIcon />
              </IconButton>
          </Toolbar>
      </AppBar>
    );
};

export default NavBar;
