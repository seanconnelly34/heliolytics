import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(
  props: AlertProps,
  ref: React.ForwardedRef<HTMLDivElement | null>
) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

type TToast = {
  severity: AlertColor | undefined;
  message: string;
  isOpen: boolean;
};

const Toast = ({ severity, message, isOpen = false }: TToast) => {
  const [open, setOpen] = useState(isOpen);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={open}
      onClose={handleClose}
      message='I love snacks'
    >
      <Alert onClose={handleClose} severity={severity}>
        {message}. Try again later.
      </Alert>
    </Snackbar>
  );
};

export default Toast;
