import React from 'react';
import { useSelector, useDispatch } from  'react-redux';
import { GridList, GridListTile, GridListTileBar,ListSubheader, Fab } from '@material-ui/core';
import {Favorite} from '@material-ui/icons';
import { useStylesForRender } from './styles';

export const GifsRender = ({gifsToRender}) => {
    const classes = useStylesForRender();
    const token = useSelector(state => state.auth.token)
    const dispatch = useDispatch();
    const gifsAreReady = () => {
        if(gifsToRender.length) {
            const renderTitle = "Gifs list"
            return renderTitle;
        } else {
            const renderComment = "Gifs will be displayed here..."
            return renderComment;
        }
    }
    let msgNumber = 1;
    const addOnFavorites = (e) => {
        const button = e.currentTarget;
        const gifTitle = button.parentElement.parentElement.firstChild.firstChild.textContent;
        const gifImage = button.parentElement.parentElement.parentElement.firstChild.getAttribute("src");
        const gifId = button.parentElement.parentElement.parentElement.parentElement.getAttribute("id");
        const CONFIG = {
            method:     "POST",
            headers: new Headers(
                {
                    "Authorization": 'Bearer '  +  token,
                    "Content-Type": "Application/json"
                }
            ),
            body: JSON.stringify({
                giffyID:    gifId,
                title:      gifTitle,
                image:      gifImage
            })
        };
        const path = "/gifs";
        fetch(path, CONFIG)
            .then(res  => {
                if (res)
                    return res.json();
                else
                    throw new Error(res.statusText);
            })
            .then(res => {
                if(res.payload.ok) {
                    button.classList.add("Mui-disabled");
                    const action = {
                        type: "SAVE",
                        message : `Gif "${res.payload.value.title}" has been added to your favorites !`
                    }
                    dispatch(action);
                } else {
                    if(res.payload.message.includes("E11000")) {
                        const action = {
                            type: "SAVE",
                            message : `${msgNumber}: Already in your favorites !`
                        }
                        dispatch(action);
                        msgNumber ++;
                    }
                }
            })
            .catch()
    }
    return (
        <div className={classes.container}>
            <GridList cellHeight="auto" className={classes.gridList} cols={3}>
                <GridListTile key="Subheader" cols={3} style={{ height: 'auto' }} className={classes.gridListSubheader}>
                    <ListSubheader component="div" className={classes.listSybheader}>{gifsAreReady()}</ListSubheader>
                </GridListTile>
                    {gifsToRender.map(gif => (
                        <GridListTile key={gif.giffyID} id={gif.giffyID}>
                            <img src={gif.image} alt={gif.title} className={classes.image} />
                            <GridListTileBar
                                title={gif.title}
                                actionIcon={
                                    <Fab size="small" color="secondary" aria-label="add" className={classes.margin} onClick={addOnFavorites}>
                                        <Favorite />
                                    </Fab>
                                }
                            />
                        </GridListTile>
                    ))}
            </GridList>
        </div>
    )
}