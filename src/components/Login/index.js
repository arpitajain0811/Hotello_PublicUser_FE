import React from 'react';
import './Login.css';
import LoginBody from '../LoginBody';
import Header from '../Header';
import Footer from '../Footer';

class Login extends React.Component {
  render() {
    return (
      <div className="Login">
        {/* <Header text="Hotello" /> */}
        <Header toHide={{ display: 'none' }} />
        <LoginBody />
        <Footer />
      </div>);
  }
}

export default Login;
