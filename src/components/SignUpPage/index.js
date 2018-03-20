import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Popup from 'reactjs-popup';
import PropTypes from 'prop-types';
import LoginBody from '../LoginBody';
import './SignUpPage.css';
import SignUpForm from '../SignUpForm';
import { saveUser, changeLoginState } from '../../redux/actions';
// import Header from '../Header';
// import Footer from '../Footer';

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
          console.log('res', res);
          fetch('/publicLogin', {
            method: 'post',
            body: JSON.stringify({
              username: res.userDetails.email,
              password: res.userDetails.password,
            }),
          }).then(response => response.text()).then((token) => {
            window.localStorage.setItem('token', token);
            fetch('/userUpdateDetails', {
              method: 'GET',
              headers: {
                authorization: window.localStorage.getItem('token'),
              },
            }).then(user => user.json()).then((data) => {
              //   console.log(data);
              console.log(data);
              window.localStorage.setItem('userName', data.firstName);
              // this.props.saveUser(data);
              // this.props.changeLoginStatus(data.firstName);
              this.setState({
                email: '',
                password: '',
                // isLoggedIn: true,
              });

              this.props.closeFunc();
            });
          });
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
            changeLoginState={fn => this.props.changeLoginState(fn)}
          />
          <div
            className="AlternateSignIn"
          >Already a user?
            <Popup className="MyPopup" trigger={<button onClick={() => this.props.closeFunc()}className="signInStyle"> Sign In </button>} modal>
              {close => (
                <div className="modal">
                  <a className="close" onClick={() => { close(); this.props.closeFunc(); }}>
          &times;
                  </a>
                  <div className="SignUpHeader"> Sign In </div>
                  <div className="content">
                    <LoginBody closeFunc={() => { this.props.closeFunc(); close(); }} />
                  </div>
                </div>
    )}
            </Popup>
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
  closeFunc: PropTypes.func.isRequired,
};
