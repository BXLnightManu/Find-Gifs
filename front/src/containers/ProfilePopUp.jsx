import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Avatar, List, ListItem, ListItemText } from '@material-ui/core';
import { useStylesForProfilePopUp } from '../styles';

export const ProfilePopUp = () => {
    const [userInfo, setUserInfo] = useState("");
    const user = useSelector(state => state.user.user);
    const classes = useStylesForProfilePopUp();

    useEffect(() => {
        if(user) {
            setUserInfo(user);
        }
    },[user])
    
    const setAvatar = () => {
        if(userInfo.imageProfile) {
          return <Avatar className={classes.avatar} alt={userInfo.firstname} src={userInfo.imageProfile} />
        }
        return <Avatar className={classes.avatar} alt={userInfo.firstname} src="/images/random.png" />
    }

    return (
        <div className={classes.root}>
            <Grid className={classes.gridContainer} container item xs={12}>
                <Grid className={classes.grid} item  xs={12}  sm={8}>
                    <p>My Profile</p>
                </Grid>
                <Grid className={classes.grid} item  xs={12}  sm={4}>
                    {setAvatar()}
                </Grid>
            </Grid>
            <List>
                <ListItem>
                    <ListItemText primary="Email" secondary={userInfo.email}/>
                </ListItem>
            </List>
        </div>
    )
}