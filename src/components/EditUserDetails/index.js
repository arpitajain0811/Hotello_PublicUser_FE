import React from 'react';
import fetch from 'node-fetch';
import './EditUserDetails.css';
import loaderGif from '../../ajax-loader.gif';

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
      updateSuccessMsg: '',
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
    errorMsgs.emailErrorMsg = "";
    const truthValues = {};
    const otherMsgs = { submitErrorMsg: '', updateSuccessMsg: '' };
    if (name === 'firstName') {
      const isFirstNameValid = Array.isArray(value.match(/^[a-zA-Z ]{1,}$/));
      errorMsgs.firstNameErrorMsg = isFirstNameValid ? '' : 'first name is invalid';
      truthValues.isFirstNameValid = isFirstNameValid;
    } else if (name === 'lastName') {
      const isLastNameValid = Array.isArray(value.match(/^[a-zA-Z ]{1,}$/));
      errorMsgs.lastNameErrorMsg = isLastNameValid ? '' : 'last name is invalid';
      truthValues.isLastNameValid = isLastNameValid;
    } else if (name === 'email') {
      errorMsgs.emailErrorMsg = 'email cannot be changed.'
    }
     else {
      const isPhoneNumberValid = Array.isArray(value.match(/^\d{10}$/));
      errorMsgs.phoneNumberErrorMsg = isPhoneNumberValid ? '' : 'phone number is invalid';
      truthValues.isPhoneNumberValid = isPhoneNumberValid;
    }
    this.setState((prevState) => {
      const newState = Object.assign({}, prevState, truthValues, otherMsgs);
      newState[name] = name !== 'email' ? value : newState[name] ;
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

      }).then((resp) => {
        console.log(resp);
        this.setState({
          updateSuccessMsg: 'Details updated successfully!',
        });
      });
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
      let msgs = Object.values(this.state.validationErrorMsgs);
      msgs = msgs.filter(msg => (msg !== ''));
      if (msgs.length) {
        msgs = msgs.map(msg => `${msg},  `);
        msgs[msgs.length - 1] = msgs[msgs.length - 1].replace(',  ', '');
      }
      return (
        <div className="editUserDetailsComp" >
          My Details
          <div className="userDetailsFormBox" >
            <input type="text" className="userDetailsInputBox" name="firstName" value={this.state.firstName} onChange={this.editDetailHandler} />
            <input type="text" className="userDetailsInputBox" name="lastName" value={this.state.lastName} onChange={this.editDetailHandler} />
            <input type="text" className="userDetailsInputBox" name="email" value={this.state.email} onChange={this.editDetailHandler} />
            <input type="text" className="userDetailsInputBox" name="phoneNumber" value={this.state.phoneNumber} onChange={this.editDetailHandler} />
          </div>
          <div className="validationErrorMsgsBlock">
              {msgs}
          </div>
          <div className="saveButtonRow" >
            <div style={{ color: 'red' }}>
              {this.state.submitErrorMsg}
            </div>
            <div style={{ color: '#48bc48' }} >
              {this.state.updateSuccessMsg}
            </div>
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

