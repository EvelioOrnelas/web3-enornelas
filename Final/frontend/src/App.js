import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Container, Nav} from 'react-bootstrap'
import Homescreen from './screens/Homescreen';
import Login from './auth/Login'
import NavBar from "./components/Navbar";

import { Provider } from "react-redux";
import store from "./store";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import PrivateRoute from "./private-route/PrivateRoute";
import Logout from "./components/Logout";

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
        <div className="App">
          <Router>
            <Container>
            <Switch>
              <Route exact path='/' component={Login} />
              <div>
              {/* <Logout/> */}
              <NavBar/>
                  <PrivateRoute exact path="/homescreen" component={Homescreen} />
              </div>
              </Switch>
            </Container>
          {/* <Footer/> */}
        </Router>
      </div>
     </Provider>
    );
  }

export default App;
