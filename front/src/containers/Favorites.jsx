/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from  'react-redux';
import { GridList, GridListTile, GridListTileBar,ListSubheader, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useStylesForRender } from '../components/styles';

let msgNumber = 1;
export const Favorites = () => {
    const classes = useStylesForRender();
    const [state, setState] = useState({gifs:[]});
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();

    useEffect(() => {
        getGifs();
    }, []);

    const getGifs = () => {
        const CONFIG = {
            method:     "GET",
            headers: new Headers({"Authorization": 'Bearer '  +  token})
        };
        const path = "/gifs";
        fetch(path, CONFIG)
            .then(res  => {
                if (res)
                    return res.json()
                else
                    throw new Error(res.statusText)
            })
            .then(res  => {setState({...state, gifs: res.payload.value})})
            .catch()
    }
    const deleteFromFavorites = (e) => {
        const button = e.currentTarget;
        const gifId = button.parentElement.parentElement.parentElement.parentElement.getAttribute("id");
        const CONFIG = {
            method:     "DELETE",
            headers: new Headers({"Authorization": 'Bearer '  +  token}),
        };
        const path = `/gifs/${gifId}`;
        fetch(path, CONFIG)
            .then(res  => {
                if (res)
                    return res.json();
                else
                    throw new Error(res.statusText);
            })
            .then(res => {
                if(res.payload.ok) {
                    const action = {
                        type: "SAVE",
                        message : `${msgNumber}: Gif successfully deleted !`
                    }
                    dispatch(action);
                    msgNumber ++;
                    getGifs();
                }
            })
            .catch()
    }
    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <GridList cellHeight="auto" className={classes.gridList} cols={3}>
                    <GridListTile key="Subheader" cols={3} style={{ height: 'auto' }} className={classes.gridListSubheader}>
                        <ListSubheader component="div" className={classes.listSybheader}>Gifs list</ListSubheader>
                    </GridListTile>
                    {state.gifs.map(gif => (
                        <GridListTile key={gif.giffyID} id={gif.giffyID}>
                            <img src={gif.image} alt={gif.title} className={classes.image} />
                            <GridListTileBar
                                title={gif.title}
                                actionIcon={
                                    <IconButton color="secondary" aria-label="delete" className={classes.margin} onClick={deleteFromFavorites}>
                                        <DeleteIcon fontSize="large" />
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        </div>
    )
}