import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { requireAuth } from '../hoc';
import { Header, Favorites, Profile, Contact } from './index';
import {  GifSearch, Footer } from '../components';

export const Shell = ({history}) => {
  const [userInfo, setUserInfo] = useState("");
  const user = useSelector(state => state.user.user);

  useEffect(() => {
    if(user) {
      setUserInfo(user);
    }
  },[user])

  return (
    <Router>
      <Header history={history} userInfo={userInfo} />
      <Switch>
        <Route exact path="/gifsearch" component={requireAuth(GifSearch)} />
        <Route exact path="/favorites" component={requireAuth(Favorites)} />
        <Route exact path="/profile" component={requireAuth(Profile)} />
        <Route exact path="/contact" component={requireAuth(Contact)} />
      </Switch>
      <Footer />
    </Router>
  );
}