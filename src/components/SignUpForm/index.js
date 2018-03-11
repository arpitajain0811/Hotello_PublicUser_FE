import React, { Component } from 'react';
import './SignUpForm.css';
import FormErrors from '../FormErrors';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phone: '',
      formErrors: {
        email: '', password: '', phone: '', firstName: '',
      },
      emailValid: false,
      passwordValid: false,
      formValid: false,
      phoneValid: false,
      firstNameValid: false,
    };
  }
  handleUserInput(e) {
    const { name } = e.target;
    const { value } = e.target;
    this.setState(
      { [name]: value },
      () => { this.validateField(name, value); },
    );
  }
  validateField(fieldName, value) {
    const fieldValidationErrors = this.state.formErrors;
    let { emailValid } = this.state;
    let { passwordValid } = this.state;
    let { phoneValid } = this.state;
    let { firstNameValid } = this.state;
    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])[A-Za-z\d$@$!%*?&_]{8,}/);
        fieldValidationErrors.password = passwordValid ? '' : 'must contain atlest 8 characters, a capital letter, number and special character';
        break;
      case 'phone':
        phoneValid = value.match(/^\d{10}$/);
        fieldValidationErrors.phone = phoneValid ? '' : 'number is invalid';
        break;
      case 'firstName':
        firstNameValid = value.match(/^[a-zA-Z ]{1,}$/);
        fieldValidationErrors.firstName = firstNameValid ? '' : 'is required';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      emailValid,
      passwordValid,
      phoneValid,
      firstNameValid,
    }, this.validateForm);
  }

  validateForm() {
    this.setState({
      formValid: this.state.emailValid && this.state.passwordValid && this.state.phoneValid && this.state.firstNameValid,
    });
  }
  render() {
    return (
      <div className="SignUpFormContainer" >
        <form className="SignUpForm">
          <input
            className="SignUpInputField"
            onChange={event => this.handleUserInput(event)}
            name="firstName"
            value={this.state.firstName}
            type="text"
            placeholder="First name"
          />
          <input
            className="SignUpInputField"
            onChange={event => this.handleUserInput(event)}
            type="text"
            value={this.state.lastName}
            name="lastName"
            placeholder="Last name"
          />
          <input
            className="SignUpInputField"
            onChange={event => this.handleUserInput(event)}
            type="text"
            value={this.state.phone}
            name="phone"
            placeholder="Phone Number"
          />
          <input
            className="SignUpInputField"
            onChange={event => this.handleUserInput(event)}
            name="email"
            value={this.state.email}
            type="text"
            placeholder="Email"
          />
          <input
            className="SignUpInputField"
            onChange={event => this.handleUserInput(event)}
            name="password"
            value={this.state.password}
            type="password"
            placeholder="Password"
          />
          <input
            className="SignUpInputField"
            onChange={event => this.handleUserInput(event)}
            type="password"
            name="confirm"
            placeholder="Confirm password"
          />
        </form>
        <div className="formErrorsDiv">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
        <div className="SignUpBtnContainer">
          <button onClick={() => console.log('hey')} className="SignUpButton" disabled={!this.state.formValid}>Sign Up</button>
        </div>
      </div>
    );
  }
}

export default SignUpForm;
