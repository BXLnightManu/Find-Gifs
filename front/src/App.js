import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { SignIn, SignUp, PopUp, Favorites } from './containers';
import { NavTabs } from './components';
import { requireAuth, requireNoAuth } from './hoc';
import { useStyles } from './styles/appStyles';

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Router>
        <Switch>
          <Route exact path="/" component={requireNoAuth(SignIn)} />
          <Route exact path="/signin" component={requireNoAuth(SignIn)} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/gifsearch" component={requireAuth(NavTabs)} />
          <Route exact path="/favorites" component={requireAuth(Favorites)} />
        </Switch>
    </Router>
    <PopUp />
    </div>
  );
}

export default App;