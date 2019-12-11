import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from  'react-redux';
import { TextField, Button } from '@material-ui/core';
import { useStylesForSign } from '../styles';

export const SignUp = ({history}) =>  {
    const dispatch = useDispatch();
    const classes = useStylesForSign();
    const [inputs, setInputs] = useState({
        email:      "",
        password:   "",
        passwordC:  "",
        firstname:  "",
        lastname:   ""
    });
    const [pwMessage, setPwMessage] = useState("");
    const [cpwMessage, setCpwMessage] = useState("");

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setInputs({...inputs, [name]: value});
        switch(name) {
            case "password":
                if(value.length<6) {
                    setPwMessage("Password must be at least 6 characters.");
                } else if (!RegExp(/[!@#$%^&*(),.?":{}|<>]/g).test(value)) {
                    setPwMessage("Password must include at least 1 special character.");
                } else {
                    setPwMessage("");
                }
                break;
            case "passwordC":
                if(value!==inputs.password) {
                    setCpwMessage("Passwords do not match.");
                } else {
                    setCpwMessage("");
                }
                break;
            default:
                break;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const CONFIG = {
            method:     "POST",
            headers:    new Headers({"Content-Type": "Application/json"}),
            body:       JSON.stringify(inputs)
        };
        const path = "/auth/signup";
        if(inputs.password!==inputs.passwordC) {
            const action = {
                type: "MSG",
                message: "Passwords do not match!"
            }
            dispatch(action);
            return;
        }
        fetch(path, CONFIG)
            .then(res => res.json())
            .then(res =>
                {
                    const action = {
                        type : "MSG",
                        message : res.payload.message
                    }
                    dispatch(action);
                    res.redirect && history.push("/signin");
                }
            )
            .catch(err => {
                console.error(err);
            })
    }

    return (
        <>
        <img className={classes.logo} src="./logo_transparent.png" alt="gifs-finder-logo" />
        <div className={classes.root}>
            <div className={classes.container}>
                <Button className={classes.signUpButton} variant="contained" color="secondary" ><Link className={classes.linkButton} to="/signin">Sign In</Link></Button>
                <h1>Sign Up</h1>
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
                    />
                    <TextField className={classes.input}
                        onChange={handleChange}
                        required
                        fullWidth
                        id="password"
                        type="password"
                        name="password"
                        label="Password"
                        margin="normal"
                        helperText={`${pwMessage}`}
                    />
                    <TextField className={classes.input}
                        onChange={handleChange}
                        required
                        fullWidth
                        id="password-confirm"
                        type="password"
                        name="passwordC"
                        label="Confirm password"
                        margin="normal"
                        helperText={`${cpwMessage}`}
                    />
                    <TextField
                        onChange={handleChange}
                        required
                        fullWidth
                        id="firstname"
                        type="text"
                        name="firstname"
                        label="Firstname"
                        margin="normal"
                    />
                    <TextField
                        onChange={handleChange}
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
        </>
    )
}