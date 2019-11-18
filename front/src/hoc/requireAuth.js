import React from 'react';
import { useSelector } from  'react-redux';

/*
Dummy function that checks if a token (delivered when user authenticates himself) is present,
before rendering the component (passed as argument).
*/
export const requireAuth = ComposedComponent => props => {
    const authenticated = useSelector(state => state.auth.token);
    
    // If there is no token, the user is redirected to /sigin.    
    if(!authenticated) props.history.push("/signin");
    
    return <ComposedComponent {...props} />
} 