import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../logo.svg';

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="logo">
          <img src={logo} alt="logo" className="logo" />
        </div>
        <div
          className="headerLinksContainer"
          style={this.props.loginState.isLoggedIn ? { display: 'none' } : { display: 'flex' }}
        >
          <Link to="/signUp" className="headerLink">SIGN UP</Link>
          <Link to="/signIn" className="headerLink">SIGN IN</Link>
        </div>
        <div
          className="userNameDisplay"
          style={this.props.loginState.isLoggedIn ? {} : { display: 'none' }}
        >
          <h3>Hi {this.props.loginState.firstName}</h3>
        </div>
      </div>
    );
  }
}

export default Header;
