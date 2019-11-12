import  React, { useState, useEffect } from  'react';
import {connect } from  'react-redux';
import  { Snackbar }  from  '@material-ui/core';

const PopUp = (props) => {
    const [flash, setFlash] = useState("");

    useEffect(() => {
        setFlash(props.flash);
    }, [props.flash]);

    const handleClose  = () => {
        setFlash("");
    };

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            autoHideDuration={2000}
            onClose={handleClose}
            open={flash !== ""}
            message={flash}
        />
    )
}

function  mapStateToProps(state) {
       return {flash:  state.flash.msg}
};

export default connect(mapStateToProps)(PopUp)