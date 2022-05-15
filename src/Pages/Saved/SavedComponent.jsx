import React,{useEffect, useState, useRef } from 'react';
import { Grid } from '@mui/material';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { useHistory } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import PostCard from '../../Components/PostCard/PostCard';
import Message from '../../Components/AlertPopup/Popup';
import './save.css';


const SavedComponent = ({URL})=>{

//-------------------------------* ALL SET-STATE METHODS *-------------------------------//
const [user, setUser]= useState('');
const [saved, setSaved]= useState('');
const [recipes, setRecipes] = useState([]);       
const [change, setChange] = useState(false);
const [message, setMessage] = useState('');
const localToken = localStorage.getItem('token');
const decodedToken = jwt.decode(localToken);
const history = useHistory();
const FatchRef = useRef();


if(change){
  setTimeout(()=>{setChange(false)},1000)
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
let Fatch = (async()=>{
  let responseUsers = await axios.get(`${URL}/users/getuser/${decodedToken.user._id}`,
    {
        headers:{ token:localToken }
    })
    setUser(responseUsers.data);
    setSaved(responseUsers.data.saved);

    let responsePosts = await axios.get(`${URL}/upload/multimedia/get/all`,
      {
        headers: { token:localToken }
      })
    setRecipes(responsePosts.data.sort((a,b)=>{ return cal(a.createdAt)>cal(b.createdAt) ? 1 : -1 }));
})

FatchRef.current = Fatch;

const cal = (date)=>{
  let DateNow = new Date(Date.now())
  return DateNow-date;
}

return (
    <>
      <Navbar page={'Saved'}/>
      {message ? <Message message={message} /> : null}
      <Grid id="homeBack">
        <div id="postContainer">
          {recipes.filter((search)=>{
              if(saved.includes(search._id)){
              return search
            }
            return null
          }).map((recipe)=>(
            <PostCard key={recipe._id} recipe={recipe} setMessage={setMessage} setChange={setChange} URL={URL} user={user} />
          ))}
        </div>
      </Grid>        
    </>
)}

export default SavedComponent;