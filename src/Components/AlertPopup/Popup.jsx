import * as React from 'react';
import { Stack, Alert, Snackbar, Slide }  from '@mui/material';

function Transition(props) {
  return <Slide {...props} direction="left" />;
}

const Message = ({ message, security, close, loading })=>{
  const [open, setOpen] = React.useState(true);

  const handleClose = ( reason ) => {
    if (reason === 'clickaway') {
      return;
    } 

    setOpen(false);
    loading(false);
    close('');
  };

  setTimeout(()=>{setOpen(true);})

  return (
    <>
      {
          message
        ?
          <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={open} autoHideDuration={6000} TransitionComponent={Transition} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} onClose={handleClose}>
              <Alert elevation={6} onClose={handleClose} severity={ security || "success" } sx={{ width: '100%' }}>
                {message}
              </Alert>
            </Snackbar>
          </Stack>
        :
          null
      }
    </>
  );
}
  


export default Message;
