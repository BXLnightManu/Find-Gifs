import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppBar, Tabs, Tab, Button, Avatar, Menu, MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ProfilePopUp } from './ProfilePopUp';
import { useStylesForHeader } from '../styles';

const LinkTab = (props) => {
  return (
    <Tab
    component={Link}
    {...props}
    />
  );
}

const Name = ({name}) => {
  const classes = useStylesForHeader();
  return (
    <div className={classes.nameRoot}>
      <p className={classes.name}>{name}</p>
    </div>
  )
}

export const Header = ({history, userInfo}) => {
  const classes = useStylesForHeader();
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    const action = {
      type: "AUTH",
      token: ""
    }
    dispatch(action);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("setupTime");
    history.push("/signin");
  }

  const setAvatar = () => {
    if(userInfo.imageProfile) {
      return <Avatar alt={userInfo.firstname} src={userInfo.imageProfile} />
    }
    if(userInfo) {
      return <Avatar className={classes.orange}>{`${userInfo.firstname.charAt(0)}${userInfo.lastname.charAt(0)}`}</Avatar>
    }
  }

  return (
    <>
    <img className={classes.logo} src="./logo_transparent.png" alt="gifs-finder-logo" />
    <div className={classes.navTabRoot}>
    <AppBar position="static" className={classes.appBar}>
        <Tabs
        className={classes.tab}
        variant="fullWidth"
        value={value}
        onChange={handleChange}
        aria-label="Gifs Finder Tab"
        >
        <LinkTab label="Search for new gifs" to="/gifsearch" />
        <LinkTab label="Favorites" to="/favorites" />
        </Tabs>
        <div className={classes.avatarRoot}>
        <Button className={classes.button} aria-controls="user-menu" onClick={handleClick}>
            {setAvatar()}
            <Name name={userInfo.firstname}/>
        </Button>
        <Menu
            id="user-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            <MenuItem onClick={handleClose}><Link className={classes.linkToProfile} to="/profile"><ProfilePopUp /></Link></MenuItem>
            <MenuItem className={classes.logOut} onClick={logOut}><p>Logout</p></MenuItem>
        </Menu>
        </div>
    </AppBar>
    </div>
    </>
  );
}