import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';

export const SearchWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-flow: column nowrap;
    `
export const useStylesForSearch = makeStyles(theme => ({
    container: {
      display: 'flex'
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    button: {
        margin: theme.spacing(1),
    },
    iconContainer: {
        '& > .fa': {
          margin: theme.spacing(2),
        },
        display: "flex",
        alignItems: "center",
    },
    iconHover: {
    margin: theme.spacing(2),
    '&:hover': {
        color: "rgb(25, 32, 71)",
        cursor: "pointer"
        }
    }
  }));