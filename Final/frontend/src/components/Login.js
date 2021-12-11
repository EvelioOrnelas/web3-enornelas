import React, { Component } from "react";
import '../Login.css'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import classnames from "classnames";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      errors: {}
    };
  }
  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/homescreen");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/homescreen"); // push user to dashboard when they login
    }
if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
onSubmit = e => {
    e.preventDefault();
const userData = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.loginUser(userData);
console.log(userData);
  };
render() {
    const { errors } = this.state;
return (
      <div className="form">
        <form noValidate onSubmit={this.onSubmit}>
            <div className="UserName">
            <input
                placeholder="User Name"
                onChange={this.onChange}
                value={this.state.username}
                error={errors.username}
                id="username"
                type="username"
                className={classnames("", {
                    invalid: errors.username || errors.usernamenotfound
                  })}
            /> <br/>
            <span className="red-text">
                  {errors.username}
                  {errors.usernamenotfound}
            </span>
            </div>

            <div className="Password">
                <input 
                placeholder="password"
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                id="password"
                type="password"
                className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect
                  })}
            /> <br/>
            <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
            </span>
            </div>
            <div className="container">
            <button type="submit"> Login</button>
            </div>
        </form>
      </div>
    );
  }
}
Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  export default connect(
    mapStateToProps,
    { loginUser }
  )(Login);