import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Switch, Route, Link } from 'react-router-dom';
import { logout } from '../../redux/actions';
import SarchBarAndHeader from '../SearchBarAndHeader';
import EditUserDetails from '../EditUserDetails';
import ManageUserBookings from '../ManageUserBookings';
import './UserProfilePage.css';
import hamburger from '../../hamburger.svg'


class UserProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editProfileIsActive: true, showSidebar: true };
  }
  componentWillMount() {
    console.log('in UserProfilePage componentWillMount');
  }

  setActiveLink =() => {
    this.setState(prevState => ({
      editProfileIsActive: !prevState.editProfileIsActive,
    }));
  }

  logoutHandler = () => {
    console.log('in UserProfilePage logoutHandler');
    this.props.logout();
  }

  toggleUserPicSidebar = () => {
    this.setState(prevState => ({
      showSidebar: !prevState.showSidebar
    }));
  }

  render() {
    console.log('in UserProfilePage render, state', this.state);
    return (
      <div className="userProfilePage" >
        <SarchBarAndHeader
          updateSearch={this.updateSearch}
          logoutHandler={this.logoutHandler}
          cityPlaceholder={this.props.city}
        />
        <div className="userProfileBody" >
          <div className="userProfileBody-col1" style={this.state.showSidebar ? {display: 'flex'} : {}}>
          <img src={hamburger} onClick={this.toggleUserPicSidebar} className="hamburger" />
            <div className="userPicBlock" >
              <div className="userPicCircle" />
              <div className="userNameBelowPic" >
                {window.localStorage.getItem('userName')}
              </div>
            </div>
            <div className="editProfileAndBookingSidebar" >
              <Link
                className="sidebarItemLink"
                to="/userProfile/"
                style={this.state.editProfileIsActive ? { backgroundColor: '#77cc76', color: 'white' } : {}}
                onClick={this.setActiveLink}
              >
                Edit profile
              </Link>
              <Link
                className="sidebarItemLink"
                to="/userProfile/manageUserBookings"
                style={this.state.editProfileIsActive ? {} : { backgroundColor: '#77cc76', color: 'white' }}
                onClick={this.setActiveLink}
              >
                Manage Bookings
              </Link>
            </div>
          </div>
          <div className="userProfileBody-col2" >
          <img src={hamburger} onClick={this.toggleUserPicSidebar} className="hamburger" />
            <Switch>
              <Route exact path="/userProfile/" component={EditUserDetails} />
              <Route path="/userProfile/manageUserBookings" component={ManageUserBookings} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(logout());
  },
});

const mapStateToProps = state => ({
  firstName: state.userReducer.firstName,
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfilePage);


UserProfilePage.propTypes = {
  logout: PropTypes.func.isRequired,
  city: PropTypes.string.isRequired,
};