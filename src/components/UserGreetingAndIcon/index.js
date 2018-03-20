import React from 'react';
import PropTypes from 'prop-types';
import './UserGreetingAndIcon.css';
import UserProfileIcon from '../UserProfileIcon';

class UserGreetingAndIcon extends React.Component {
  render() {
    return (
      <div className="userNameDisplay" style={{ color: this.props.textColor }} >
        <p className="HiUser">Hi {this.props.firstName}</p>
        <UserProfileIcon
          logoutHandler={this.props.logoutHandler}
          profileButtonClass={this.props.profileButtonClass}
        />
      </div>
    );
  }
}

UserGreetingAndIcon.propTypes = {
  logoutHandler: PropTypes.func.isRequired,
  textColor: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  profileButtonClass: PropTypes.string.isRequired,
};

export default UserGreetingAndIcon;

