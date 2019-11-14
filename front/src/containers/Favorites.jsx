import React, { useState, useEffect } from 'react';
import { useSelector } from  'react-redux';
import { GridList, GridListTile, GridListTileBar,ListSubheader, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useStylesForRender } from '../components/styles';

export const Favorites = () => {
    const classes = useStylesForRender();
    const [state, setState] = useState({gifs:[]});
    const token = useSelector(state => state.auth.token)

    useEffect(() => {
        getGifs();
        return;
    });

    const getGifs = () => {
        const CONFIG = {
            method:     "GET",
            headers: new Headers({"Authorization": 'Bearer '  +  token})
        };
        const path = "/gifs";
        fetch(path, CONFIG)
            .then(res  => {
                if (res)
                    return  res.json()
                else
                    throw  new  Error(res.statusText)
            })
            .then(res  => {setState({...state, gifs: res})})
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
                        <GridListTile key={gif.giffyID}>
                            <img src={gif.image} alt={gif.title} className={classes.image} />
                            <GridListTileBar
                                title={gif.title}
                                actionIcon={
                                    <IconButton aria-label="delete" className={classes.margin}>
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