import  React, { useState, useEffect } from  'react';
import { useSelector } from  'react-redux';
import  { Snackbar }  from  '@material-ui/core';

export const PopUp = () => {
    const [flash, setFlash] = useState("");
    const message = useSelector(state => state.message.msg);

    useEffect(() => {
        if(message) {
            setFlash(message);
        }
    },[message]);
        
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