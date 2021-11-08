import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import loginImg from './../../../images/login.png';

const Register = () => {
    const [loginData, setloginData] = useState({});

    const handleOnChange = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData }
        //console.log(field, value);
        newLoginData[field] = value;
        setloginData(newLoginData);
        console.log(loginData);
    }
    const handleLoginSubmit = e => {
        e.preventDefault();
        if(loginData.password !== loginData.password2){
            alert('Your password did not match');
            return;
        }
        //alert('hello');
    }
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="body1" gutterBottom>
                        Login
                    </Typography>;
                    <form onSubmit={handleLoginSubmit}>
                        <TextField
                            id="standard-basic"
                            label="Your Email"
                            type="email"
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
                        <TextField
                            id="standard-basics"
                            label="Retype Your Password"
                            variant="standard"
                            type="password"
                            name="password2"
                            onChange={handleOnChange}
                            sx={{ width: '75%', m: 1 }}
                        />
                        <Button sx={{ width: '75%', m: 3 }} type="submit" variant="contained">Register</Button>
                        <NavLink to="/login" style={{ textDecoration: 'none', m: 10 }}><Button color="inherit">Already Registered? Please Login.</Button></NavLink>
                    </form>
                </Grid>
                <Grid item xs={12} md={6}>
                    <img style={{ width: '100%' }} src={loginImg} alt="" />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Register;