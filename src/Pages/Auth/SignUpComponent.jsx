import React, { useState, useRef } from 'react';
import axios from 'axios';
import { IconButton, Button, Grid, FormControl, CircularProgress, Card, InputLabel, Input, InputAdornment, Box } from '@mui/material';
import { HowToReg, Visibility, KeyboardBackspace, CheckCircle, EditTwoTone, VisibilityOff } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
import Message from '../../Components/AlertPopup/Popup';
import './auth.css';


const SignUpComponent = ({ URL }) => {

    //-------------------------------* USE-STATE METHODS *-------------------------------//
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose ProfilePic');
    const [baseImage, setBaseImage] = useState("");
    const [showPassword, setShowPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [worning, setWorning] = useState('');
    const history = useHistory();
    const contactForm = useRef();



    //-------------------------------* PASSWORD VISIBILITY FUNCTIONS *-------------------------------//
    const handleClickShowPassword = (e) => {
        setShowPassword(e.currentTarget);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
        setShowPassword('');
    };

    //-------------------------------* SIGN-UP ACCOUNT FUNCTION *-------------------------------//
    const handleSubmit = async (e) => {

        e.preventDefault();
        const updatedData = contactForm.current;
        let response = '';
        try {
            if (file === '' && updatedData.first_name === '' && updatedData.last_name === '' && updatedData.username === '' && updatedData.email === '' && updatedData.address === '' && updatedData.number === '' && updatedData.password === '') {
                setWorning({ status: 'error', data: { msg: 'Please fill all the details..!!!' } });
            } else {
                setLoading(true)
                const formData = new FormData();
                formData.append('file', file);
                formData.append('username', updatedData.username.value);
                formData.append('first_name', updatedData.first_name.value);
                formData.append('last_name', updatedData.last_name.value);
                formData.append('email', updatedData.email.value);
                formData.append('address', updatedData.address.value);
                formData.append('number', updatedData.number.value);
                formData.append('password', updatedData.password.value);
                response = await axios.post(`${URL}/register/registeruser`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })

                if (response.status === 200) {
                    history.push('/');
                    alert("You have successfully created your account...");
                }

                if (response.status === 400) {
                    setWorning({ status: 'error', msg: response.data.msg })
                }

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

    //-------------------------------* ONCHANGE FUNCTION *-------------------------------//
    const onChange = async (e) => {
        const RawData = e.target.files[0];
        setFile(RawData);
        const base64 = await convertBase64(RawData);
        setBaseImage(base64);
        setFilename(e.target.files[0].name);
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };


    const Clear = () => {
        setFile('');
        setFilename('Choose ProfilePic');
    }

    return (
        <>
            {worning ? <Message message={worning.msg} security={worning.status} close={setWorning} loading={setLoading} /> : null}
            <IconButton onClick={() => { history.goBack() }} edge="start" aria-label="menu" sx={{ ml: 1, mt: 1, mb: -1, color: "#1b1b33" }}>
                <KeyboardBackspace />
            </IconButton>
            <Box id="containerSignIn">
                <Grid id="signInCard">
                    <Grid id="signInContent " >
                        <h2 id='signup'><HowToReg id='signupIcon' /> Signup</h2>
                        <form style={{ textAlign: 'center' }} ref={contactForm} onSubmit={(e) => handleSubmit(e)}>
                            <Box id="ProfilePhoto">
                                <Card id="profilePicCard">
                                    <Grid id="profileOut">
                                        <input type="file" name="file" id="PofilePic" onChange={onChange} />
                                        {filename !== 'Choose ProfilePic' ? <img id="PofilePic__img" src={baseImage} alt='img' /> : null}
                                        <p id="ICON">{filename !== 'Choose ProfilePic' ? <CheckCircle id="uploadedProfilePic" disabled /> : <EditTwoTone id="uploadProfilePic" disabled />}</p>
                                    </Grid>
                                </Card>
                                {
                                    filename !== 'Choose ProfilePic'
                                        ?
                                        <Button htmlFor='PofilePic' style={{ color: 'orange', marginTop: '-30px' }} onClick={() => { Clear() }} >Clear Profile Pic</Button>
                                        :
                                        <label id="profilePicNameOut" className="form-label" htmlFor='customFile'>
                                            {filename !== 'Choose ProfilePic' ? null : <h6 id="profilePicName">{filename}</h6>}
                                        </label>
                                }
                            </Box>
                            <FormControl sx={{ m: 1.5, mt: 4, width: 293 }} >
                                <InputLabel color="warning" sx={{ ml: -1.5 }} focused htmlFor="standard1">
                                    First Name
                                </InputLabel>
                                <Input
                                    id="standard1"
                                    name='first_name'
                                    color="warning"
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1.5, width: 293 }} >
                                <InputLabel color="warning" sx={{ ml: -1.5 }} focused htmlFor="standard2">
                                    Last Name
                                </InputLabel>
                                <Input
                                    id="standard2"
                                    name='last_name'
                                    color="warning"
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1.5, width: 293 }} >
                                <InputLabel color="warning" sx={{ ml: -1.5 }} focused htmlFor="standard3">
                                    Username
                                </InputLabel>
                                <Input
                                    id="standard3"
                                    name='username'
                                    color="warning"
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1.5, width: 293 }} >
                                <InputLabel color="warning" sx={{ ml: -1.5 }} focused htmlFor="standard4">
                                    Email
                                </InputLabel>
                                <Input
                                    id="standard4"
                                    name='email'
                                    color="warning"
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1.5, width: 293 }} >
                                <InputLabel color="warning" sx={{ ml: -1.5 }} focused htmlFor="standard5">
                                    Number
                                </InputLabel>
                                <Input
                                    id="standard5"
                                    name='number'
                                    color="warning"
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1.5, width: 293 }}>
                                <InputLabel color="warning" focused htmlFor="standard-adornment-password" sx={{ ml: -1.7 }}>Password</InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    name='password'
                                    size="small"
                                    color="warning"
                                    sx={{ width: 293 }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <VisibilityOff id="icons" /> : <Visibility id="iconsVisibilityOff" />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1.5, width: 293 }} >
                                <InputLabel color="warning" sx={{ ml: -1.5 }} focused htmlFor="standard6">
                                    Address
                                </InputLabel>
                                <Input
                                    id="standard6"
                                    name='address'
                                    color="warning"
                                />
                            </FormControl>
                            <Grid sx={{ textAlign: 'center' }}>
                                <Button id="button" sx={{ mt: 2 }} type="submit" variant="contained" disableElevation >
                                    Create Account
                                </Button>
                                {loading && (<CircularProgress size={50} id='CircularProgress' />)}
                            </Grid>
                            <Grid sx={{ textAlign: 'center', m: 2, cursor: 'pointer' }}>
                                <p id="switchLogin">Already have account ? <span id="switch" onClick={() => { history.push('/') }} variant="body2">Login</span></p>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Box>
            <p id="TandC">
                Signing up signifies that you have read and agree to the <span>Terms of Service</span> <span style={{ display: "none" }}>, the <span>Salesforce Japan Privacy Statement</span></span> and our <span>Privacy Policy</span>.<br /><span rel="nofollow">Cookie Preferences</span>.
            </p>
        </>
    )
}

export default SignUpComponent;