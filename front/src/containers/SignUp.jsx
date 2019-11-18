import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from  'react-redux';
import { TextField, Button } from '@material-ui/core';
import { useStylesForSign } from '../components/styles'

export const SignUp = (props) =>  {
    const dispatch = useDispatch();
    const classes = useStylesForSign();
    const [state, setState] = useState({
        email:      "",
        password:   "",
        passwordC:  "",
        firstname:  "",
        lastname:   ""
    });
    const inputRefEmail = useRef(null);
    const inputRefPwd = useRef(null);
    const inputRefPwdC = useRef(null);
    const inputRefFName = useRef(null);
    const inputRefLName = useRef(null);
    const submitRef = useRef(null);

    useEffect(() => {
        const inputEmail = inputRefEmail.current;
        const inputPwd = inputRefPwd.current;
        const inputPwdC = inputRefPwdC.current;
        const inputFName = inputRefFName.current;
        const inputLName = inputRefLName.current;
        const submit = submitRef.current;
        inputEmail.addEventListener("input", handleChange);
        inputPwd.addEventListener("input", handleChange);
        inputPwdC.addEventListener("input", handleChange);
        inputFName.addEventListener("input", handleChange);
        inputLName.addEventListener("input", handleChange);
        submit.addEventListener("submit", handleSubmit);
            return function clean() {
                inputEmail.removeEventListener("input", handleChange);
                inputPwd.removeEventListener("input", handleChange);
                inputPwdC.removeEventListener("input", handleChange);
                inputFName.removeEventListener("input", handleChange);
                inputLName.removeEventListener("input", handleChange);
                submit.removeEventListener("submit", handleSubmit);
            }
    })

    const handleChange = (e) => {
        let name = e.target.name;
        setState({...state, [name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const CONFIG = {
            method:     "POST",
            headers:    new Headers({"Content-Type": "Application/json"}),
            body:       JSON.stringify(state)
        };
        const path = "/auth/signup";
        fetch(path, CONFIG)
            .then(res => res.json())
            .then(res =>
                {
                    dispatch(
                        {
                            type : "AUTH",
                            message : res.flash
                        }
                    )
                    res.redirect && props.history.push("/signin");
                }
            )
            .catch(err => {
                console.error(err);
            })
    }

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <Button className={classes.signUpButton} variant="contained" color="secondary" ><Link className={classes.linkButton} to="/signin">Sign In</Link></Button>
                <h1>Sign Up</h1>
                <form id="form" ref={submitRef}>
                    <TextField
                        ref={inputRefEmail}
                        required
                        fullWidth
                        id="email"
                        type="email"
                        name="email"
                        label="E-mail"
                        margin="normal"
                    />
                    <TextField
                        ref={inputRefPwd}
                        required
                        fullWidth
                        id="password"
                        type="password"
                        name="password"
                        label="Password"
                        margin="normal"
                    />
                    <TextField
                        ref={inputRefPwdC}
                        required
                        fullWidth
                        id="password-confirm"
                        type="password"
                        name="password"
                        label="Confirm password"
                        margin="normal"
                    />
                    <TextField
                        ref={inputRefFName}
                        required
                        fullWidth
                        id="firstname"
                        type="text"
                        name="firstname"
                        label="Firstname"
                        margin="normal"
                    />
                    <TextField
                        ref={inputRefLName}
                        required
                        fullWidth
                        id="lastname"
                        type="text"
                        name="lastname"
                        label="Lastname"
                        margin="normal"
                    />
                    <Button variant="contained" color="primary" type="submit">Submit</Button>
                </form>
            </div>
        </div>
    )
}