import React from 'react';
import Popup from 'reactjs-popup';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveUser, changeLoginState } from '../../redux/actions';
import './LoginBody.css';
import SignUpBody from '../SignUpPage';

class LoginBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      invalidCredentials: false,
      // isLoggedIn: false,
    };
  }
  login=() => {
    const config = {
      method: 'post',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    };
    fetch('/publicLogin', config).then(response => response.text()).then((token) => {
      const check = token.split('.');
      if (check.length !== 3) {
        window.localStorage.setItem('token', null);
        this.setState({
          username: '',
          password: '',
          invalidCredentials: true,
        });
      } else {
        console.log('setting jwt');
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
          this.props.saveUser(data);
          this.props.changeLoginStatus(data.firstName);
          this.setState({
            username: '',
            password: '',
            // isLoggedIn: true,
          });

          this.props.closeFunc();
        });
      }
    });
  }
  render() {
    if (!this.state.isLoggedIn) {
      return (
        <div className="loginBody" >
          {/* <div className="loginForm" > */}
          <input type="email" required value={this.state.username} className="login-field" placeholder="Email ID" onChange={event => this.setState({ username: event.target.value, invalidCredentials: false })} />
          <input type="password" required value={this.state.password} className="login-field" placeholder="Password" onChange={event => this.setState({ password: event.target.value, invalidCredentials: false })} />
          <div className={this.state.invalidCredentials ? 'ValidLogin' : 'InvalidLogin'}>Invalid Credentials!</div>
          <button type="button" className="login-button" onClick={() => { this.login(); }}>
          LOGIN
          </button>
          <div
            className="AlternateSignUp"
          >New user?
            <Popup className="MyPopup" trigger={<button className="signUpStyle" >Sign Up</button>} modal>
              {close => (
                <div className="modal">
                  <a className="close" onClick={() => { close(); this.props.closeFunc(); }}>
          &times;
                  </a>
                  <div className="SignUpHeader"> Sign Up </div>
                  <div className="content">
                    <SignUpBody closeFunc={() => { close(); this.props.closeFunc(); }} />
                  </div>
                </div>
                  )}
            </Popup>
          </div>
          {/* </div> */}
        </div>
      );
    }

    return <Redirect to="/" />;
  }
}
LoginBody.defaultProps = {
};
LoginBody.propTypes = {
  saveUser: PropTypes.func.isRequired,
  changeLoginStatus: PropTypes.func.isRequired,
  closeFunc: PropTypes.func.isRequired,
};
const mapDispatchToProps = dispatch => ({
  saveUser: (userDetailsObj) => {
    dispatch(saveUser(userDetailsObj));
  },
  changeLoginStatus: (status) => {
    dispatch(changeLoginState(status));
  },

});
export default connect(null, mapDispatchToProps)(LoginBody);
