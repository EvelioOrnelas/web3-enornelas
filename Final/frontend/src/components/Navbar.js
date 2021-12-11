import React, { Component } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import PropTypes from "prop-types";

class NavBar extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };
    render() {
        return (
        <>
        <Navbar bg="dark" variant="dark" sticky='top'>
            <Container>
                <Nav className="me-auto">
                    <Nav.Link href="/"><b style={{color: 'white', width: '150px'}} onClick={this.onLogoutClick}>Log out</b></Nav.Link>
                </Nav>
            </Container>
        </Navbar>
        </>
        );
    }
}

NavBar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(NavBar);