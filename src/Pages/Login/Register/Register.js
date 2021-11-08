import { Alert, Button, CircularProgress, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import loginImg from './../../../images/login.png';

const Register = () => {
    const [loginData, setloginData] = useState({});

    const {user, authError, registerUser, isLoading} = useAuth();

    const handleOnChange = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData }
        //console.log(field, value);
        newLoginData[field] = value;
        setloginData(newLoginData);
        console.log(loginData);
    }
    const handleRegisterSubmit = e => {
        e.preventDefault();
        if(loginData.password !== loginData.password2){
            alert('Your password did not match');
            return;
        }
        registerUser(loginData.email, loginData.password)
        //alert('hello');
    }
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="body1" gutterBottom>
                        Register
                    </Typography>
                    {!isLoading && <form onSubmit={handleRegisterSubmit}>
                        <TextField
                            id="standard-basic-email"
                            label="Your Email"
                            type="email"
                            variant="standard"
                            name="email"
                            onChange={handleOnChange}
                            sx={{ width: '75%', m: 1 }}
                        />
                        <TextField
                            id="standard-basics-password"
                            label="Your Password"
                            variant="standard"
                            type="password"
                            name="password"
                            onChange={handleOnChange}
                            sx={{ width: '75%', m: 1 }}
                        />
                        <TextField
                            id="standard-basics-password2"
                            label="Retype Your Password"
                            variant="standard"
                            type="password"
                            name="password2"
                            onChange={handleOnChange}
                            sx={{ width: '75%', m: 1 }}
                        />
                        <Button sx={{ width: '75%', m: 3 }} type="submit" variant="contained">Register</Button>
                        <NavLink to="/login" style={{ textDecoration: 'none', m: 10 }}><Button color="inherit">Already Registered? Please Login.</Button></NavLink>
                    </form>}
                    {isLoading && <CircularProgress />}
                    {user?.email && <Alert severity="success">User Created Successfully!</Alert>}
                    {authError && <Alert severity="error">{authError}</Alert>}
                </Grid>
                <Grid item xs={12} md={6}>
                    <img style={{ width: '100%' }} src={loginImg} alt="" />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Register;