import React, { useEffect, useState, useRef } from 'react';
import { Grid } from '@mui/material';
import jwt from 'jsonwebtoken';
import axios from 'axios';

function profilebody({ URL, userId }) {
    
    const [user, setUser] = useState('');
    const [posts, setPosts] = useState([]);
    const localToken = localStorage.getItem('token');
    const decodedToken = jwt.decode(localToken);
    const idUser = decodedToken.user._id;
    let likes = 0;

    const FatchRef = useRef();

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

      setPosts(responsepost.data.filter((search)=>{
        if(search.userId.includes(decodedToken.user._id)){
          return search
        }else {    
          return null
        }
      }));                
  })

    FatchRef.current = Fatch;
//-------------------------------* TOTALE LIKE COUNT *-------------------------------//


    const likeCount= ()=>{
        posts.map((post)=>(
        likes += post.likes.length
        ))
    }
    
    likeCount();

    return (
        <>            
            <Grid id="data">
                <Grid id="profileContainer">
                    <Grid className='profilePicOut Active' data-aos="fade-right">
                        <img id='profilePic' src={user.file} alt="" />
                    </Grid>
                    <Grid id="profileUser" data-aos="slide-up">
                        <p>{user ? user.username : null}</p>
                    </Grid>
                </Grid>
                <Grid id="AboutData">
                    <Grid>
                        <ul id="profile" >
                            <li data-aos="slide-left">
                                <h2> {posts ? posts.length : 0}</h2>
                                <h4>POSTS</h4>
                            </li>
                            <li data-aos="slide-left">
                                <h2>{likes}</h2>
                                <h4>LIKES</h4>
                            </li>
                            {
                                userId===idUser
                            ?
                                <li data-aos="slide-left">
                                    <h2> {user ? user.saved.length : 0}</h2>
                                    <h4>SAVED</h4>
                                </li>
                            :
                                null                                
                            }
                        </ul>
                    </Grid>
                    <Grid id="profileAboutOut">
                        <h3 data-aos="slide-up">About</h3>
                        <h6 id="profileAbout" data-aos="slide-up">  { user ? user.bio : null } </h6>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default profilebody;