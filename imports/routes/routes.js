import { Meteor } from "meteor/meteor";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";

import Signup from "../ui/Signup";
import Link from "../ui/Link";
import NotFound from "../ui/NotFound";
import Login from "../ui/Login";

const history = createHistory();
const location = history.location.pathname;
const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];
const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    history.replace('/links');
  }
}

const onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    history.replace('/links');
  }
};

export const onAuthChange = (isAuthenticated) => {
  const isUnauthenticatedPage = unauthenticatedPages.includes(location);
  const isAuthenticatedPage = authenticatedPages.includes(location);
  
  if (isUnauthenticatedPage && isAuthenticated) {
    history.replace('/links');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    history.replace('/');
  }
};

export const routes = (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
        <Route path="/links" component={Link} onEnter={onEnterPublicPage}/>
        <Route path="/" component={Login} exact={true} onEnter={onEnterPrivatePage}/>
        <Route component={NotFound} />
      </Switch>
    </div>
  </BrowserRouter>
);

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();

  const isUnauthenticatedPage = unauthenticatedPages.includes(location);
  const isAuthenticatedPage = authenticatedPages.includes(location);
  
  if (isUnauthenticatedPage && isAuthenticated) {
    history.replace('/links');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    history.replace('/');
  }
});
  