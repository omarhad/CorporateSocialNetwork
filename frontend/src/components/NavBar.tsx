import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    My App
                </Typography>
                <Button component={Link} to="/" color="inherit">Home</Button>
                <Button component={Link} to="/profile" color="inherit">Profile</Button>
                <Button component={Link} to="/users" color="inherit">Users</Button>
                <Button component={Link} to="/login" color="inherit">Login</Button> {/* Ajoutez cette ligne */}
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;