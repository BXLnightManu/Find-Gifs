import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';
import { green } from '@material-ui/core/colors';

const gridWidth = 60;
const gridHeight = 100;

export const useStylesForRender = makeStyles(theme => ({
    container: {
        margin: "2%",
        width: `${gridWidth}%`,
        height: `${gridHeight}%`,
        display: "flex",
        overflow: "auto",
        flexWrap: "wrap",
        justifyContent: "space-around",
        backgroundColor: theme.palette.background.paper,
        "@media (max-width:1024px)": {
            height: "auto",
        },
    },
    gridList: {
        width: "100%",
        height: "100%"
    },
    gridListSubheader: {
        display: "flex",
        justifyContent: "center",
    },
    listSybheader: {
        fontSize: "1.5vw",
        fontWeight: "bold",
    },
    image: {
        width: "100%",
        height: "100%"
    },
    favoriteButton: {
        margin: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    favoritesIconR: {
        "@media (max-width:1024px)": {
            height: "20%",
            "& > div > div > button": {
                backgroundColor: "rgba(0,0,0,0)",
                marginLeft: "10%",
                "&:hover": {
                    backgroundColor: "rgba(0,0,0,0)",
                },
                "& > span > svg": {
                    width: "100%",
                    height: "auto",
                }
            },
            "& > div > div > svg": {
                backgroundColor: "rgba(0,0,0,0)",
                width: "40%",
                height: "auto",

            },
            "& > div > div": {
                fontSize: "1vw"
            },
            "& > div": {
                fontSize: "1vw",
                margin: 0,
                paddingLeft: "2px",
                width:"60%"
            }
        }
    },
    favoritesIconF: {
        "@media (max-width:1024px)": {
            height: "20%",
            "& > div > div > button": {
                backgroundColor: "rgba(0,0,0,0)",
                margin: 0,
                padding: 0,
                width: "40px",
                "& > span > svg": {
                    width: "40%",
                    height: "auto",
                }
            },
            "& > div > div > svg": {
                backgroundColor: "rgba(0,0,0,0)",
                width: "40%",
                height: "auto",

            },
            "& > div > div": {
                fontSize: "1vw",
                width: "70%"
            },
            "& > div": {
                fontSize: "1vw",
                margin: 0,
                paddingLeft: "2px",
                width:"60%"
            }
        }
    },
    tooltip: {
        position: "absolute",
        top: "-40%",
        left: "35%",
        color: theme.palette.common.white,
        backgroundColor: green[500],
        borderRadius: "5%",
        fontSize: "1vw",
        width: "60%",
    },
    linkIcon: {
        backgroundColor: "#3f51b5",
        borderRadius: "30%",
        "&:hover": {
            cursor: "pointer"
        }
    }
}))

export const useStylesLinkIcon = makeStyles(theme => ({
    colorPrimary: {
        color: theme.palette.common.white,
    }
}));

export const ActionIconWrapper = styled.div`
    display: flex;
    align-items: center;
`