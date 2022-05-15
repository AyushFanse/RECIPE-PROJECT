import React, { useState, useRef } from 'react';
import axios from 'axios';
import { IconButton, Alert, Stack, Button, Grid, FormControl, InputLabel, Input, CircularProgress, InputAdornment, Box } from '@mui/material';
import { Visibility, VisibilityOff, LockTwoTone, AccountCircle } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
import './auth.css';

const LoginComponent = ({ URL }) => {

    //-------------------------------* USE-STATE METHODS *-------------------------------//
    const [showPassword, setShowPassword] = useState('');
    const [Worning, setWorning] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const contactForm = useRef();


    //-------------------------------* PASSWORD VISIBILITY *-------------------------------//
    const handleClickShowPassword = (e) => {
        setShowPassword(e.currentTarget);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
        setShowPassword('');
    };

    //-------------------------------* LOGIN PART *-------------------------------//
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = contactForm.current;
        try {
            setLoading(true)
            if (data.email.value && data.password.value) {
                let response = await axios.post(`${URL}/register/login`, {
                    email: data.email.value,
                    password: data.password.value
                })

                if (response.data.status === 'success') {
                    localStorage.setItem('token', response.data.userToken);
                    history.push('/home');
                }

            } else {
                setWorning({ status: 'error', msg: 'Please fill all the details..!!!' })
                setTimeout(() => { e.target.reset() }, 2000);
            }
        } catch (err) {

            if (!err.response) {
                setWorning({ status: 'error', msg: "Your Are offline" })
                setLoading(false)
                return;
            }

            setWorning({ status: 'error', msg: err.response.data.msg });
            setLoading(false)
        }
        setLoading(false)
    }

    return (
        <>
            <Box id="container" sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <h1 style={{ textAlign: 'center' }}>Login</h1>
                <Grid id="card">
                    <Grid id="content">
                        <h2 style={{ textAlign: 'center' }}><LockTwoTone id='loginIcon' />Login</h2>
                        {
                            Worning.status === 'error'
                                ?
                                <Stack sx={{ width: '100%' }} spacing={2}>
                                    <Alert severity="error">{Worning.msg}</Alert>
                                </Stack>
                                :
                                null
                        }
                        <br />
                        <form ref={contactForm} onSubmit={(e) => handleSubmit(e)}>
                            <Grid>
                                <FormControl sx={{ m: 1, pl: 2, pr: 2, width: '25ch' }}>
                                    <InputLabel color="warning" focused htmlFor="input-with-icon-textfield">
                                        Email
                                    </InputLabel>
                                    <Input
                                        id="input-with-icon-textfield"
                                        name='email'
                                        color="warning"
                                        aria-describedby="component-warning-text"
                                        endAdornment={
                                            <InputAdornment position="start">
                                                <AccountCircle id="icons" />
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </Grid>
                            <br />
                            <Grid>
                                <FormControl sx={{ m: 1, pl: 2, pr: 2, width: '25ch' }} variant="standard">
                                    <InputLabel sx={{ pl: 2, pr: 2 }} color="warning" focused htmlFor="standard-adornment-password">Password</InputLabel>
                                    <Input
                                        id="standard-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        name='password'
                                        color="warning"
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {showPassword ? <VisibilityOff id="iconsVisibilityOff" /> : <Visibility id="icons" />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </Grid>
                            <Grid sx={{ textAlign: 'center' }}>
                                <Button id="button" type="submit" variant="contained" disableElevation >
                                    LOGIN
                                </Button>
                                {loading && (<CircularProgress size={24} id='CircularProgress' />)}
                            </Grid>
                            <Grid sx={{ textAlign: 'center', m: 2, cursor: 'pointer' }}>
                                <p id="switchLogin" style={{ marginTop: '2rem', marginBottom: '-1rem' }}>Don&apos;t have account ? <span id="switch" onClick={() => { history.push('/signup') }} variant="body2">Signup</span></p>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}


export default LoginComponent;
