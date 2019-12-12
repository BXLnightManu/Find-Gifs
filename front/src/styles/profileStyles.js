import { makeStyles } from '@material-ui/core';

export const useStylesForProfile = makeStyles((theme)=> ({
    gridRoot: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "84%",
        fontFamily: "Roboto, Helvetica, Arial, sans-serif"
    },
    paper: {
        margin: 0,
        height: "80%",
        width: "80%"
    },
    gridContainer: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "100%",
        fontFamily: "Roboto, Helvetica, Arial, sans-serif"
    },
    grid: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        width: "100%",
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        "@media (max-width:415px)": {
            height: "50%"
        },
    },
    title: {
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        textTransform: "uppercase",
        color: theme.palette.grey[600]
    },
    PIContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        height: "50%",
        width: "70%",
        marginBottom: "3%",
        "@media (max-width:1023px)": {
            "& > ul > li > div > span, & > ul > li > div > p, & > form > div > label": {
                fontSize: "1.3vw !important"
            },
            "& > form > div": {
                margin: "0"
            },
            "& > form > button": {
                marginTop: "2%",
                "& > span": {
                    fontSize: "1.3vw"
                }
            },
        }

    },
    createIconButton: {
        position: "absolute",
        bottom: "50%",
        left: "90%",
        height: "15%",
        width: "10%",
        "& > span": {
            height: "100%",
            width: "100%"
        },
        "& > span > svg": {
            height: "50%",
            width: "50%"
        }
    },
    unsubscribeButton: {
        position: "absolute",
        top: "75%",
        left: "75%",
        "& > span": {
            color: theme.palette.grey[600],
            fontSize: "1vw",

        }
    },
    img: {
        height: "50%",
        width: "50%",
        borderRadius: "5%",
        border: "solid 0.5vmin #3f51b5",
        "@media (max-width:415px)": {
            height: "50%"
        },
        "@media (min-width:416px) and (max-width:824px)": {
            height: "40%",
            width: "50%"
        },
        "@media (min-width:825px) and (max-width:1024px)": {
            height: "30%",
            width: "50%"
        }
    },
    uploadForm: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "2%",
        width: "50%"
    },
    uploadInput: {
        width: "0.1px",
        height: "0.1px",
        opacity: 0,
        overflow: "hidden",
        position: "absolute",
        zIndex: -1,
        "&:focus + label": {
            backgroundColor: "#3f51b5",
            outline: "-webkit-focus-ring-color auto 5px"
        },
    },
    uploadLabel: {
        marginRight: "2%",
        width: "80%",
        padding: "2%",
        fontSize: "1.3vw",
        fontWeight: 700,
        color: "white",
        backgroundColor: "#000000",
        display: "inline-block",
        "&:hover": {
            backgroundColor: "#3f51b5",
            cursor: "pointer"
        },
        "@media (width:568px)": {
            width: "50%"
        },
    },
    button: {
        "@media (width:568px)": {
            width: "10%",
            height: "100%"
        },
    }
}))