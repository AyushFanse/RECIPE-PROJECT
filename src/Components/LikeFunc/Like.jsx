import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

function Like({ Id, recipeId, URL }) {

    const [likes, setLikes] = useState([]);
    const [like, setLike] = useState('');
    const localToken = localStorage.getItem('token');
    const FatchRef = useRef();

    useEffect(()=>{ 
            FatchRef.current();
        },[like])
    
//-------------------------------* FATCHING DATA FUNCTION *-------------------------------//
    let Fatch = (async()=>{

        let responsePosts = await axios.get(`${URL}/upload/multimedia/get/${recipeId}`,
            {
            headers: { token:localToken }
            }) 
        setLikes(responsePosts.data.likes)
    })
      
    FatchRef.current = Fatch;
    
//-------------------------------* LIKE AND DISLIKE FUNCTIONS *-------------------------------//

    const Like = (async (id)=>{
        setLike('like')   
        await axios.put(`${URL}/upload/multimedia/like/${recipeId}`,{
            likes:id
        })
    })
  
    const Unlike = (async (id)=>{
        setLike('unlike')      
        await axios.put(`${URL}/upload/multimedia/unlike/${recipeId}`,{
            likes:id
        })
    })


    return (
        <>              
            <li id="items" title={likes.includes(Id) ? 'Unlike' : 'Like'}>{likes.includes(Id) ? <Favorite id="error" title='Like' className="like" onClick={()=>{Unlike(Id)}} /> : <FavoriteBorder className="like" title='Unlike'  onClick={()=>{Like(Id)}} /> } {likes.length} </li>
        </>
    );
}

export default Like;