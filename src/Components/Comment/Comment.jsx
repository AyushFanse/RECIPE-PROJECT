import React,{ useEffect, useState, useRef } from 'react';
import { Grid, Box, Button } from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { Send } from '@mui/icons-material';
import moment from 'moment';
import jwt from 'jsonwebtoken';
import './comment.css';
import Navbar from '../Navbar/Navbar';

const Message=({URL})=>{
    const [comment,setComment] = useState([]); 
    const [mess,setMess] = useState(''); 
    const localToken = localStorage.getItem('token');
    const decodedToken = jwt.decode(localToken);   
    const history = useHistory();   
    const { postId } = useParams();   
    const contactForm = useRef();
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
    })

    useEffect(()=>{ 
        FatchRef.current();
    },[mess])
    
//-------------------------------* FATCHING DATA FUNCTION *-------------------------------//
    let Fatch = (async()=>{

                let responsePosts = await axios.get(`${URL}/upload/multimedia/get/${postId}`,
                  {
                    headers: { token:localToken }
                  })  

                  setComment(responsePosts.data.comments);              
    })
      
    FatchRef.current = Fatch;
    
//-------------------------------* COMMENT FUNCTION *-------------------------------//
    const HandleComment = (async (e)=>{
        
        e.preventDefault();
        const input = contactForm.current;
        if(input.message.value){
            
            await axios.put(`${URL}/upload/multimedia/comments/${postId}`,{
                username: decodedToken.user.username,
                userId: decodedToken.user._id,
                message: input.message.value
            })
            setMess('message')
            e.target.reset();            
        }
    })
    
//-------------------------------* DELETE COMMENTS *-------------------------------//
    const DeleteMess = (async(mess)=>{
    setMess('Deleted')        
    if(window.confirm('Are you sure to delete this record?')){
        await axios.put(`${URL}/upload/multimedia/deletecomments/${postId}`,{
            data : mess
            })
        }
    })  

    return (
        <>
            <Navbar page={'Message'} />
            <Box id="DialogBox">
                <Box id="mesBack">
                    {
                        comment===[]
                    ?
                        null
                    :
                        (
                            comment.map((mess,index)=>
                                mess.username===decodedToken.user.username
                                ?
                                <Grid id="userMess" key={index}>
                                    <Grid id="userRepMess">
                                        <span className='deletMess' onClick={()=>{DeleteMess(mess)}}> × </span>
                                        <p id="userOfText">{mess.username}</p>  
                                        <h5 id="textMess">{mess.message}</h5>  
                                        <sub id="mySub">{moment(mess.messTime).fromNow()}</sub> 
                                    </Grid> 
                                </Grid>
                                :
                                <Grid id="replyMess" key={index}>
                                    <Grid id="myMess">
                                        <span className='deletMess'> × </span>
                                        <p id="userOfText">{mess.username}</p><p id="deletMess" onClick={()=>{DeleteMess(index)}}></p>
                                        <h5 id="textMess">{mess.message}</h5>  
                                        <sub id="mySub">{moment(mess.messTime).fromNow()}</sub> 
                                    </Grid> 
                                </Grid>
                            ).reverse()
                        )
                    }
                </Box>
                <form ref={contactForm} onSubmit={(e)=>{HandleComment(e)}}>
                    <Grid  id="message">
                        <div id="messageFieldOut">
                            <input type="text" name="message" id="messageField" placeholder="Share your thoughts.."/>
                        </div>
                        <div id="messButtonOut">
                            <Button type="submit" id="messButton"><div id="sendButton">Send<Send type="submit" id="messSendIcon" /></div></Button>
                        </div>
                    </Grid>
                </form>
            </Box>          
        </>
    );
}

export default Message;