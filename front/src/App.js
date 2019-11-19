import React, { useEffect } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SignIn, SignUp, PopUp, Favorites } from "./containers";
import { NavTabs } from "./components";

// HOC function that check if user is authenticated before giving access to requested component.
import { requireAuth, requireNoAuth } from "./hoc";

// Material-UI: Calling javascript file containing the definition of styles to apply to App component.
import { useStyles } from "./styles/appStyles";

function App() {
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const action = {
                type: "AUTH",
                token
            };
            dispatch(action);
        }
    }, []);

    return (
        <div className={classes.root}>
            <Router>
                <Switch>
                    <Route exact path="/" component={requireNoAuth(SignIn)} />
                    <Route
                        exact
                        path="/signin"
                        component={requireNoAuth(SignIn)}
                    />
                    <Route exact path="/signup" component={SignUp} />
                    <Route
                        exact
                        path="/gifsearch"
                        component={requireAuth(NavTabs)}
                    />
                    <Route
                        exact
                        path="/favorites"
                        component={requireAuth(Favorites)}
                    />
                </Switch>
            </Router>
            <PopUp />
        </div>
    );
}

export default App;
