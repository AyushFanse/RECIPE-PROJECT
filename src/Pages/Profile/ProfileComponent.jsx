import { Grid, Box } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import Message from '../../Components/AlertPopup/Popup';
import Navbar from '../../Components/Navbar/Navbar';
import PostCard from '../../Components/PostCard/PostCard';
import Profilebody from '../../Components/ProfileTemp/Profilebody';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import './profile.css';

const ProfileComponent = ({URL})=>{

//-------------------------------* USE-STATE METHODES *-------------------------------//
const [user, setUser] = useState('');
const [posts, setPosts] = useState([]);     
const [change, setChange] = useState(false);
const [message, setMessage] = useState('');
const localToken = localStorage.getItem('token');
const decodedToken = jwt.decode(localToken);
const history = useHistory();
const FatchRef = useRef();


if(change){
  setTimeout(()=>{setChange(false)},800)
}


//-------------------------------* USE-EFFECT FUNCTION *-------------------------------//
  useEffect(()=>{ 
    if(decodedToken===null){
      history.push('/');
      alert("Session Timeout Please Login Again...");
    }else {
          if( decodedToken.exp*1000<=Date.now()){
            history.push('/');
  }}
  },[])

  useEffect(()=>{ 
    FatchRef.current();
  },[change])

//-------------------------------* FATCHING DATA FUNCTION *-------------------------------//
  const Fatch = (async()=>{ 
    let responseUsers = await axios.get(`${URL}/users/getuser/${decodedToken.user._id}`,
      {
          headers:{ token:localToken }
      })
      
    setUser( responseUsers.data );

    let responsepost = await axios.get(`${URL}/upload/multimedia/get/all`,
      {
          headers:{ token:localToken }
      })

      setPosts(responsepost.data.sort((a,b)=>{ return cal(a.createdAt)>cal(b.createdAt) ? 1 : -1 }).filter((search)=>{
        if(search.userId.includes(decodedToken.user._id)){
          return search
        }else {    
          return null
        }
      }));                
  })

FatchRef.current = Fatch;

const cal = (date)=>{
  let DateNow = new Date(Date.now())
  return DateNow-date;
}


return (
    <Box sx={{ flexGrow: 1}}>          
      <Navbar page={'Profile'}/>
        <Grid id="profileBack">
            <Grid>
                <Profilebody URL={URL} userId={decodedToken.user._id} />
                <Grid>
                  {message ? <Message message={message} /> : null}             
                  <div className="profileHomeCard" id="profilePostContainer">
                    {posts.map((recipe)=>(
                      <PostCard key={recipe._id} recipe={recipe} setMessage={setMessage} setChange={setChange} URL={URL} user={user} />
                    ))}
                  </div>
                </Grid>
                <Grid>
                </Grid>
            </Grid>
        </Grid>
    </Box>
    );
}

export default ProfileComponent;