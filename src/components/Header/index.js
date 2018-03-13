import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../logo.svg';
import UserProfileIcon from '../UserProfileIcon';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signOptionsDisplay: {
        display: 'none',
      },
      userNameDisplay: {
        toDisplayUserName: {
          display: 'none',
        },
        firstName: 'null',
      },
    };
  }

  componentWillMount() {
    console.log('inside header will mount', this.props.loginState);
    if (this.props.loginState.isLoggedIn) {
      this.setState({
        signOptionsDisplay: {
          display: 'none',
        },
        userNameDisplay: {
          toDisplayUserName: {
            display: 'flex',
          },
          firstName: this.props.loginState.firstName,
        },
      });
    } else if (this.props.loginState.noDisplay === true) {
      this.setState({
        signOptionsDisplay: {
          display: 'none',
        },
        userNameDisplay: {
          toDisplayUserName: {
            display: 'none',
          },
          firstName: 'null',
        },
      });
    } else if (this.props.loginState.isLoggedIn === false) {
      this.setState({
        signOptionsDisplay: {
          display: 'flex',
        },
        userNameDisplay: {
          toDisplayUserName: {
            display: 'none',
          },
          firstName: 'null',
        },
      });
    }
  }

  componentWillReceiveProps(newProps) {
    console.log('in header componentWillReceiveProps', newProps);
    if (newProps.loginState.isLoggedIn === false) {
      this.setState({
        signOptionsDisplay: {
          display: 'flex',
        },
        userNameDisplay: {
          toDisplayUserName: {
            display: 'none',
          },
          firstName: 'null',
        },
      });
    }
  }

  render() {
    console.log('in header render', this.state);
    let userProfBlock;
    if (!this.state.userNameDisplay.firstName) {
      userProfBlock = null;
    } else {
      userProfBlock = (
        <div
          className="userNameDisplay"
          style={this.state.userNameDisplay.toDisplayUserName}
        >
          <h3>Hi {this.state.userNameDisplay.firstName}</h3>
          <UserProfileIcon logoutHandler={this.props.logoutHandler} />
        </div>
      );
    }

    console.log(userProfBlock);
    return (
      <div className="header">
        <div className="logo">
          <img src={logo} alt="logo" className="logo" />
        </div>
        <div
          className="headerLinksContainer"
          style={this.state.signOptionsDisplay}
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
