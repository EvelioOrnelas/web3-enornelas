import React, { Component } from "react";
import axios from 'axios';
import '../Login.css'
 
export default class Create extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);
 
    this.onChangePersonUserName = this.onChangePersonUserName.bind(this);
    this.onChangePersonPassword = this.onChangePersonPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
 
    this.state = {
      username: "",
      password: "",
    };
  }
  // These methods will update the state properties.
  onChangePersonUserName(e) {
    this.setState({
      username: e.target.value,
    });
  }
 
  onChangePersonPassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
 
// This function will handle the submission.
  onSubmit(e) {
    e.preventDefault();
 
    // When post request is sent to the create url, axios will add a new record(users) to the database.
    const users = {
      username: this.state.username,
      password: this.state.password,
    };
 
    axios
      .post("http://localhost:5000/record/add", users)
      .then((res) => console.log(res.data));

 
    // We will empty the state after posting the data to the database
    this.setState({
      username: "",
      password: "",
    });
  }
 
  // This following section will display the form that takes the input from the user.
  render() {
    return (
      <div className='form' style={{ marginTop: 20 }}>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>User Name </label>
            <input
              type="text"
              className="form-control"
              value={this.state.username}
              onChange={this.onChangePersonUserName}
            />
          </div>
          <div className="form-group">
            <label>Password </label>
            <input
              type="password"
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePersonPassword}
            />
          </div>
          <div className="form-group">
            <button type="submit" onClick={event =>  window.location.href='/dashboard'}>Register</button>
          </div>
        </form>
      </div>
    );
  }
}