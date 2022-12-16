import React from 'react';
import LoginComponent from './Pages/Auth/LoginComponent';
import {Route,BrowserRouter, Switch} from "react-router-dom";
import HomeComponent from './Pages/Home/HomeComponent';
import SavedComponent from './Pages/Saved/SavedComponent';
import ProfileComponent from './Pages/Profile/ProfileComponent';
import UserProfileComponent from './Pages/Profile/UserProfileComponent';
import SignupComponent from './Pages/Auth/SignUpComponent';
import SettingsComponent from './Pages/Setting/SettingsComponent';
import Upload from './Pages/Upload/FileUpload';
import Comment from './Components/Comment/Comment';
import Error from './Pages/Error/Error.jsx';

const URL ='https://recipes-webapplication.onrender.com';

function RouteComponent(){
    return(
       <>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/"><LoginComponent URL={URL} /></Route>
                    <Route exact path="/signup" ><SignupComponent URL={URL}/></Route>
                    <Route exact path='/home' ><HomeComponent URL={URL}/></Route>
                    <Route exact path='/saved' ><SavedComponent URL={URL}/></Route>
                    <Route exact path='/profile' ><ProfileComponent URL={URL}/></Route>
                    <Route exact path='/userprofile/:userId' ><UserProfileComponent URL={URL}/></Route>
                    <Route exact path='/settings' ><SettingsComponent URL={URL}/></Route>
                    <Route exact path="/upload" ><Upload URL={URL}/></Route>
                    <Route exact path="/comment/:postId" ><Comment URL={URL}/></Route>
                    <Route exact path="*" ><Error /></Route>
                </Switch>
            </BrowserRouter>
       </> 
    )
}

export default RouteComponent;