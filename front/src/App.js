import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Routes } from './routes/routes';
import { PopUp } from './containers';

// Material-UI: Calling javascript file containing the definition of styles to apply to App component.
import { useStylesForApp } from './styles/appStyles';

function App() {
  
  const dispatch = useDispatch();
  const classes = useStylesForApp();
  
  useEffect(()=> {
    const hours = 6;
    const now = new Date().getTime();
    const setupTime = localStorage.getItem('setupTime');
    if (now-setupTime > hours*60*60*1000) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("setupTime");
    } else {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      if(token && user) {
        const actionToken = {
          type: "AUTH",
          token
        }
        const actionUser = {
          type: "USER",
          user
        }
        dispatch(actionToken);
        dispatch(actionUser);
      }
    }
  }, [dispatch])

  return (
    <div className={classes.root}>
      <Router>
        <Switch>
          <Routes />
        </Switch>
      </Router>
      <PopUp />
    </div>
  );
}

export default App;