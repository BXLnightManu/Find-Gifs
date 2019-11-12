import { makeStyles } from '@material-ui/core';

const gridWidth = 60;
const gridHeight = 100;

export const useStylesForRender = makeStyles(theme => ({
    root: {
        width: `${gridWidth}%`,
        height: `${gridHeight}%`,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflow: "hidden",
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: "100%",
        height: "100%",
    },
    gridListSubheader: {
        display: "flex",
        justifyContent: "center"
    },
    listSybheader: {
        fontSize: "1.5vw",
        fontWeight: "bold"
    },
    image: {
        width: "100%",
        height: "100%"
    },
    icon: {
        color: "rgba(255, 255, 255, 0.54)"
    }
}))