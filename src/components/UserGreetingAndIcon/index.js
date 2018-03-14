import React from 'react';
import './UserGreetingAndIcon.css';
import UserProfileIcon from '../UserProfileIcon';

class UserGreetingAndIcon extends React.Component {
  render() {
    return (
      <div className="userNameDisplay">
        <h3>Hi {this.props.loginState.firstName}</h3>
        <UserProfileIcon logoutHandler={this.props.logoutHandler} />
      </div>
    );
  }
}

export default UserGreetingAndIcon;

