import { Alert, Box, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface IAlertProps {
  message: {
    error: boolean;
    message: string;
  };
  openAlert: boolean;
  setOpenAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AlertPopup = ({
  message: { error, message },
  openAlert,
  setOpenAlert,
}: IAlertProps) => {
  return (
    <Box sx={{ width: "400px" }}>
      <Collapse in={openAlert}>
        <Alert
          severity={error ? "error" : "success"}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {message}
        </Alert>
      </Collapse>
    </Box>
  );
};

export default Alert;
