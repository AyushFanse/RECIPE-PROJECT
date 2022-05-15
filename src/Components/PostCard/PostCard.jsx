import React, {useEffect} from 'react';
import { Grid, Card, ImageListItem } from '@mui/material';
import { Chat } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import jwt from 'jsonwebtoken';
import PostImage from '../PostImg/PostImage';
import Saved from '../SavedFunc/Saved';
import Delete from '../DeletePost/DeletePost';
import Like from '../LikeFunc/Like';
import RecipeTemp from '../RecipeTemp/RecipeData';

const PostCard=({ recipe, URL, user, setMessage, setChange })=>{
    const history = useHistory();
    const localToken = localStorage.getItem('token');
    const decodedToken = jwt.decode(localToken);
    const UID = decodedToken.user._id

    useEffect(()=>{

    },[recipe])
    
//-------------------------------* VIEW-PROFILE FUNCTION *-------------------------------//
    const ViewProfile = ((ID)=>{
        if(ID===user._id){
            history.push('/profile');
        }else{
            history.push(`/userProfile/${ID}`);
        }
    })

    return (
        <>
            <Grid className="postInCard">
                <ImageListItem id="imageBorder">
                    <Card id="homeCard" data-aos="slide-up">
                        <Grid id="User" onClick={()=>ViewProfile(recipe.userId)}>
                            <p id="userName">{recipe.username}</p>
                        </Grid>
                        <Grid id="imgOut"> 
                            <PostImage file={recipe.files} pagination={true} />
                        </Grid>
                        <Grid id="tabsOut">
                            <ul di="tabs">
                                <Like Id={user._id} URL={URL} recipeId={recipe._id} />
                                <li title="Comment" onClick={()=>{history.push(`/comment/${recipe._id}`)}}>
                                    <Chat id="chat" /> {recipe.comments.length} 
                                </li>
                                {
                                    recipe.userId===UID
                                ?
                                    <Delete URL={URL} recipeId={recipe._id} setChange={setChange} setMessage={setMessage}/>
                                :
                                    <Saved Id={user._id} URL={URL} recipeId={recipe._id} />
                                }
                            </ul>
                        </Grid>
                        <Grid di="titleOut">
                            <h3 id="postTime">
                                {moment(recipe.time).fromNow()}          
                            </h3>
                            <h5 id="title">
                                {recipe.title}          
                            </h5>
                        </Grid>
                        <RecipeTemp recipe={recipe}/>
                    </Card>
                </ImageListItem> 
            </Grid>            
        </>
    );
}

export default PostCard;