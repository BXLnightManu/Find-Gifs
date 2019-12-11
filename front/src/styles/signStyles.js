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

export const useStylesForSign = makeStyles(theme => ({
    logo: {
        position: "absolute",
        left: "42%",
        top: "-2%",
        height: "20%",
        width: "auto",
        borderRadius: "5%",
        "@media (max-width:420px)": {
            left: "32%",
            top: "10%"
        },
        "@media (width:768px)": {
            left: "36%",
            top: "0%",
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