import React, { useEffect, useState, useRef } from 'react';
import { Grid, Box } from '@mui/material';
import Navbar from '../../Components/Navbar/Navbar';
import EditProfile from '../../Components/Update/EditProfile';
import Delete from '../../Components/DeleteAccount/Delete';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import './setting.css';


const SettingsComponent = ({URL})=>{

//-------------------------------* USE-STATE MATHOD *-------------------------------//
const [posts, setPosts] = useState([]);
const localToken = localStorage.getItem('token');
const decodedToken = jwt.decode(localToken);
const UID = decodedToken.user._id
const FatchRef = useRef();

//-------------------------------* USE-EFFECT FUNCTION *-------------------------------//
useEffect(()=>{
    FatchRef.current();
},[])

//-------------------------------* FATCHING DATA FUNCTION *-------------------------------//
const Fatch = (async()=>{

    let responsepost = await axios.get(`${URL}/upload/multimedia/get/all`,
        {
            headers:{ token:localToken }
        })

        setPosts(responsepost.data.sort((a,b)=>{ return cal(a.createdAt)>cal(b.createdAt) ? 1 : -1 }).filter((search)=>{
            if(search.userId.includes(UID)){
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
    <Box>        
        <Navbar page={'Settings'}/>
        <Grid id ="TitleOutSide">
            <Grid id="outlineSettings">
                <EditProfile URL={URL} />
                <Delete userId={UID} URL={URL} posts={posts} />
            </Grid>
        </Grid>
    </Box>
    );
}

export default SettingsComponent;