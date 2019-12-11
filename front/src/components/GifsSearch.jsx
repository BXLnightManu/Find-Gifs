import React, { useState, useRef, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import clsx from 'clsx';
import { useStylesForSearch } from '../styles';
import { BodyWrapper } from '../styles/appStyles';
import Icon from '@material-ui/core/Icon';
import { GifsRender } from '../containers';

export const GifSearch = () => {
    const classes = useStylesForSearch();
    const [state, setState] = useState({query:"", gifs:[], offset: 6});
    const inputRef = useRef(null);
    const submitRef = useRef(null);

    useEffect(() => {
        const input = inputRef.current;
        const submit = submitRef.current;
        input.addEventListener("input", handleChange);
        submit.addEventListener("submit", submitForSearch);
        return function clean() {
            input.removeEventListener("input", handleChange);
            submit.removeEventListener("submit", submitForSearch);
        }
    })
    
    const handleChange = (e) => {
        const query = e.target.value;
        setState({...state, query});
    }

    const submitForSearch = (e) => {
        e.preventDefault();
        const CONFIG = {
            method:     "GET",
            headers: new Headers({"Content-Type": "application/json"})
        };
        const apiKey = "U5iZXqN1y4BLuojYABZK8cLd2cmjCtBS";
        const path = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${state.query}&limit=6&offset=0&rating=G&lang=en`;
        fetch(path, CONFIG)
            .then(res  => {
                if (res)
                    return  res.json()
                else
                    throw  new  Error(res.statusText)
            })
            .then(res  => {setState({ ...state, gifs: res.data })})
            .catch()
        }

        const searchForMore = () => {
            const CONFIG = {
                method:     "GET",
                headers: new Headers({"Content-Type": "application/json"})
            };
            const apiKey = "U5iZXqN1y4BLuojYABZK8cLd2cmjCtBS";
            let offset = state.offset;
            const path = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${state.query}&limit=6&offset=${offset}&rating=G&lang=en"`;
            fetch(path, CONFIG)
                .then(res  => {
                    if (res)
                        return  res.json()
                    else
                        throw  new  Error(res.statusText)
                })
                .then(res  => {setState({ ...state, gifs: res.data, offset: offset+6 })})
                .catch()
            }

    const reduce = () => {
        let gifObjects = [];
        const gifs = state.gifs;
        gifs.forEach(gif => {
            gifObjects.push({giffyID: gif.id, title: gif.title, image: gif.images.original.url});
        })
        return gifObjects;
    }

    return (
        <BodyWrapper>
            <form ref={submitRef} className={classes.container}>
                <TextField
                    id="standard-required"
                    label="Search gifs"
                    className={classes.textField}
                    margin="normal"
                    ref={inputRef}
                />
                <Button variant="contained" color="primary" type="submit" className={classes.button}>
                    Find
                </Button>
                <div className={classes.iconContainer}>
                    <Icon
                        className={clsx(classes.iconHover, 'fa fa-plus-circle')}
                        color="primary"
                        style={{ fontSize: 30 }}
                        onClick={searchForMore}
                    >add_circle</Icon>
                    <p className={classes.more}>More</p>
                </div>
            </form>
            <GifsRender gifsToRender={reduce()} query={state.query} />
        </BodyWrapper>
    )
}