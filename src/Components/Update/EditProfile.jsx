import React, { useEffect, useState, useRef } from 'react';
import { Slide, IconButton, Grid, Typography, Button, Dialog, AppBar, Card, TextField, Toolbar, Box } from '@mui/material';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { useHistory } from 'react-router-dom';
import { EditTwoTone, Close } from '@mui/icons-material';
import Popup from '../AlertPopup/Popup';
import './editprofile.css';

//-------------------------------* TRANSITION FUNCTION FOR NAV MENU *-------------------------------//
    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });


function editprofile({URL}) {

    const [user, setUser] = useState('');
    const [file, setFile] = useState('');
    const [update, setUpdate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [message, setMessage] = useState('');
    const [security, setSecurity] = useState('');
    const [username,setUsername] = useState('');
    const [baseImage, setBaseImage] = useState("");
    const localToken = localStorage.getItem('token');
    const decodedToken = jwt.decode(localToken);
    const UID = decodedToken.user._id;
    const history = useHistory();
    const FatchRef = useRef();
    const contactForm = useRef();
    
    //-------------------------------* USE-EFFECT FUNCTION *-------------------------------//
    useEffect(()=>{
        FatchRef.current();
    },[])
    
    //-------------------------------* FATCHING DATA FUNCTION *-------------------------------//
    const Fatch = (async()=>{
        let responseUsers = await axios.get(`${URL}/users/getuser/${UID}`,
            {
                headers:{ token:localToken }
            })

            setUser( responseUsers.data );
            setBaseImage(responseUsers.data.file);
            setFile(responseUsers.data.file);
    })
    
    FatchRef.current = Fatch;

    //-------------------------------* UPDATE DATA *-------------------------------//
    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedData = contactForm.current;

            try{    
                if( file && updatedData.first_name && updatedData.last_name && updatedData.bio  && updatedData.email && updatedData.address && updatedData.number ){    
                    
                    const formData = new FormData();

                        formData.append('file', file );
                        formData.append('bio',updatedData.bio.value);
                        formData.append('first_name',updatedData.first_name.value);
                        formData.append('last_name',updatedData.last_name.value);
                        formData.append('email',updatedData.email.value);
                        formData.append('address',updatedData.address.value);
                        formData.append('number',updatedData.number.value);

                    let response = await axios.patch(`${URL}/users/updateuser/${UID}`, formData, {
                        headers:{
                                    'Content-Type': 'multipart/form-data'
                                }
                        })

                        console.log(response.data.msg);
                        setTimeout(()=>{history.push('/profile')},3000);
                        if(update){
                            setUpdate(false);
                        }
                }else{     

                    setMessage('Please fill all the details..!!!');
                    setSecurity('error');
                    
                }
            }catch(err) {

                console.log(err)                
                setMessage( 'Failed to Update' );
                setSecurity('error');

            }

            setTimeout(()=>{setMessage('')},3000);
    }
    

//-------------------------------* COMMENTS SECTION MENU *-------------------------------//
    const handleEditSectionOpen = () => {
        setOpenEdit(true)
    }

    const handleEditSectionClose = () => {
        if(openEdit){
            setOpenEdit(false)
        }
        if(update){
            setUpdate(false);
        }
    }
    
//-------------------------------* ERROR MESSAGE FUNCTIONS *-------------------------------//
    const UsernameError = ()=>{
        username ? setUsername (false) : setUsername (true) ;
    }
//-------------------------------* ONCHANGE FUNCTION *-------------------------------//
    const onChange = async(e) =>{
        const RawData = e.target.files[0];
        setFile(RawData);
        const base64 = await convertBase64(RawData);
        setBaseImage(base64);
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
    return (
        <>
            <Grid id="settingOptions">
                <h5 onClick={()=>{handleEditSectionOpen()}}>Edit Account</h5>
                <Dialog
                    fullScreen
                    open={openEdit}
                    onClose={()=>{handleEditSectionClose()}}
                    TransitionComponent={Transition}
                    >
                    <AppBar id="DialogBar" sx={{ position: 'fixed' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={()=>{handleEditSectionClose()}}
                            aria-label="close"
                        >
                            <Close />
                        </IconButton>
                        <Typography id="TitleDilog" variant="h6" component="div" >
                            EDIT ACCOUNT
                        </Typography>
                    </Toolbar>
                    {message ? <Popup message={message} security={security} /> : null}
                    </AppBar>
                    <Box id="containerEdit">
                        <Grid id="EditCard">
                            <Grid id="EditContent " >
                                <form  style={{textAlign: 'center'}} ref={contactForm} onSubmit={(e) => handleSubmit(e)}>
                                    <Box id="ProfilePhoto">
                                        <Card id="profilePicCard">
                                            <Grid id="profileOut">
                                                {
                                                    update
                                                ?
                                                    <>
                                                        <input type="file" name="file" id="PofilePic" onChange={onChange} />
                                                        { baseImage !=='Choose ProfilePic' ? <img id="PofilePic__img" src={baseImage} alt='img'/>: null}
                                                        <p id="ICON"><EditTwoTone id="uploadProfilePic" disabled/></p>
                                                    </>
                                                :
                                                    <img  id="EditProfilePic" src={ baseImage } alt='' />
                                                }               
                                            </Grid>
                                        </Card>
                                    </Box>
                                    <Box sx={{ mt:2, '& .MuiTextField-root': { m: 1.8, width: 132 }}}>
                                        <TextField
                                            id="standard1"
                                            label="First-Name"
                                            size="small"
                                            color="warning"
                                            name='first_name'
                                            variant="standard"
                                            defaultValue={user ? user.first_name:null}
                                            aria-required="true"
                                            focused
                                            InputProps={ { readOnly: update ? false : true }}  
                                        />
                                        <TextField
                                            id="standard2"
                                            name='last_name'
                                            label="Last-Name"
                                            size="small"
                                            color="warning"
                                            focused
                                            variant="standard"
                                            defaultValue={ user ? user.last_name : null }
                                            InputProps={ { readOnly: update ? false : true }}  
                                        />
                                    </Box>
                                    <Box sx={{ mt:-2, '& .MuiTextField-root': {m: 1.8, width: 293}}}>
                                        <TextField
                                            id="standard3"
                                            label="Username"
                                            name='username'
                                            size="small"
                                            sx={{  mb:-2}}
                                            color="warning"
                                            defaultValue={ user ? user.username : null }
                                            focused
                                            InputProps={{
                                            readOnly: true,
                                            }}
                                            variant="standard"
                                            onClick={UsernameError}
                                        />  
                                    </Box>
                                    <Box sx={{ mt:-2, '& .MuiTextField-root': {m: 1.8, width: 293}}}>
                                        <TextField
                                            id="standard4"
                                            label="Number"
                                            name='number'
                                            size="small"
                                            color="warning"
                                            focused
                                            variant="standard"
                                            defaultValue={ user ? user.number : null }
                                            InputProps={ { readOnly: update ? false : true }}  
                                        />
                                    </Box>
                                    <Box sx={{ mt:-2, '& .MuiTextField-root': { m: 1.8, width: 293}}}>
                                        <TextField
                                            id="standard5"
                                            label="Email"
                                            size="small"
                                            name='email'
                                            color="warning"
                                            focused
                                            variant="standard"
                                            defaultValue={ user ? user.email : null }
                                            InputProps={ { readOnly: update ? false : true }}  
                                        /> 
                                    </Box>
                                    <Box sx={{  mt:-2, '& .MuiTextField-root': { m: 1.8, width: 293}}}>
                                        <TextField
                                            id="standard6"
                                            label="Address"
                                            name='address'
                                            size="small"
                                            color="warning"
                                            variant="standard"
                                            focused
                                            defaultValue={ user ? user.address : null }
                                            InputProps={ { readOnly: update ? false : true }}  
                                        />
                                    </Box>
                                    <Box sx={{  mt:-2, '& .MuiTextField-root': { m: 1.8, width: 293}}}>
                                        <TextField
                                            id="standard7"
                                            label="Bio"
                                            name='bio'
                                            size="small"
                                            color="warning"
                                            focused
                                            variant="standard"
                                            defaultValue={ user ? user.bio : null }
                                            InputProps={ { readOnly: update ? false : true }}  
                                        />
                                    </Box>
                                    <Grid sx={{textAlign: 'center'}}>
                                        {
                                                update
                                            ?     
                                                <>                                     
                                                    <Button  id="UpdateButton" type="submit" variant="contained" disableElevation >
                                                        Update My Account
                                                    </Button>  
                                                    <Grid sx={{textAlign: 'center', m:2 }}>
                                                        <p id = "switchLogin">You can not chnge your <span id="switch">Username</span></p>
                                                    </Grid>
                                                </>           
                                            :                                            
                                                <Box  id="EditButton" onClick={()=>{setUpdate(true)}} variant="contained" disableElevation >
                                                    Edit 
                                                </Box>         
                                        }            
                                    </Grid>
                                </form>
                                </Grid>
                            </Grid>
                        </Box>
                </Dialog>
            </Grid>            
        </>
    );
}

export default editprofile;