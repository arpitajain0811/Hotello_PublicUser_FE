import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './SignUpPage.css';
import SignUpForm from '../SignUpForm';
import { saveUser } from '../../redux/actions';
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
        <div className="SignUpPage" >
          <Header toHide={{ display: 'none' }} />
          <div className="SignUpBody" >
            <SignUpForm
              saveNewUser={(fn, ln, email, pwd, phn) => this.saveNewUser(fn, ln, email, pwd, phn)}
            />
            <div
              className="AlternateSignIn"
            >Already have an account?
              <a
                className="signInStyle"
                href="#"
              >Sign In
              </a>
            </div>
          </div>
          <Footer />
        </div>
      );
    }
}
const mapDispatchToProps = dispatch => ({
  saveCurrentUser: (userDetailsObj) => {
    dispatch(saveUser(userDetailsObj));
  },
});
export default connect(null, mapDispatchToProps)(SignUpBody);
SignUpBody.propTypes = {
  saveCurrentUser: PropTypes.func.isRequired,
};
