import React from 'react';
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
          <div className="headerLink">SIGN UP</div>
          <div className="headerLink">SIGN IN</div>
        </div>
      </div>
    );
  }
}

export default Header;
