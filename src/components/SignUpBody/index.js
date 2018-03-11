import React, { Component } from 'react';
import './SignUpBody.css';
import SignUpForm from '../SignUpForm';

class SignUpBody extends Component {
  render() {
    return (
      <div className="SignUpBody" >
        <SignUpForm />
        <div className="AlternateSignIn">Already have an account? <a href="#">Sign In</a></div>
      </div>
    );
  }
}

export default SignUpBody;
