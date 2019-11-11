import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        width: "100%",
        height: "100%",
        backgroundColor: "red"
    }
})
export const Favorites = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>Favorites</div>
    )
}