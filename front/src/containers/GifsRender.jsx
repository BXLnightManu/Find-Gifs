import React from 'react';
import { GridList, GridListTile, GridListTileBar,ListSubheader, IconButton } from '@material-ui/core';
import { useStylesForRender } from './styles';
import InfoIcon from '@material-ui/icons/Info';

export const GifsRender = ({gifsToRender}) => {
    const classes = useStylesForRender();

    return (
        <div className={classes.root}>
            <GridList cellHeight="auto" className={classes.gridList} cols={3}>
                <GridListTile key="Subheader" cols={3} style={{ height: 'auto' }} className={classes.gridListSubheader}>
                    <ListSubheader component="div" className={classes.listSybheader}>{()=> {if(Array.isArray(gifsToRender)){return "Gifs list"}}}</ListSubheader>
                </GridListTile>
                    {gifsToRender.map(gif => (
                        <GridListTile key={gif.giffyID}>
                            <img src={gif.image} alt={gif.title} className={classes.image} />
                            <GridListTileBar
                                title={gif.title}
                                actionIcon={
                                    <IconButton aria-label={`info about ${gif.title}`} className={classes.icon}>
                                        <InfoIcon />
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    ))}
            </GridList>
        </div>
    )
}