import React from 'react';
import { connect } from 'react-redux';
import './LandingPage.css';
import LandingPageBody from '../LandingPageBody';
import Header from '../Header';
import Footer from '../Footer';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginState: {
        isLoggedIn: false,
        firstName: null,
      },
    };
  }

  componentWillMount() {
    console.log('in LandingPage componentWillMount, window.localStorage.getItem(userName)', window.localStorage.getItem('userName'));
    if (window.localStorage.getItem('userName') !== 'null') {
      this.setState({
        loginState: {
          isLoggedIn: true,
          firstName: window.localStorage.getItem('userName'),
        },
      });
    }
  }

  logoutHandler = () => {
    console.log('in LandingPage logoutHandler');
    this.setState({
      loginState: {
        isLoggedIn: false,
        firstName: null,
      },
    });
  }

  render() {
    console.log('In LandingPage render, window.localStorage.getItem(userName)', window.localStorage.getItem('userName'));
    console.log('In LandingPage render, this.state.loginState', this.state.loginState);
    return (
      <div className="landingPage">
        <Header
          loginState={this.state.loginState}
          logoutHandler={this.logoutHandler}
        />
        <LandingPageBody />
        <Footer />
      </div>
    );
  }
}


const mapStateToProps = state => ({
  firstName: state.userReducer.firstName,
});
export default connect(mapStateToProps, null)(LandingPage);

