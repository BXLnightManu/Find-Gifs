import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';

export const useStylesForApp = makeStyles({
    root: {
        width: "100%",
        height: "100%"
    }
})

export const BodyWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-flow: column nowrap;
    height: 84%;
    @media (max-width:812px) {
        height: 150%
    }
    `