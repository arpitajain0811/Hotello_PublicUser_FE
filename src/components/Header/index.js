import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../logo.svg';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toDisplay: {
        display: 'none',
      },
      userNameDisplay: {
        toDisplayUserName: {
          display: 'none',
        },
        firstName: '',
      },
    };
  }

  componentWillMount() {
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
          firstName: '',
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
          firstName: '',
        },
      });
    }
  }

  render() {
    console.log('in header', this.state);
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
        <div
          className="userNameDisplay"
          style={this.state.userNameDisplay.toDisplayUserName}
        >
          <h3>Hi {this.state.userNameDisplay.firstName}</h3>
        </div>
      </div>
    );
  }
}

export default Header;
