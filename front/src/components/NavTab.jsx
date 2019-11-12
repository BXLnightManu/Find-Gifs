import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, AppBar, Tabs, Tab, Typography, Box } from '@material-ui/core';
import { Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { GifSearch, Historical, Favorites } from './index';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function LinkTab(props) {
  return (
    <Tab
      component={Link}
      {...props}
    />
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export function NavTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Router>
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs
            variant="fullWidth"
            value={value}
            onChange={handleChange}
            aria-label="nav tabs example"
          >
          <LinkTab label="Search for new gifs" to="/gifsearch" />
          <LinkTab label="Historical" to="/historical" />
          <LinkTab label="Favorites" to="/favorites" />
          </Tabs>
        </AppBar>
      </div>
      <Switch>
        <Route exact path="/gifsearch" component={GifSearch} />
        <Route exact path="/historical" component={Historical} />
        <Route exact path="/favorites" component={Favorites} />
      </Switch>
    </Router>
  );
}