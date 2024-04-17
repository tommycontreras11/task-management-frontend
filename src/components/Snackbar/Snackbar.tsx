import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import * as React from 'react';

export interface CustomSnackbarProps {
  message: string;
  severity: "success" | "error" | "info" | "warning";
  autoHideDuration?: number;
  open: boolean;
}

const CustomizedSnackbars: React.FC<CustomSnackbarProps> = ({ message, severity, autoHideDuration = 6000, open }) => {
  return (
      <Snackbar open={open} autoHideDuration={autoHideDuration}>
        <Alert
          severity={severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
  );
}

export default CustomizedSnackbars;
