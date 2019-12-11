import React from 'react';
import { useSelector, useDispatch } from  'react-redux';
import { GridList, GridListTile, GridListTileBar,ListSubheader, Fab } from '@material-ui/core';
import { Favorite } from '@material-ui/icons';
import LinkIcon from '@material-ui/icons/Link';
import { useStylesForRender, useStylesLinkIcon, ActionIconWrapper } from '../styles';

export const GifsRender = ({gifsToRender, query}) => {
    const token = useSelector(state => state.auth.token)
    const dispatch = useDispatch();

    const classes = useStylesForRender();
    const classesLinkIcon = useStylesLinkIcon();
    
    const gifsAreReady = () => {
        if(!gifsToRender.length) {
            const renderComment = "Gifs will be displayed here..."
            return renderComment;
        }
    }

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

    const addOnFavorites = (e) => {
        const button = e.currentTarget;
        const gifTitle = button.parentElement.parentElement.parentElement.firstChild.firstChild.textContent;
        const gifImage = button.parentElement.parentElement.parentElement.parentElement.firstChild.getAttribute("src");
        const gifId = button.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute("id");
        const searchKey = query.toLowerCase();
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
                image:      gifImage,
                searchKey
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
                        type: "MSG",
                        message : `Gif "${res.payload.value}" has been added to your favorites !`
                    }
                    dispatch(action);
                } else {
                    if(res.payload.message.includes("Gif")) {
                        const action = {
                            type: "MSG",
                            message : res.payload.message
                        }
                        dispatch(action);
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
                                className={classes.favoritesIconR}
                                title={gif.title}
                                actionIcon={
                                    <ActionIconWrapper>
                                        <div className={classes.tooltip} hidden>Link added to clipboard!</div>
                                        <LinkIcon onClick={copyLink} className={classes.linkIcon} classes={classesLinkIcon} color="primary" />
                                        <Fab size="small" color="secondary" aria-label="add" className={classes.favoriteButton} onClick={addOnFavorites}>
                                            <Favorite />
                                        </Fab>
                                    </ActionIconWrapper>
                                }
                            />
                        </GridListTile>
                    ))}
            </GridList>
        </div>
    )
}