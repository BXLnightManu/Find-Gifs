import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        width: "100%",
        height: "100%",
        backgroundColor: "blue"
    }
})

export const Historical = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>Historical</div>
    )
}