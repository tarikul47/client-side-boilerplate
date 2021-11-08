import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';

const Header = () => {

    const { user, logout } = useAuth();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <NavLink to="/" style={{ color: 'white' }}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </NavLink>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News
                    </Typography>
                    <NavLink to="/test" style={{ textDecoration: 'none', color: 'white' }}>
                        <Button color="inherit">Test</Button>
                    </NavLink>
                    {
                        user?.email ?
                            <>
                                <Button onClick={logout} color="inherit">Logout</Button>
                                <Button color="inherit">{user.displayName}</Button>
                            </>
                            :
                            <>
                                <NavLink to="/login" style={{ textDecoration: 'none', color: 'white' }}>
                                    <Button color="inherit">Login</Button>
                                </NavLink>
                                <NavLink to="/register" style={{ textDecoration: 'none', color: 'white' }}>
                                    <Button color="inherit">Register</Button>
                                </NavLink>
                            </>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;