import React from 'react';
import { DeleteForeverRounded } from '@mui/icons-material/';
import axios from 'axios';

function DeletePost({ URL, recipeId, setMessage, setChange }) {

//-------------------------------* DELETE POST FUNCTION *-------------------------------//
const Delete = (async (id)=>{
    
    if(window.confirm('Are you sure to delete this record?')){
        setChange(true)
        
        await axios.delete(`${URL}/upload/multimedia/delete/${id}`)

        setTimeout(()=>setMessage('Your post has been deleted Successfully'),1000);
        setTimeout(()=>setMessage(''),5000);
        }
})

    return (
        <>            
            <li title="Delete" id="items" onClick={()=>{Delete(recipeId)}}><DeleteForeverRounded id="error"/></li>
        </>
    );
}

export default DeletePost;