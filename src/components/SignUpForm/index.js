import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SignUpForm.css';
import FormErrors from '../FormErrors';
import Header from '../Header';


class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      formErrors: {
        email: '', password: '', phone: '', firstName: '',
      },
      emailValid: false,
      passwordValid: false,
      formValid: false,
      phoneValid: false,
      firstNameValid: false,
      confirmPwdValid: false,
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
    let { confirmPwdValid } = this.state;
    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : 'Email is invalid';
        fieldValidationErrors.fieldsRequired = '';
        break;
      case 'password':
        passwordValid = value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])[A-Za-z\d$@$!%*?&_]{8,}/);
        fieldValidationErrors.password = passwordValid ? '' : 'Password must contain atleast 8 characters, a capital letter, number and special character';
        fieldValidationErrors.fieldsRequired = '';
        break;
      case 'phone':
        phoneValid = value.match(/^\d{10}$/);
        fieldValidationErrors.phone = phoneValid ? '' : 'Phone number is invalid';
        fieldValidationErrors.fieldsRequired = '';
        break;
      case 'firstName':
        firstNameValid = value.match(/^[a-zA-Z ]{1,}$/);
        fieldValidationErrors.firstName = firstNameValid ? '' : 'First name is required';
        fieldValidationErrors.fieldsRequired = '';
        break;
      case 'confirmPassword':
        confirmPwdValid = (this.state.confirmPassword === this.state.password);
        fieldValidationErrors.password = confirmPwdValid ? '' : 'Passwords do not match';
        fieldValidationErrors.fieldsRequired = '';
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
      confirmPwdValid,
    }, this.validateForm);
  }
  saveUser(fn, ln, email, pwd, phn) {
    if (this.state.formValid) {
      this.props.saveNewUser(fn, ln, email, pwd, phn);
    } else {
      const fieldValidationErrors = this.state.formErrors;
      fieldValidationErrors.fieldsRequired = 'Please fill in all the required fields';
      this.setState({
        formErrors: fieldValidationErrors,
      }, this.validateForm);
    }
  }
  validateForm() {
    this.setState({
      formValid: this.state.emailValid && this.state.passwordValid && this.state.phoneValid && this.state.firstNameValid && this.state.confirmPwdValid,
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
            name="confirmPassword"
            value={this.state.confirmPassword}
            placeholder="Confirm password"
          />
        </form>
        <div className="formErrorsDiv">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
        <div className="SignUpBtnContainer">
          <button onClick={() => this.saveUser(this.state.firstName, this.state.lastName, this.state.email, this.state.password, this.state.phone)} className="SignUpButton" >Create a new account </button>
        </div>
      </div>

    );
  }
}

export default SignUpForm;
SignUpForm.propTypes = {
  saveNewUser: PropTypes.func.isRequired,
};

