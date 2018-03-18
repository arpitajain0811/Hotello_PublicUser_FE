import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Header.css';
import logo from '../../logo.svg';
import HeaderLinks from '../HeaderLinks';
import UserGreetingAndIcon from '../UserGreetingAndIcon';

class Header extends React.Component {
  constructor(props) {
    super(props);
    // console.log('in Header constructor, props', this.props);
    this.state = {
      displaySignOptions: null,
      displayUserIcon: null,
    };
  }

  componentWillMount() {
    // console.log('in header componentWillMount, this.props.loginState', this.props.loginState);
    if (this.props.isLoggedIn) {
      this.setState({
        displaySignOptions: false,
        displayUserIcon: true,
      });
    }
    //  else if (this.props.loginState.noDisplay) {
    //   this.setState({
    //     displaySignOptions: false,
    //     displayUserIcon: false,
    //   });
    // }
  //   else if (this.props.isLoggedIn === false) {
  //     this.setState({
  //       displaySignOptions: true,
  //       displayUserIcon: false,
  //     });
  //   }
  // }

  // componentWillReceiveProps(newProps) {
  //   console.log('in header componentWillReceiveProps, newProps', newProps);
  //   if (newProps.loginState.isLoggedIn === false) {
  //     this.setState({
  //       displaySignOptions: true,
  //       displayUserIcon: false,
  //     });
  //   }
  }

  render() {
    if (this.props.isLoggedIn === true && this.state.displayUserIcon !== true) {
      this.setState({
        displaySignOptions: false,
        displayUserIcon: true,
      });
    }
    if (this.props.isLoggedIn === false && this.state.displaySignOptions === false) {
      this.setState({
        displaySignOptions: true,
        displayUserIcon: false,
      });
    }
    console.log('in header render, this.state', this.state);
    let userGreetingAndIcon = null;
    let signOptionsBlock = null;
    if (this.props.isLoggedIn === true) {
      userGreetingAndIcon = (
        <UserGreetingAndIcon
          // loginState={this.props.isLoggedIn}
          firstName={this.props.firstName}
          logoutHandler={this.props.logoutHandler}
          textColor={this.props.textColor}
          profileButtonClass={this.props.profileButtonClass}
        />
      );
    }
    if (this.props.isLoggedIn === false) {
      signOptionsBlock = (
        <HeaderLinks />
      );
    }
    // console.log(signOptionsBlock);
    // console.log(userGreetingAndIcon);
    return (
      <div className="MyHeader">
        <div className="logo">
          <img src={logo} alt="logo" className="logo" />
        </div>
        {signOptionsBlock}

        {userGreetingAndIcon}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  firstName: state.userReducer.firstName,
  isLoggedIn: state.userReducer.isLoggedIn,
});
export default connect(mapStateToProps, null)(Header);
Header.propTypes = {
  firstName: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  logoutHandler: PropTypes.func.isRequired,
  profileButtonClass: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
