import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button, Checkbox } from '@material-ui/core';
import { useStylesForContact, ButtonWrapper, CheckWrapper } from '../styles';
import { BodyWrapper } from '../styles/appStyles';

export const Contact = () => {
    const classes = useStylesForContact();
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();
    const [emailData, setEmailData] = useState({name: "", from: "", subject: "", message: "", checkbox: false});
    const [charRemaining, setCharRemaining] = useState(200);

   
    const handleChange = (e) => {
        let name = e.target.name;
        if(name==="checkbox") {
            setEmailData({...emailData, [name]: !emailData.checkbox});
        } else {
            setEmailData({...emailData, [name]: e.target.value});
        }
        if(name==="message") {
            let messageLength = e.target.value.length;
            setCharRemaining(200-messageLength);
            if(charRemaining<0) {
                setCharRemaining("Maximum characters exceeded !");
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            from: emailData.from,
            to: "thegifsfinder@gmail.com,",
            subject: emailData.subject,
            text: emailData.message,
            name: emailData.name,
            forward: emailData.checkbox
        }
        const CONFIG = {
            method: "POST",
            headers: new Headers(
                {
                    "Authorization": 'Bearer ' + token,
                    "Content-Type": "Application/json"
                }
            ),
            body: JSON.stringify(data)
        }
        const path = "/email";
        if(Object.keys(data).length===6 && charRemaining>=0 && typeof charRemaining!=="string") {
            fetch(path, CONFIG)
            .then(res => res.json())
            .then(res => {
                setEmailData({name: "", from: "", subject: "", message: "", checkbox: false});
                setCharRemaining(200);
                const actionMessage = {
                    type: "MSG",
                    message: res.payload.message
                }
                dispatch(actionMessage);
            })
            .catch(err => {
                console.error(err);
            })
        } else {
            if(charRemaining<0 || typeof charRemaining==="string") {
                const actionMessage = {
                    type: "MSG",
                    message: "Maximum characters exceeded ! Please reduce the message length."
                }
                dispatch(actionMessage);
                return;
            }
            const actionMessage = {
                type: "MSG",
                message: "Please fill all the required fields."
            }
            dispatch(actionMessage);
        }
    }

    return (
        <BodyWrapper className={classes.root}>
            <h1 className={classes.title}>Contact me</h1>
            <form className={classes.form} onSubmit={handleSubmit}>
                <TextField
                    onChange={handleChange}
                    className={classes.input}
                    value={emailData.name}
                    required
                    fullWidth
                    type="text"
                    name="name"
                    label="Name"
                    margin="normal"
                />
                <TextField
                    onChange={handleChange}
                    className={classes.input}
                    value={emailData.from}
                    required
                    fullWidth
                    type="email"
                    name="from"
                    label="Your e-mail"
                    margin="normal"
                />
                <TextField
                    onChange={handleChange}
                    className={classes.input}
                    value={emailData.subject}
                    required
                    fullWidth
                    type="text"
                    name="subject"
                    label="Subject"
                    margin="normal"
                />
                <TextField
                    onChange={handleChange}
                    className={classes.input}
                    value={emailData.message}
                    required
                    fullWidth
                    multiline
                    rows="4"
                    type="text"
                    name="message"
                    label="Message"
                    margin="normal"
                    helperText={charRemaining}
                />
                <ButtonWrapper>
                    <CheckWrapper>
                        <Checkbox
                            checked={emailData.checkbox}
                            onChange={handleChange}
                            name="checkbox"
                            value={emailData.checkbox}
                            color="primary"
                            inputProps={{
                                'aria-label': 'secondary checkbox',
                            }}
                        />
                        <p className={classes.forward}>Send me a copy</p>
                    </CheckWrapper>
                </ButtonWrapper>
                <Button variant="contained" color="primary" type="submit">Submit</Button>
            </form>
        </BodyWrapper>
    )
}