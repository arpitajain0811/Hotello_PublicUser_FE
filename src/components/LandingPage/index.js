import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './LandingPage.css';
import LandingPageBody from '../LandingPageBody';
import { logout, changeLoginState } from '../../redux/actions';
import Header from '../Header';
import Footer from '../Footer';

class LandingPage extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     loginState: {
  //       isLoggedIn: false,
  //       firstName: '',
  //     },
  //   };
  // }

  componentWillMount() {
  //   console.log('in LandingPage componentWillMount, window.localStorage.getItem(userName)', window.localStorage.getItem('userName'), typeof (window.localStorage.getItem('userName')));
    if (window.localStorage.getItem('token') !== null) {
      this.props.changeLoginState(window.localStorage.getItem('userName'));
    }
  //     this.setState({
  //       loginState: {
  //         isLoggedIn: true,
  //         firstName: window.localStorage.getItem('userName'),
  //       },
  //     });
  //   } else {
  //     this.setState({
  //       loginState: {
  //         isLoggedIn: false,
  //         firstName: '',
  //       },
  //     });
  //   }
  }

  logoutHandler = () => {
    // console.log('in LandingPage logoutHandler');
    // this.setState({
    //   loginState: {
    //     isLoggedIn: false,
    //     firstName: '',
    //   },
    // });
    this.props.logout();
  }

  render() {
    console.log('In LandingPage render, window.localStorage.getItem(userName)', window.localStorage.getItem('userName'));
    // console.log('In LandingPage render, this.state.loginState', this.state.loginState);
    return (
      <div className="landingPage">
        <Header
          // loginState={this.state.loginState}
          isLoggedIn={this.props.isLoggedIn}
          firstName={this.props.firstName}
          logoutHandler={this.logoutHandler}
          textColor="white"
          profileButtonClass="profileButtonWhite"
        />
        <LandingPageBody />
        <Footer />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(logout());
  },
  changeLoginState: (firstName) => {
    dispatch(changeLoginState(firstName));
  },
});

const mapStateToProps = state => ({
  firstName: state.userReducer.firstName,
  isLoggedIn: state.userReducer.isLoggedIn,
});
export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
LandingPage.propTypes = {
  firstName: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  changeLoginState: PropTypes.func.isRequired,
};
