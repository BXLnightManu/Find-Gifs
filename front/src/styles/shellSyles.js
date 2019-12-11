import { makeStyles } from '@material-ui/core';
import { deepOrange, red } from '@material-ui/core/colors';

export const useStylesForHeader = makeStyles(theme => ({
    logo: {
        position: "absolute",
        left: "50%",
        top: "-1%",
        height: "10%",
        width: "auto",
        borderRadius: "5%",
        zIndex: 1,
        "@media (max-width:415px)": {
            left: "43%",
            top: "1%",
            height: "6%"
        },
        "@media (min-width:415px) and (max-width:580px)": {
            left: "46%",
            top: "0%",
            height: "8%"
        },
        "@media (min-width:560px) and (max-width:767px)": {
            left: "45%",
            top: "-2%",
            height: "20%"
        },
        "@media (min-width:768px) and (max-width:769px)": {
            left: "45%",
            top: "-1%",
            height: "10%"
        },
        "@media (min-width:770px) and (max-width:823px)": {
            left: "45%",
            top: "-2%",
            height: "20%"
        },
        "@media (min-width:824px) and (max-width:1024px)": {
            left: "45%",
            top: "-1%",
            height: "10%"
        }
    },
    navTabRoot: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        height: "8%",
        width: "100%",
        "@media (max-width:320px)": {
            height: "10%",
        },
        "@media (min-width:560px) and (max-width:740px)": {
            height: "15%",
        },
        "@media (min-width:800px) and (max-width:1023px)": {
            height: "15%",
        },
    },
    appBar: {
        display: "flex",
        flexDirection: "row",
        height: "100%"
    },
    tab: {
        width: "90%",
        height: "100%",
        "& > *": {
            fontSize: "3rem"
        }
    },
    avatarRoot: {
        display: "flex",
        justifyContent: "center",
        "& > *": {
          margin: theme.spacing(1),
        },
        width: "10%",
        paddingRight: "1.5%",
        "@media (max-width:800px)": {
            margin: 0,
            padding: "1%"
        }
    },
    orange: {
        color: '#fff',
        backgroundColor: deepOrange[500],
    },
    linkToProfile: {
        textDecoration: "none",
        color: "inherit"
    },
    button: {
        textDecoration: "none",
        border: "none",
        borderRadius: "50%",
        background: "transparent",
        margin: 0,
        paddingTop: 0,
        paddingBottom: 0,
        paddingRight: "5%",
        paddingLeft: "5%",
        "@media (max-width:800px)": {
            position: "absolute",
            right: "1%",
            top: "15%"
        }
    },
    nameRoot: {
        display: "flex",
        justifyContent: "center",
        marginLeft: "5%",
        "@media (max-width:1024px)": {
            display: "none"
        }
    },
    name: {
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        textTransform: "uppercase",
        color: "#FFFFFF",
        opacity: 0.7,
        fontSize: "1vw",
        "&:hover": {
            opacity: 1,
        }
    },
    logOut: {
        display: "flex",
        justifyContent: "center",
        "& > p": {
            margin: 0
        },
        "&:hover": {
            color: "white",
            backgroundColor: red[500]
        },
        borderRadius: "2%",
        color: "#757575"
    }
}));

export const useStylesForFooter = makeStyles(theme => ({
    root: {
        position: "relative",
        display:"flex",
        justifyContent:"center",
        alignItems: "center",
        height: "8%",
        width: "100%",
        backgroundColor: "#3f51b5",
        "@media (max-width:812px)": {
            height: "10%"
        }
    },
    contactIcon: {
        marginTop: "0.5%",
        color: theme.palette.common.white
    },
    label: {
        margin: "5%",
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        textTransform: "uppercase",
        color: "#FFFFFF",
        opacity: 0.7,
        fontSize: "1vw",
        "&:hover": {
            opacity: 1,
        },
        "@media (max-width:1023px)": {
            display: "none"
        },
    },
    signature: {
        margin: 0,
        position: "absolute",
        left: "80%",
        fontSize: "1vw",
        color: "#FFFFFF",
        opacity: 0.7,
    },
    linkToContact: {
        textDecoration: "none",
        color: "inherit",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    }
}))