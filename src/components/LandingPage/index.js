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
    console.log('in comp will mount', window.localStorage.getItem('userName'));
    if (window.localStorage.getItem('userName')) {
      this.setState({
        loginState: {
          isLoggedIn: true,
          firstName: window.localStorage.getItem('userName'),
        },
      });
    }
  }

  // componentDidMount() {
  //   console.log('in comp did mount', window.localStorage.getItem('userName'));
  //   if (window.localStorage.getItem('userName')) {
  //     this.setState({
  //       loginState: {
  //         isLoggedIn: true,
  //         firstName: window.localStorage.getItem('userName'),
  //       },
  //     });
  //   }
  // }


  logoutHandler = () => {
    console.log('inside logoutHandler');
    this.setState({
      loginState: {
        isLoggedIn: false,
        firstName: null,
      },
    });
  }

  render() {
    console.log('In landing page render, local storage', window.localStorage.getItem('userName'));
    console.log('In landing page render, state', this.state.loginState);
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

