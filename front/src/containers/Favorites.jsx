/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from  'react-redux';
import { GridList, GridListTile, GridListTileBar,ListSubheader, IconButton, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import LinkIcon from '@material-ui/icons/Link';
import { useStylesForRender, useStylesLinkIcon, ActionIconWrapper } from '../styles';
import { BodyWrapper } from '../styles/appStyles';

export const Favorites = () => {
    const [gifs, setGifs] = useState([]);
    const [searchKey, setSearchKey] = useState("All");

    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();

    const classes = useStylesForRender();
    const classesLinkIcon = useStylesLinkIcon();

    useEffect(() => {
        getGifs();
    }, []);

    const copyLink = (e) => {
        const linkLogo = e.currentTarget;
        const tooltip = linkLogo.parentElement.firstChild;
        const imageLink = linkLogo.parentElement.parentElement.parentElement.parentElement.firstChild;
        const str = imageLink.getAttribute("src");
        const el = document.createElement('textarea');
        el.value = str;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        tooltip.removeAttribute("hidden")
        setTimeout(()=> tooltip.setAttribute("hidden", ""), 3000);
    }

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
            .then(res  => {
                setGifs(res.payload.value);
            })
            .catch(err => {
                console.error(err);
            })
    }
    const deleteFromFavorites = (e) => {
        const button = e.currentTarget;
        const giffyID = button.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute("id");
        const CONFIG = {
            method:     "DELETE",
            headers: new Headers({"Authorization": 'Bearer '  +  token}),
        };
        const path = `/gifs/${giffyID}`;
        fetch(path, CONFIG)
            .then(res  => {
                if (res)
                    return res.json();
                else
                    throw new Error(res.statusText);
            })
            .then(res => {
                if(res.payload.ok) {
                    const actionMessage = {
                        type: "MSG",
                        message : `Gif "${res.payload.value.removedGif}" has been successfully deleted.`
                    }
                    dispatch(actionMessage);
                    setGifs(res.payload.value.newFavorites);
                }
            })
            .catch()
    }

    const displayGifs = () => {
        if(!gifs.length) {
            return (
                <GridListTile key="Subheader" cols={3} style={{ height: 'auto' }} className={classes.gridListSubheader}>
                    <ListSubheader component="div" className={classes.listSybheader}>You have not added a favorite GIF yet.</ListSubheader>
                </GridListTile>
            );
        } else {
            return (
                gifs.filter(gif => {
                    if(searchKey==="All") {
                        return gif
                    } else {
                        return gif.searchKey === searchKey
                    }
                }).map(gif => (
                <GridListTile key={gif.gif.giffyID} id={gif.gif.giffyID}>
                    <img src={gif.gif.image} alt={gif.gif.title} className={classes.image} />
                    <GridListTileBar
                        className={classes.favoritesIconF}
                        title={gif.gif.title}
                        actionIcon={
                            <ActionIconWrapper>
                                        <div className={classes.tooltip} hidden>Link added to clipboard!</div>
                                        <LinkIcon onClick={copyLink} className={classes.linkIcon} classes={classesLinkIcon} color="primary" />
                                        <IconButton id="1" color="secondary" aria-label="delete" className={classes.margin} onClick={deleteFromFavorites}>
                                            <DeleteIcon fontSize="large" />
                                        </IconButton>
                                    </ActionIconWrapper>
                        }
                    />
                </GridListTile>
                ))
            );
        }
    }

    const handleChange = (e) => {
        setSearchKey(e.target.value);
    }

    return (
        <BodyWrapper>
            <div className={classes.container}>
                <GridList cellHeight="auto" className={classes.gridList} cols={3}>
                    <GridListTile key="subheader" cols={3} style={{ height: "auto" }} className={classes.gridListSubheader}>
                        <ListSubheader component="div" className={classes.listSybheader}>
                            <FormControl variant="filled" className={classes.formControl}>
                                <InputLabel id="search-Key-label">Sorted by</InputLabel>
                                <Select
                                labelId="search-Key-label"
                                value={searchKey}
                                onChange={handleChange}
                                >
                                    <MenuItem key="all" value="All">
                                        <em>All</em>
                                    </MenuItem>
                                    {gifs.map(gif => gif.searchKey).reduce((acc, cur) => {
                                        const cond = !acc.includes(cur);
                                        if(cond) {
                                            acc.push(cur);
                                        } return acc;
                                    },[]).map((sk,i) => <MenuItem key={i} value={sk}>{sk}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </ListSubheader>
                    </GridListTile>
                    {displayGifs()}
                </GridList>
            </div>
        </BodyWrapper>
    )
}