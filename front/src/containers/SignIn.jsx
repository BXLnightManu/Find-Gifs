/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TextField, Button } from "@material-ui/core";
import { useStylesForSign } from "../components/styles";

export const SignIn = props => {
    const dispatch = useDispatch();
    const classes = useStylesForSign();
    const [state, setState] = useState({ email: "", password: "" });
    const inputRefEmail = useRef(null);
    const inputRefPwd = useRef(null);
    const submitRef = useRef(null);

    useEffect(() => {
        const inputEmail = inputRefEmail.current;
        const inputPwd = inputRefPwd.current;
        const submit = submitRef.current;
        inputEmail.addEventListener("input", handleChange);
        inputPwd.addEventListener("input", handleChange);
        submit.addEventListener("submit", handleSubmit);
        return function clean() {
            inputEmail.removeEventListener("input", handleChange);
            inputPwd.removeEventListener("input", handleChange);
            submit.removeEventListener("submit", handleSubmit);
        };
    });

    const handleChange = e => {
        let name = e.target.name;
        setState({ ...state, [name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        const CONFIG = {
            method: "POST",
            headers: new Headers({ "Content-Type": "Application/json" }),
            body: JSON.stringify(state)
        };
        const path = "/auth/signin";
        fetch(path, CONFIG)
            .then(res => res.json())
            .then(res => {
                const token = res.token;
                localStorage.setItem("token", token);
                dispatch({
                    type: "AUTH",
                    token,
                    message: res.flash
                });
                res.redirect && props.history.push("/gifsearch");
            })
            .catch(err => {
                console.error(err);
            });
    };

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <Button
                    className={classes.signUpButton}
                    variant="contained"
                    color="secondary"
                >
                    <Link className={classes.linkButton} to="/signup">
                        Sign Up
                    </Link>
                </Button>
                <h1>Sign In</h1>
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
                    <Button variant="contained" color="primary" type="submit">
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    );
};
