import React from 'react';
import { useSelector } from  'react-redux';

/*
Dummy function that redirect from "/signin" to gifsearch if the user is already authenticated (and so that a token is available in the store)
before rendering the component (passed as argument).
*/
export const requireNoAuth = ComposedComponent => props => {
    const authenticated = useSelector(state => state.auth.token);
        
    if(authenticated) props.history.push("/gifsearch");
    
    return <ComposedComponent {...props} />
}