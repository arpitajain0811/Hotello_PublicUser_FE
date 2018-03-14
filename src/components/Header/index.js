import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../logo.svg';
import HeaderLinks from '../HeaderLinks';
import UserGreetingAndIcon from '../UserGreetingAndIcon';

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
    let userGreetingAndIcon = null;
    let signOptionsBlock = null;
    if (this.state.displayUserIcon) {
      userGreetingAndIcon = (
        <UserGreetingAndIcon loginState={this.props.loginState} logoutHandler={this.props.logoutHandler} />
      );
    }
    if (this.state.displaySignOptions) {
      signOptionsBlock = (
        <HeaderLinks />
      );
    }
    console.log(signOptionsBlock);
    console.log(userGreetingAndIcon);
    return (
      <div className="header">
        <div className="logo">
          <img src={logo} alt="logo" className="logo" />
        </div>
        {signOptionsBlock}
        {userGreetingAndIcon}
      </div>
    );
  }
}

export default Header;
