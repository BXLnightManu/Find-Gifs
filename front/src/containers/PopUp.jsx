import  React, { useState, useEffect } from  'react';
import { useSelector } from  'react-redux';
import  { Snackbar, Slide }  from  '@material-ui/core';

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
  }

export const PopUp = () => {
    const [flash, setFlash] = useState("");
    const [transition, setTransition] = useState(undefined);
    const message = useSelector(state => state.message.msg);

    useEffect(() => {
        if(message) {
            setFlash(message);
            setTransition(()=>TransitionUp);
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
            TransitionComponent={transition}
            onClose={handleClose}
            open={flash !== ""}
            message={flash}
        />
    )
}