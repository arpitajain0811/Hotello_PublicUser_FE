import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../logo.svg';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="header">
        <div className="logo">
          <img src={logo} alt="logo" className="logo" />
        </div>
        <div className="headerLinksContainer">
          <Link to="signUp" className="headerLink">SIGN UP</Link>
          <Link to="signIn" className="headerLink">SIGN IN</Link>
        </div>
      </div>
    );
  }
}

export default Header;
