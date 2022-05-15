import { Grid, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import React, {  useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function Delete({ userId, URL, posts }) {

//-------------------------------* USE-STATE METHODES *-------------------------------//
const [openDelete, setOpenDelete] = useState(false);
const [loading, setLoading] = useState(false);
const localToken = localStorage.getItem('token');
const history = useHistory();


//-------------------------------* Delete Account *-------------------------------//

    const DeleteAccount = (async (Id)=>{
        setLoading(true);

        if(posts.length>0){
            await posts.forEach(async(post)=>{
                await axios.delete(`${URL}/upload/multimedia/delete/${post._id}`,
                    {
                        headers:{ token:localToken }
                    })
                })
        }

        let response = await axios.delete(`${URL}/users/deleteuser/${Id}`,
            {
                headers:{ token:localToken }
            })
            

            if (response.status === 200) {
                localStorage.removeItem('token');
                setTimeout(() =>{ 
                    history.push('/');
                }, 1000);               

                alert(response.data.msg);
            }
    })

 
//-------------------------------* DELETE SECTION MENU *-------------------------------//
    const handleClickOpenDelete = () => {
        setOpenDelete(true);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    
    return (
        <>            
            <Grid id="settingOptions">
                <h5 onClick={handleClickOpenDelete}>
                    Delete Account
                </h5>
                {
                    loading
                ?
                    <CircularProgress />
                :
                    <Dialog
                        open={openDelete}
                        onClose={handleCloseDelete}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Do You Want to Delete Your Account?"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Once Your Account Get Deleted, You will not have any data left or you will not be able to get that data back...!
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDelete}> 
                                Disagree 
                            </Button>
                            <Button onClick={()=>{DeleteAccount( userId )}}> 
                                Agree 
                            </Button>
                        </DialogActions>
                    </Dialog>
                }
            </Grid>
        </>
    );
}

export default Delete;