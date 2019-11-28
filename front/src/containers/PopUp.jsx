import  React, { useState, useEffect } from  'react';
import { useSelector } from  'react-redux';
import  { Snackbar }  from  '@material-ui/core';

export const PopUp = () => {
    const [flash, setFlash] = useState("");
    const messageAuth = useSelector(state => state.auth.msg);
    const messageRender = useSelector(state => state.render.msg);

    useEffect(() => {
        if(messageAuth) {
            setFlash(messageAuth);
        }
        if(messageRender) {
            setFlash(messageRender);
        }
    },[messageAuth, messageRender]);
        
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