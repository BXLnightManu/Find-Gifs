import React from 'react';
import { GridList, GridListTile, GridListTileBar,ListSubheader, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useStylesForRender } from './styles';

export const GifsRender = ({gifsToRender}) => {
    const classes = useStylesForRender();

    return (
        <div className={classes.container}>
            <GridList cellHeight="auto" className={classes.gridList} cols={3}>
                <GridListTile key="Subheader" cols={3} style={{ height: 'auto' }} className={classes.gridListSubheader}>
                    <ListSubheader component="div" className={classes.listSybheader}>Gifs list</ListSubheader>
                </GridListTile>
                    {gifsToRender.map(gif => (
                        <GridListTile key={gif.giffyID}>
                            <img src={gif.image} alt={gif.title} className={classes.image} />
                            <GridListTileBar
                                title={gif.title}
                                actionIcon={
                                    <Fab size="small" color="secondary" aria-label="add" className={classes.margin}>
                                        <AddIcon />
                                    </Fab>
                                }
                            />
                        </GridListTile>
                    ))}
            </GridList>
        </div>
    )
}