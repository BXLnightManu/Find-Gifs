import  React, { useState, useEffect } from  'react';
import { useSelector } from  'react-redux';
import  { Snackbar }  from  '@material-ui/core';

export const PopUp = () => {
    const [flash, setFlash] = useState("");
    const messageSignIn = useSelector(state => state.auth.msg);
    const messageSignUp = useSelector(state => state.reg.msg);

    useEffect(() => {
        if(messageSignIn) {
            setFlash(messageSignIn);
        }
        if(messageSignUp) {
            setFlash(messageSignUp);
        }
    },[messageSignIn,messageSignUp]);
        
    const handleClose  = () => {
        setFlash("");
    };

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            autoHideDuration={5000}
            onClose={handleClose}
            open={flash !== ""}
            message={flash}
        />
    )
}