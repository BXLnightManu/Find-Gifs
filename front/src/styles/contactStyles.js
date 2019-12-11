import { makeStyles } from '@material-ui/core';

export const useStylesForContact = makeStyles(theme => ({
    root: {
        justifyContent: "center",
        "@media (width:823px)": {
            padding: "10%",    
        }
    },
    form: {
        "@media (max-width:560px)": {
            display: "flex",
            justifyContent: "center",
            flexDirection: "column"      
        }
    },
    title: {
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        textTransform: "uppercase",
        color: theme.palette.grey[600]
    },
    input: {
        "& > label": {
            fontSize: "1.3vw"
        },
        "& > div": {
            margin: "0,0,1%,0",
            "& > textarea": {
                fontSize: "1.3vw"
            },
            "& > input": {
                fontSize: "1.3vw"
            },
        },
        "& > p": {
            fontSize: "1.3vw"
        }
    },
    forward: {
        fontSize: "1.3vw",
        color: "#757575",
        margin: 0
    }
}))