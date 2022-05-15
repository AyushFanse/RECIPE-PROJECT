import React from 'react';
import PropTypes from 'prop-types';
import { Box,LinearProgress,Typography }from '@mui/material';

const Progress = ({percentage}) => {
  
  return (
    <>
      { 
          percentage<=0
        ?
          null
        :
          (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: `${percentage}%` , mr: 1 }}>
                <LinearProgress variant="determinate" value={percentage} />
              </Box>
              <Box >
                <Typography variant="body2" color="text.secondary">{`${percentage}%`}</Typography>
              </Box>
            </Box>
          )
      }
    </>
  );
};

Progress.propTypes = {
  percentage: PropTypes.number.isRequired
};

export default Progress;