import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';

export const ButtonWrapper = styled.div`
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    `
export const CheckWrapper = styled.div`
    display: flex;
    align-items: center;
    `
const logoSizeXXL = window.screen.width*1/15;
const logoSizeXL = window.screen.width*1/8;
const logoSizeML = window.screen.width*1/15;
const logoSizeM = window.screen.width*1/5;
const logoSizeXS = window.screen.width*1/15;
const logoSizeXXS = window.screen.width*1/3;
export const useStylesForSign = makeStyles(theme => ({
    logo: {
        position: "absolute",
        left:"42%",
        top: "-2%",
        width: `${logoSizeXXL}px`,
        height: "auto",
        borderRadius: "5%",
        "@media (max-width:414px)": {
            width: `${logoSizeXXS}px`,
            height: "auto",
            left: "32%",
            top: "10%"
        },
        "@media (min-width:415px) and (max-width:767px)": {
            width: `${logoSizeXS}px`,
            height: "auto",
            left: "45%",
            top: "-1%"
        },
        "@media (width:768px)": {
            width: `${logoSizeM}px`,
            height: "auto",
            left: "40%",
            top: "10%",
        },
        "@media (width:812px)": {
            width: `${logoSizeML}px`,
            height: "auto",
            left: "45%",
            top: "-3%",
        },
        "@media (min-width:1024px) and (max-width:1366px)": {
            width: `${logoSizeXL}px`,
            height: "auto",
            left: "45%",
            top: "-1%",
        },
    },
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
        borderRadius: "2%",
        width: "50%"
    },
    form: {
        "@media (max-width:1366px)": {
            "& > div": {
                margin: "0.1%"
            }
        },
        "& > div > label": {
            fontSize: "1.3vw"
        },
        "& > div > div": {
            margin: "0,0,1%,0",
            "& > input": {
                fontSize: "1.3vw"
            }
        }
    },
    input: {
        "& > p": {
            color:theme.palette.secondary.main
        }

    },
    signUpButton: {
        float: "right"
    },
    linkButton: {
        textDecoration: "none",
        color: "inherit"
    },
    remember: {
        color: theme.palette.grey[600],
        fontSize: "1vw",
    }
}))