import React, { useState, useEffect, useRef} from 'react';
import Message from '../../Components/AlertPopup/Popup';
import Progress from '../../Components/Loading/Progress';
import Navbar from '../../Components/Navbar/Navbar';
import {Grid,Box,Card,Button ,CircularProgress}from '@mui/material';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import { useHistory } from 'react-router-dom';
import './upload.css';


const FileUpload = ({URL}) => {

//-------------------------------* USE-STATE METHODS *-------------------------------//
const [file, setFile] = useState('');
const [filename, setFilename] = useState('Choose File');
const [message, setMessage] = useState('');
const [security, setSecurity] = useState('');
const [loading, setLoading] = useState(false);
const [uploadPercentage, setUploadPercentage] = useState(0);
const [TitleDisplay, setTitleDisplay] = useState(false);
const localToken = localStorage.getItem('token');
const decodedToken = jwt.decode(localToken);
const history = useHistory();
const contactForm = useRef();
const buttonSx = {
  ...(loading && {
    bgcolor: 'rgb(76, 175, 80)',
    '&:hover': {
      bgcolor: 'rgb(58 214 64)',
    },
  })
};

//-------------------------------* USE-EFFECT METHOD *-------------------------------//
useEffect(()=>{
  if(decodedToken===null){
    history.push('/');
    alert("Session Timeout Please Login Again...");
  }else {
    if( decodedToken.exp*1000<=Date.now()){
        history.push('/');
        localStorage.removeItem('token');
      }else{

        if(uploadPercentage<=0){
          setLoading(false)
        }else{
          setLoading(true)
        }        
    }}
},[])
 

//-------------------------------* ON-CHANGE FUNCTION *-------------------------------//
const onChange = e => {
  setFile(e.target.files);
  if(e.target.files.length===1){
  setFilename(e.target.files[0].name);
  }else{
    setFilename(`Files: ${e.target.files.length}`)
  }
};

//-------------------------------* ON-SUBMIT FUNCTION *-------------------------------//
const onSubmit = async (e) => {
  e.preventDefault();
  const updatedData = contactForm.current;

  if (file === '') {
    setMessage( 'No file uploaded' );
    setSecurity( 'error' );
  }else{  
   
      try {
    
        if( file==='' && updatedData.title==='' && updatedData.recipe==='' ){  
          setMessage( 'Please fill all the details..!!!' );
          setSecurity( 'error' );
      }else{   
          const formData = new FormData();
            formData.append('title',updatedData.title.value);
            formData.append('userId',decodedToken.user._id);
            formData.append('username',decodedToken.user.username);
            formData.append('recipe', updatedData.recipe.value);
            for (let i=0;i<file.length;i++){
              formData.append('files', file[i])
            }

            if (!loading) {
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
              }, 2000);
            }

        let response = await axios.post(`${URL}/upload/multimedia`, formData, {
              headers: {
                          'Content-Type': 'multipart/form-data'
                        },
             onUploadProgress: (progressEvent) => {
              setUploadPercentage(
                 parseInt(
                            Math.round((progressEvent.loaded * 100) / progressEvent.total)
                          )
                  )
                }
            }) 

            if(uploadPercentage){
              setMessage(response.data.msg);
            }

            // Clear percentage
            setTimeout(() =>{ 
                setUploadPercentage(0);
                history.push('/profile');
            }, 3000);
          }
      } catch (err) {
          if (err.response) {
            setMessage('There was a problem with the server');
            setSecurity( 'error' );
          } else {
                    setMessage(err.response);
                    setSecurity( 'error' );
                  }
          setUploadPercentage(0);
        }
      }
      setTimeout(() => setMessage(''), 5000);
      setTimeout(() => setSecurity(''), 5000);
};

//-------------------------------* HANDEL TITLE FUNCTION*-------------------------------//
const handelTitle = ()=> {
  if(TitleDisplay===true){
    setTitleDisplay(false);
  }else{
    setTitleDisplay(true);
  }
}


return (
    <>
      <Box className="UpladTemplet">
        <Navbar page={'Upload'}/>
        <form ref={contactForm} onSubmit={onSubmit} id="uploadOut">
          <Grid id ="TitleOutSide">
            <div id="">
              <label id="FileName" onClick={handelTitle}><h6>Title</h6></label>
              {TitleDisplay ? <input type="text" name='title' placeholder="Title" color='error' id="uploadTitle" className="form-control" />:null}
            </div>
          </Grid>
          <div className='custom-file' >
              <Card id="uploadCard">
                <Grid id="imgUpload">
                  <input type="file" name='file' id="dragDrop" multiple onChange={onChange} />
                  {filename !=='Choose File' ? <CloudDoneIcon id="uploadIconDone"/> : <i className="fas fa-cloud-upload-alt" id="uploadIcon"></i> }                
                </Grid>
              </Card>
              <label id="FileName" className="form-label"  htmlFor='dragDrop'>
                <h6>{filename}</h6>
              </label>
              <br/>
              <Grid id="uploadRecipe"  className="form-outline">
                <textarea
                  placeholder="Write Your Recipe Here…"      
                  type='text'
                  name='recipe'
                  id="recipeInput" 
                  rows="4"
                />
              </Grid>
              <Progress percentage={uploadPercentage} />
              {message ? <Message message={message} security={security} /> : null}
              <Box  id="uploadButton">
                <Button
                  id="Double_Tap"
                  variant="contained"
                  sx={ loading ? buttonSx : {bgcolor:'#1b1b33', '&:hover': { bgcolor: '#5a5ac5' }}}
                  type="submit"
                  className='btn Upload'
                >                  
                  Upload Recipe
                </Button>
                {loading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: 'green',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginTop: '-12px',
                      marginLeft: '-12px',
                    }}
                  />
                )}
              </Box>
          </div> 
        </form>
      </Box>
    </>
  )
}

export default FileUpload;