import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';

export const SearchWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-flow: column nowrap;
    height: 84%;
    `
export const useStylesForSearch = makeStyles(theme => ({
    container: {
      display: 'flex'
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
      "@media (max-width:800px)": {
        margin: 0
      },
    },
    button: {
        margin: theme.spacing(1),
        "@media (max-width:800px)": {
          margin: "0.5%",
        },
    },
    iconContainer: {
      "& > .fa": {
        margin: theme.spacing(2),
      },
      display: "flex",
      alignItems: "center",
      "@media (max-width:800px)": {
        margin: 0,
        "& > .fa": {
          margin: "10%"
        }
      },
      "& > p": {
        "@media (max-width:800px)": {
          display: "none"
        }
      }
    },
    iconHover: {
      margin: theme.spacing(1),
      '&:hover': {
          color: "rgb(25, 32, 71)",
          cursor: "pointer"
          },
      "@media (max-width:800px)": {
        margin: 0,
      },
    },
    more: {
      marginLeft: "-10%",
      color: "#757575"
    }
  }));