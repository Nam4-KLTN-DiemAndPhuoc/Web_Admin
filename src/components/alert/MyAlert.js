

import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

export default function MyAlert({severity, message}) {
    console.log(severity, message)
  
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity= {severity} >
       
         <strong> {message}</strong>
      </Alert>
      
    </Stack>
  );
}
