import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { BookmarkAddOutlined, BookmarkAdded } from '@mui/icons-material';


function Saved({ Id, URL, recipeId }) {
    const [saved, setSaved] = useState([]);
    const [save, setSave] = useState('');
    const localToken = localStorage.getItem('token');
    const FatchRef = useRef();

    useEffect(()=>{ 
        FatchRef.current();
    },[save])
    
//-------------------------------* FATCHING DATA FUNCTION *-------------------------------//

    let Fatch = (async()=>{

        let responsePosts = await axios.get(`${URL}/users/getuser/${Id}`,
            {
            headers: { token:localToken }
            }) 
            setSaved(responsePosts.data.saved) 
    })
      
    FatchRef.current = Fatch;

//-------------------------------* SAVE AND REMOVE SAVE POST FUNCTIONS *-------------------------------//

    const SavePost = (async (id)=>{
        setSave('save');
        await axios.put(`${URL}/users/savepost/${Id}`,{
            saved:id
        })    
    })
    
    const deleteSavedPost = (async (id)=>{    
        setSave('unsave')  ;     
        await axios.put(`${URL}/users/deletesavedpost/${Id}`,{
            saved:id
        })      
    })
    
    return (
        <>
            <li id="items" title={saved.includes(recipeId) ? 'Unsaved' : 'Saved' } >{saved.includes(recipeId) ?  <BookmarkAdded id="mark" className="Bookmark" onClick={()=>{deleteSavedPost(recipeId)}}/> : <BookmarkAddOutlined id="BookmarkAddIcon" className="Bookmark" onClick={()=>{SavePost(recipeId)}}/> }</li>
        </>
    );
}

export default Saved;