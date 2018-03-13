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
    console.log('in comp did mount', window.localStorage.getItem('token'), window.localStorage.getItem('userName'));
    if (window.localStorage.getItem('token')) {
      this.setState({
        loginState: {
          isLoggedIn: true,
          firstName: window.localStorage.getItem('userName'),
        },
      });
    }
  }


  render() {
    console.log('In landing page render, local storage', window.localStorage.getItem('token'));
    console.log(this.state.loginState);
    return (
      <div className="landingPage">
        <Header loginState={this.state.loginState} />
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

