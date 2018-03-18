import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './SignUpPage.css';
import SignUpForm from '../SignUpForm';
import { saveUser, changeLoginState } from '../../redux/actions';
import Header from '../Header';
import Footer from '../Footer';

class SignUpBody extends Component {
    saveNewUser=(firstName, lastName, email, password, phoneNumber) => {
      fetch('/userSignUp', {
        method: 'POST',
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          password,
          phoneNumber,
        }),
      }).then(response => response.json()).then((res) => {
        if (res.msg === 'User Signed Up!') {
          this.props.saveCurrentUser(res.userDetails);
        }
      });
    }
    render() {
      return (
      // <div className="SignUpPage" >
      /* <Header loginState={{ isLoggedIn: false, noDisplay: true }} /> */
        <div className="SignUpBody" >
          <SignUpForm
            saveNewUser={(fn, ln, email, pwd, phn) => this.saveNewUser(fn, ln, email, pwd, phn)}
            changeLoginState={() => this.props.changeLoginState()}
          />
          <div
            className="AlternateSignIn"
          >Already a user?
            <button
              to="/signIn"
              className="signInStyle"
              onClick={() => this.props.closeFunc()}
            >Sign In
            </button>
          </div>
        </div>
      );
    }
}
const mapDispatchToProps = dispatch => ({
  saveCurrentUser: (userDetailsObj) => {
    dispatch(saveUser(userDetailsObj));
  },
  changeLoginState: () => {
    dispatch(changeLoginState());
  },
});
export default connect(null, mapDispatchToProps)(SignUpBody);
SignUpBody.propTypes = {
  saveCurrentUser: PropTypes.func.isRequired,
  changeLoginState: PropTypes.func.isRequired,
};
