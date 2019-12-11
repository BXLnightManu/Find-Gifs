import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Paper, Grid, List, ListItem, ListItemText, TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import PublishIcon from '@material-ui/icons/Publish';
import { useTheme } from '@material-ui/core/styles';
import { useStylesForProfile } from '../styles';

export const Profile = ({history}) => {
    const uploadPlaceholder = "Choose your photo";
    const [userInfo, setUserInfo] = useState({});
    const [fileName, setFileName] = useState(uploadPlaceholder);
    const [changePI, setChangePI] = useState(false);
    const [updatedPI, setUpdatedPI] = useState({});
    const [open, setOpen] = React.useState(false);
    const user = useSelector(state => state.user.user);
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();
    const classes = useStylesForProfile();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        if (user) {
            setUserInfo(user);
        }
    }, [user])

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };


    const modifyPI = () => {
        setChangePI(!changePI);
    }

    const handlePIChange = (e) => {
        let name = e.target.name;
        setUpdatedPI({ ...updatedPI, [name]: e.target.value });
    }

    const updatePI = (e) => {
        e.preventDefault();
        if (Object.keys(updatedPI).length >= 1) {
            const payload = {};
            if (!updatedPI.firstname) {
                payload.firstname = userInfo.firstname;
            } else {
                payload.firstname = updatedPI.firstname;
            }
            if (!updatedPI.lastname) {
                payload.lastname = userInfo.lastname;
            } else {
                payload.lastname = updatedPI.lastname;
            }
            if (!updatedPI.email) {
                payload.email = userInfo.email;
            } else {
                payload.email = updatedPI.email;
            }
            const CONFIG = {
                method: "POST",
                headers: new Headers(
                    {
                        "Authorization": 'Bearer ' + token,
                        "Content-Type": "Application/json"
                    }
                ),
                body: JSON.stringify(payload)
            }
            const path = "/user/updateprofile";
            fetch(path, CONFIG)
                .then(res => res.json())
                .then(res => {
                    if (!res.payload.ok) {
                        setUpdatedPI({});
                        return;
                    }
                    setUpdatedPI({});
                    localStorage.setItem("user", JSON.stringify(res.payload.lightUser));
                    const action = {
                        type: "USER",
                        user: res.payload.lightUser
                    }
                    dispatch(action);
                })
                .catch(err => {
                    console.error(err);
                })
        }

    }


    const deleteProfile = (e) => {
        e.preventDefault();
        const CONFIG = {
            method: "DELETE",
            headers: new Headers(
                {
                    "Authorization": 'Bearer ' + token
                }
            )
        };
        const path = "/user/deleteprofile";
        fetch(path, CONFIG)
            .then(res => res.json())
            .then(res => {
                if (res.payload.ok) {
                    localStorage.clear();
                    const actionToken = {
                        type: "AUTH",
                        token: null
                    }
                    const actionMessage = {
                        type: "MSG",
                        message: res.payload.message
                    }
                    dispatch(actionToken);
                    dispatch(actionMessage);
                    return;
                }
                const actionMessage = {
                    type: "MSG",
                    message: "Failed to unsubscribe... Please contact the administrator."
                }
                dispatch(actionMessage);
            })
    }

    const handlePhotoChange = (e) => {
        const file = e.target.value.split("\\").pop();
        if (file) {
            setFileName(file);
        } else {
            setFileName(uploadPlaceholder);
        }
    }

    const updatePhoto = (e) => {
        e.preventDefault();
        const CONFIG = {
            method: "POST",
            headers: new Headers(
                {
                    "Authorization": 'Bearer ' + token
                }
            ),
            body: new FormData(e.currentTarget)
        };
        const path = "/photoupload";
        if (fileName !== uploadPlaceholder) {
            fetch(path, CONFIG)
                .then(res => res.json())
                .then(res => {
                    setFileName(uploadPlaceholder);
                    localStorage.setItem("user", JSON.stringify(res.payload.lightUser));
                    const action = {
                        type: "USER",
                        user: res.payload.lightUser
                    }
                    dispatch(action);
                })
                .catch(err => {
                    console.error(err);
                })
        }
    }

    const displayPicture = () => {
        if (userInfo.imageProfile) {
            return <img className={classes.img} src={userInfo.imageProfile} alt={userInfo.firstName} />
        }
        return <img className={classes.img} src="/images/random.png" alt={userInfo.firstName} />
    }

    const displayPI = () => {
        if (!changePI) {
            return (
                <List>
                    <ListItem>
                        <ListItemText primary="Email" secondary={userInfo.email} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Firstname" secondary={userInfo.firstname} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Lastname" secondary={userInfo.lastname} />
                    </ListItem>
                </List>
            )
        }
        return (
            <form onSubmit={updatePI}>
                <TextField onChange={handlePIChange} fullWidth type="email" name="email" label={userInfo.email} margin="normal" />
                <TextField onChange={handlePIChange} fullWidth type="text" name="firstname" label={userInfo.firstname} margin="normal" />
                <TextField onChange={handlePIChange} fullWidth type="text" name="lastname" label={userInfo.lastname} margin="normal" />
                <Button variant="contained" color="primary" type="submit">Submit</Button>
            </form>
        )
    }

    return (
        <Grid container item xs={12} className={classes.gridRoot}>
            <Paper elevation={4} className={classes.paper}>
                <Grid container item xs={12} className={classes.gridContainer}>
                    <Grid className={classes.grid} item xs={12} sm={6}>
                        <h2 className={classes.title}>My picture</h2>
                        {displayPicture()}
                        <form className={classes.uploadForm} onSubmit={updatePhoto}>
                            <input onChange={handlePhotoChange} className={classes.uploadInput} type="file" id="photo" name="photo" accept="image/*" />
                            <label className={classes.uploadLabel} htmlFor="photo">{fileName}</label>
                            <Button className={classes.button} variant="contained" color="primary" type="submit"><PublishIcon /></Button>
                        </form>
                    </Grid>
                    <Grid className={classes.grid} item xs={12} sm={6}>
                        <div className={classes.PIContainer}>
                            <h2 className={classes.title}>My personal information</h2>
                            {displayPI()}
                            <Button onClick={modifyPI} className={classes.createIconButton}><CreateIcon className={classes.createIcon} color="primary" /></Button>
                        </div>
                        <Button onClick={handleClickOpen} className={classes.unsubscribeButton}>Unsubscribe</Button>
                        <div>
                            <Dialog
                                fullScreen={fullScreen}
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="responsive-dialog-title"
                            >
                                <DialogTitle id="responsive-dialog-title">{"Are you sure ?"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        There are still many gifs to find, and a lot of features coming ;-)
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} color="primary" autoFocus>
                                        No
                                     </Button>
                                    <Button onClick={deleteProfile} color="secondary">
                                        Yes
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}