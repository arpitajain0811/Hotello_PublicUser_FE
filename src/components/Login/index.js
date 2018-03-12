import React from 'react';
import './Login.css';
import LoginBody from '../LoginBody';

class Login extends React.Component {
  render() {
    return (
      <div className="Login">
        {/* <Header text="Hotello" /> */}
        <LoginBody />
      </div>);
  }
}

export default Login;
