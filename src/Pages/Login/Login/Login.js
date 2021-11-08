import { Alert, Button, CircularProgress, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import loginImg from './../../../images/login.png';
import useAuth from '../../../Hooks/useAuth';


const Login = () => {

    const [LoginData, setLoginData] = useState({});
    const {user, isLoading, authError, loginUser} = useAuth();

    const location = useLocation();
    const history = useHistory();

    const handleOnChange = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...LoginData }
        //console.log(field, value);
        newLoginData[field] = value;
        setLoginData(newLoginData);
        //console.log(LoginData);
    }
    const handleLoginSubmit = e => {
        e.preventDefault();
        loginUser(LoginData.email, LoginData.password, location, history);
        alert('login');
    }
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="body1" gutterBottom>
                        Login
                    </Typography>
                    {!isLoading && <form onSubmit={handleLoginSubmit}>
                        <TextField
                            id="standard-basic"
                            label="Your Email"
                            variant="standard"
                            name="email"
                            onChange={handleOnChange}
                            sx={{ width: '75%', m: 1 }}
                        />
                        <TextField
                            id="standard-basics"
                            label="Your Password"
                            variant="standard"
                            type="password"
                            name="password"
                            onChange={handleOnChange}
                            sx={{ width: '75%', m: 1 }}
                        />
                        <Button sx={{ width: '75%', m: 3 }} type="submit" variant="contained">Login</Button>
                        <NavLink to="/register" style={{ textDecoration: 'none', m:10 }}><Button color="inherit">New User? Please Register.</Button></NavLink>
                    </form>}
                    {isLoading && <CircularProgress />}
                    {user?.email && <Alert severity="success">Login successfully!</Alert>}
                    {authError && <Alert severity="error">{authError}</Alert>}
                </Grid>
                <Grid item xs={12} md={6}>
                    <img style={{ width: '100%' }} src={loginImg} alt="" />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;

