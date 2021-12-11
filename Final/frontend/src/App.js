import React, { Component } from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Container} from 'react-bootstrap'
// We import all the components we need in our app
import Navbar from "./components/navbar";
import Edit from "./components/edit";
import Create from "./components/create";
import RecordList from "./components/recordList";
import Login from './components/Login'

import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthtoken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import PrivateRoute from "./private-route/PrivateRoute";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <main className='App'>
          <Container>
          <Switch>
            <Route exact path='/' component={Login} />
              <div>
              <Navbar />
              <Route exact path="/dashboard"><RecordList/></Route>
              <Route exact path="/edit/:id" component={Edit}/>
              <Route exact path="/create"><Create/></Route>
              </div>
          </Switch>
          </Container>
        </main>
      </Router>
    </Provider>
  );
};

export default App;