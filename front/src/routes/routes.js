import React from 'react';
import { Route } from 'react-router-dom';
import { SignIn, SignUp, Shell } from '../containers';

// HOC function that check if user is authenticated before giving access to requested component.
import { requireAuth, requireNoAuth } from '../hoc';

export const Routes = () => {
    return (
        <>
            <Route exact path="/" component={requireNoAuth(SignIn)} />
            <Route exact path="/signin" component={requireNoAuth(SignIn)} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/profile" component={requireAuth(Shell)} />
            <Route exact path="/gifsearch" component={requireAuth(Shell)} />
            <Route exact path="/contact" component={requireAuth(Shell)} />
            <Route exact path="/favorites" component={requireAuth(Shell)} />
        </>
    )
}