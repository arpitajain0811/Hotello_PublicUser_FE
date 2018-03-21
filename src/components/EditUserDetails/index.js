import React from 'react';
import fetch from 'node-fetch';
import './EditUserDetails.css';
import loaderGif from './ajax-loader.gif';
import FormErrors from '../FormErrors';

class EditUserDetails extends React.Component {
  constructor(props) {
    console.log('in EditUserDetails constructor');
    super(props);
    this.state = {
      isFirstNameValid: true,
      isPhoneNumberValid: true,
      isLastNameValid: true,
      validationErrorMsgs: {
        emailErrorMsg: '',
        firstNameErrorMsg: '',
        lastNameErrorMsg: '',
        phoneNumberErrorMsg: '',
      },
      submitErrorMsg: '',
    };
  }

  componentWillMount() {
    console.log('in EditUserDetails componentWillMount');
    fetch('/userUpdateDetails', {
      method: 'GET',
      headers: {
        authorization: window.localStorage.getItem('token'),
      },
    }).then(resp => resp.json()).then(json => this.setState(prevState => ({ ...prevState, ...json })));
  }

  editDetailHandler = (event) => {
    console.log('in editDetailHandler');
    const { name, value } = event.target;
    const errorMsgs = {};
    const truthValues = {};
    let isFirstNameValid;
    let isLastNameValid;
    let isPhoneNumberValid;
    if (name === 'firstName') {
      isFirstNameValid = value.match(/^[a-zA-Z ]{1,}$/);
      const firstNameErrorMsg = isFirstNameValid ? '' : 'first name is invalid';
      errorMsgs.firstNameErrorMsg = firstNameErrorMsg;
      truthValues.isFirstNameValid = !!Array.isArray(isFirstNameValid);
      // errorMsgs.isFirstNameValid = isFirstNameValid;
    } else if (name === 'lastName') {
      isLastNameValid = value.match(/^[a-zA-Z ]{1,}$/);
      const lastNameErrorMsg = isLastNameValid ? '' : 'last name is invalid';
      errorMsgs.lastNameErrorMsg = lastNameErrorMsg;
      truthValues.isLastNameValid = !!Array.isArray(isLastNameValid);
      // errorMsgs.isLastNameValid = isLastNameValid;
    } else {
      isPhoneNumberValid = value.match(/^\d{10}$/);
      const phoneNumberErrorMsg = isPhoneNumberValid ? '' : 'phone number is invalid';
      errorMsgs.phoneNumberErrorMsg = phoneNumberErrorMsg;
      truthValues.isPhoneNumberValid = !!Array.isArray(isPhoneNumberValid);
      // errorMsgs.isPhoneNumberValid = isPhoneNumberValid;
    }
    this.setState((prevState) => {
      const newState = Object.assign({}, prevState, truthValues, { submitErrorMsg: '' });
      newState[name] = value;
      newState.validationErrorMsgs = { ...newState.validationErrorMsgs, ...errorMsgs };
      return newState;
    });
  }

  handleSaveUserDetails = () => {
    if (this.areUserDetailsValid()) {
      const {
        firstName, lastName, phoneNumber,
      } = this.state;
      fetch('/userUpdateDetails', {
        method: 'put',
        headers: {
          authorization: window.localStorage.getItem('token'),
        },
        body: JSON.stringify({
          firstName, lastName, phoneNumber,
        }),

      }).then(resp => console.log(resp));
    } else {
      this.setState({
        submitErrorMsg: 'Please fill valid values and then submit',
      });
    }
  }

  areUserDetailsValid = () => {
    const {
      isFirstNameValid, isLastNameValid, isPhoneNumberValid,
    } = this.state;
    if (isFirstNameValid && isLastNameValid && isPhoneNumberValid) {
      return true;
    }
    return false;
  }

  render() {
    console.log('in EditUserDetails render state = ', this.state);
    if (this.state) {
      return (
        <div className="editUserDetailsComp" >
            My Details
          <div className="userDetailsFormBox" >
            <input type="text" className="userDetailsInputBox" name="firstName" value={this.state.firstName} onChange={this.editDetailHandler} />
            <input type="text" className="userDetailsInputBox" name="lastName" value={this.state.lastName} onChange={this.editDetailHandler} />
            <input type="text" className="userDetailsInputBox" name="email" value={this.state.email} />
            <input type="text" className="userDetailsInputBox" name="phoneNumber" value={this.state.phoneNumber} onChange={this.editDetailHandler} />
            <div className="validationErrorMsgsBlock">
              {Object.values(this.state.validationErrorMsgs)}
            </div>
          </div>

        My Billing Details
          <div className="userDetailsFormBox" >
            <input type="text" className="userDetailsInputBox" value="shit" />
            <input type="text" className="userDetailsInputBox" value="shit" />
            <input type="text" className="userDetailsInputBox" value="shit" />
            <input type="text" className="userDetailsInputBox" value="shit" />
            <input type="text" className="userDetailsInputBox" value="shit" />
          </div>
          <div className="saveButtonRow" >
            {this.state.submitErrorMsg}
            <button className="saveDetailsButton" onClick={this.handleSaveUserDetails} >Save Details</button>
          </div>

        </div>
      );
    }
    return (
      <div className="editUserDetailsLoaderContainer">
        <img src={loaderGif} alt="loader" />
      </div>
    );
  }
}

export default EditUserDetails;

