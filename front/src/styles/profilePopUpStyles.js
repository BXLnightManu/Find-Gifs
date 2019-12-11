import { makeStyles } from '@material-ui/core';

export const useStylesForProfilePopUp = makeStyles(() => ({
    root: {
        display: "flex",
        flexDirection: "column",
    },
    gridContainer: {
        alignItems: "center",
    },
    grid : {
        display: "flex",
        justifyContent: "center",
        height: "100%",
        width: "100%"
    },
    avatar: {
        height: "100%",
        width: "100%"
    }
}))