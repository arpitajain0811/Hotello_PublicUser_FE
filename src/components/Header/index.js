import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../logo.svg';
import UserProfileIcon from '../UserProfileIcon';

class Header extends React.Component {
  constructor(props) {
    super(props);
    console.log('in Header constructor, props', this.props);
    this.state = {
      displaySignOptions: null,
      displayUserIcon: null,
    };
  }

  componentWillMount() {
    console.log('in header componentWillMount, this.props.loginState', this.props.loginState);
    if (this.props.loginState.isLoggedIn) {
      this.setState({
        displaySignOptions: false,
        displayUserIcon: true,
      });
    } else if (this.props.loginState.noDisplay) {
      this.setState({
        displaySignOptions: false,
        displayUserIcon: false,
      });
    } else if (this.props.loginState.isLoggedIn === false) {
      this.setState({
        displaySignOptions: true,
        displayUserIcon: false,
      });
    }
  }

  componentWillReceiveProps(newProps) {
    console.log('in header componentWillReceiveProps, newProps', newProps);
    if (newProps.loginState.isLoggedIn === false) {
      this.setState({
        displaySignOptions: true,
        displayUserIcon: false,
      });
    }
  }

  render() {
    console.log('in header render, this.state', this.state);
    let userProfBlock;
    if (this.state.displayUserIcon) {
      userProfBlock = (
        <div
          className={'userNameDisplay'.concat(this.state.displayUserIcon ? '' : ' hide')}
        >
          <h3>Hi {this.props.loginState.firstName}</h3>
          <UserProfileIcon logoutHandler={this.props.logoutHandler} />
        </div>
      );
    } else {
      userProfBlock = null;
    }

    console.log(userProfBlock);
    return (
      <div className="header">
        <div className="logo">
          <img src={logo} alt="logo" className="logo" />
        </div>
        <div
          className={'headerLinksContainer'.concat(this.state.displaySignOptions ? '' : ' hide')}
        >
          <Link to="/signUp" className="headerLink">SIGN UP</Link>
          <Link to="/signIn" className="headerLink">SIGN IN</Link>
        </div>
        {userProfBlock}
      </div>
    );
  }
}

export default Header;
