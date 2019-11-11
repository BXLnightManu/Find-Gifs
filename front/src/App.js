import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { SignIn, SignUp } from './containers';
import { NavTabs } from './components';
import { useStyles } from './styles/appStyles';

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Router>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/gifsearch" component={NavTabs} />
        </Switch>
    </Router>
    </div>
  );
}

export default App;