import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import { updateAdminUser } from '../../redux/actions';
import './LoginBody.css';

class LoginBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
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
        });
      } else {
        window.localStorage.setItem('token', token);
        fetch('/userUpdateDetails', {
          method: 'GET',
          headers: {
            authorization: window.localStorage.getItem('token'),
          },
        }).then(user => user.json()).then((data) => {
          console.log(data);
        //   this.props.updateAdminUser(data);
        });
        this.setState({
          username: '',
          password: '',
          isLoggedIn: true,
        });
      }
    });
  }
  render() {
    if (!this.state.isLoggedIn) {
      return (
        <div className="login-body" >
          <input type="email" required value={this.state.username} className="login-field" placeholder="Email ID" onChange={event => this.setState({ username: event.target.value })} />
          <input type="password" required value={this.state.password} className="login-field" placeholder="Password" onChange={event => this.setState({ password: event.target.value })} />

          <button type="button" className="login-field login-button" onClick={() => { this.login(); }}>
          LOGIN
          </button>

        </div>);
    }

    return <Redirect to="/" />;
  }
}
LoginBody.defaultProps = {
};
LoginBody.propTypes = {
  updateAdminUser: PropTypes.func.isRequired,
};
// const mapDispatchToProps = dispatch => ({
//   updateAdminUser: (email) => {
// dispatch(updateAdminUser(email));
//   },

// }s);
export default connect(null, null)(LoginBody);
