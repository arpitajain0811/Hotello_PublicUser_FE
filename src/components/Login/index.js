import React from 'react';
import './Login.css';
import LoginBody from '../LoginBody';


class Login extends React.Component {
  render() {
    return (
      <div className="Login">
        {/* <Header loginState={{ isLoggedIn: false, noDisplay: true }} /> */}
        <LoginBody />
        {/* <Footer /> */}
      </div>
    );
  }
}

export default Login;
