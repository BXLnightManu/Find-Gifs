import { makeStyles } from '@material-ui/core';

export const useStylesForProfilePopUp = makeStyles(() => ({
    root: {
        display: "flex",
        flexDirection: "column",
        width: `${window.screen.width/6}px`,
        "@media (max-width:670px)": {
            width: `${window.screen.width/3}px`
        }
    },
    gridContainer: {
        alignItems: "center"
    },
    grid : {
        display: "flex",
        justifyContent: "center",
        width: `${window.screen.width/16}px`,
        height: `${window.screen.width/16}px`
    },
    avatar: {
        width: `${window.screen.width/16}px`,
        height: `${window.screen.width/16}px`
    },
    text: {
        "& > span": {
            fontSize: "1vw"
        },
        "& > p": {
            fontSize: "1vw"
        }
    }
}))