import React, { useEffect, useState, useRef } from 'react';
import { Grid, Box } from '@mui/material';
import Navbar from '../../Components/Navbar/Navbar';
import PostCard from '../../Components/PostCard/PostCard';
import Profilebody from '../../Components/ProfileTemp/Profilebody';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { useHistory, useParams } from 'react-router-dom';
import './profile.css';


const UserProfileComponent = ({URL})=>{

//-------------------------------* ALL SET-STATE METHODS *-------------------------------//  
  const { userId } = useParams();      
  const [user, setUser] = useState('');
  const [posts, setPosts] = useState([]);
  const localToken = localStorage.getItem('token');
  const decodedToken = jwt.decode(localToken);
  const history = useHistory();
  const FatchRef = useRef();


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
},[])

//-------------------------------* FATCHING DATA FUNCTION *-------------------------------//
  const Fatch = (async()=>{
    let responseUsers = await axios.get(`${URL}/users/getuser/${userId}`,
      {
          headers:{ token:localToken }
      })
      
    setUser( responseUsers.data );

    let responsepost = await axios.get(`${URL}/upload/multimedia/get/all`,
      {
          headers:{ token:localToken }
      })
    
    setPosts(responsepost.data.sort((a,b)=>{ return cal(a.createdAt)>cal(b.createdAt) ? 1 : -1 }).filter((search)=>{
      if(search.userId.includes(userId)){
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
      <Navbar page={user ? user.username : null}/>
        <Grid id="profileBack">
            <Grid>
                <Profilebody URL={URL} userId={userId} />
                <Grid>
                    <div className="profileHomeCard" id="profilePostContainer">
                    {posts.map((recipe)=>(
                      <PostCard key={recipe._id} recipe={recipe} URL={URL} user={user} />
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

export default UserProfileComponent;