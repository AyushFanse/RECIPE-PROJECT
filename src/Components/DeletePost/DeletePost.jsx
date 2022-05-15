import React from 'react';
import { DeleteForeverRounded } from '@mui/icons-material/';
import axios from 'axios';

function DeletePost({ URL, recipeId, setChange }) {

//-------------------------------* DELETE POST FUNCTION *-------------------------------//
    const Delete = (async (id) => {

        if (window.confirm('Are you sure to delete this record?')) {
            setChange(true)

            await axios.delete(`${URL}/upload/multimedia/delete/${id}`)

        }
    })

    return (
        <>
            <li title="Delete" id="items" onClick={() => { Delete(recipeId) }}><DeleteForeverRounded id="error" /></li>
        </>
    );
}

export default DeletePost;