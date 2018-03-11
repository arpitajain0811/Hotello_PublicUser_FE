import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './SignUpBody.css';
import SignUpForm from '../SignUpForm';
import { saveUser } from '../../redux/actions';

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
        <div className="SignUpBody" >
          <SignUpForm
            saveNewUser={(fn, ln, email, pwd, phn) => this.saveNewUser(fn, ln, email, pwd, phn)}
          />
          <div className="AlternateSignIn">Already have an account? <a href="#">Sign In</a></div>
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
