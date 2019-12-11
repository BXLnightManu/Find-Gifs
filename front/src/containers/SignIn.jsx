/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { TextField, Button, Checkbox } from '@material-ui/core';
import { useStylesForSign, ButtonWrapper, CheckWrapper } from '../styles';

export const SignIn = ({ history }) => {
    const dispatch = useDispatch();
    const classes = useStylesForSign();
    const [inputs, setInputs] = useState({ email: "", password: "" });
    const [remember, setRemember] = useState(false);
    let wrongpwCount = 1;
    let wrongusrCount = 1;

    useEffect(()=> {
        if(localStorage.getItem("email")) {
            setInputs({...inputs, email: localStorage.getItem("email")});
            setRemember(true);
        }
    },[])

    const handleChange = (e) => {
        let name = e.target.name;
        if(e.target.value==="remember") {
            setRemember(!remember);
        }
        let defaultValue = e.target.defaultValue;
        if(defaultValue && e.target.defaultValue!=="remember") {
            setInputs({ ...inputs, [name]: e.target.defaultValue });
        }
        setInputs({ ...inputs, [name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const CONFIG = {
            method: "POST",
            headers: new Headers({ "Content-Type": "Application/json" }),
            body: JSON.stringify(inputs)
        };
        const path = "/auth/signin";
        fetch(path, CONFIG)
            .then(res => res.json())
            .then(res => {
                if(remember) {
                    localStorage.setItem("email", res.payload.lightUser.email);
                } else {
                    localStorage.removeItem("email");
                }
                if(!res.payload.ok && res.payload.message==="Incorrect email.") {
                    const message = wrongusrCount+": "+res.payload.message
                    const action = {
                        type: "MSG",
                        message
                    }
                    dispatch(action);
                    wrongusrCount++;
                    return;
                } else if(!res.payload.ok && res.payload.message==="Incorrect password.") {
                    const message = wrongpwCount+": "+res.payload.message
                    const actionMessage = {
                        type: "MSG",
                        message
                    }
                    dispatch(actionMessage);
                    wrongpwCount++
                    return;
                }
                localStorage.setItem("token", res.payload.token);
                localStorage.setItem("user", JSON.stringify(res.payload.lightUser));
                const now = new Date().getTime();
                localStorage.setItem("setupTime", now);
                const actionToken = {
                    type: "AUTH",
                    token: res.payload.token,
                }
                const actionMessage = {
                    type: "MSG",
                    message: res.payload.message
                }
                const actionUser = {
                    type: "USER",
                    user: res.payload.lightUser
                }
                dispatch(actionToken);
                dispatch(actionMessage);
                dispatch(actionUser);
                res.redirect && history.push("/gifsearch");
            })
            .catch(err => {
                console.error(err);
            })
    }

    return (
        <>
            <img className={classes.logo} src="./logo_transparent.png" alt="gifs-finder-logo" />
            <div className={classes.root}>
                <div className={classes.container}>
                    <Button className={classes.signUpButton} variant="contained" color="secondary" ><Link className={classes.linkButton} to="/signup">Sign Up</Link></Button>
                    <h1>Sign In</h1>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <TextField
                            onChange={handleChange}
                            required
                            fullWidth
                            id="email"
                            type="email"
                            name="email"
                            label="E-mail"
                            margin="normal"
                            defaultValue={localStorage.getItem("email")}
                        />
                        <TextField
                            onChange={handleChange}
                            required
                            fullWidth
                            id="password"
                            type="password"
                            name="password"
                            label="Password"
                            margin="normal"
                        />
                        <ButtonWrapper>
                            <CheckWrapper>
                                <Checkbox
                                    checked={remember}
                                    onChange={handleChange}
                                    value="remember"
                                    color="primary"
                                    inputProps={{
                                        'aria-label': 'secondary checkbox',
                                    }}
                                />
                                <p className={classes.remember}>Remeber me</p>
                            </CheckWrapper>
                            <Button variant="contained" color="primary" type="submit">Submit</Button>
                        </ButtonWrapper>
                    </form>
                </div>
            </div>
        </>
    )
}