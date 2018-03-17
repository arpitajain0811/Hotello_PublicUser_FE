import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveUser } from '../../redux/actions';
import './LoginBody.css';

class LoginBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      invalidCredentials: false,
      isLoggedIn: false,
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

          this.setState({
            username: '',
            password: '',
            isLoggedIn: true,
          });
        });
      }
    });
  }
  render() {
    if (!this.state.isLoggedIn) {
      return (
        <div className="loginBody" >
          <div className="loginForm" >
            <input type="email" required value={this.state.username} className="login-field" placeholder="Email ID" onChange={event => this.setState({ username: event.target.value, invalidCredentials: false })} />
            <input type="password" required value={this.state.password} className="login-field" placeholder="Password" onChange={event => this.setState({ password: event.target.value, invalidCredentials: false })} />
            <div className={this.state.invalidCredentials ? '' : 'InvalidLogin'}>Invalid Credentials!</div>
            <button type="button" className="login-field login-button" onClick={() => { this.login(); this.props.closeFunc(); }}>
          LOGIN
            </button>
          </div>
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
};
const mapDispatchToProps = dispatch => ({
  saveUser: (userDetailsObj) => {
    dispatch(saveUser(userDetailsObj));
  },

});
export default connect(null, mapDispatchToProps)(LoginBody);
