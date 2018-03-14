import React from 'react';
import { Link } from 'react-router-dom';
import './HeaderLinks.css';

class HeaderLinks extends React.Component {
  render() {
    console.log('in HeaderLinks render, this.props.changeColor', this.props.changeColor);
    return (
      <div className="headerLinksContainer turnBlack">
        <Link to="/signUp" className="headerLink">SIGN UP</Link>
        <Link to="/signIn" className="headerLink">SIGN IN</Link>
      </div>
    );
  }
}

export default HeaderLinks;

