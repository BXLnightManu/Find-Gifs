import { makeStyles } from '@material-ui/core';

export const useStylesForSign = makeStyles({
    root: {
        width: "100%",
        height: "100%",
        backgroundColor: "rgb(63, 81, 181)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"

    },
    container: {
        backgroundColor: "rgb(255, 255, 255)",
        padding: "1%",
        borderRadius: "2%"
    },
    signUpButton: {
        float: "right"
    },
    linkButton: {
        textDecoration: "none",
        color: "inherit"
    }
})