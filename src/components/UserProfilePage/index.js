import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import { logout, changeLoginState } from '../../redux/actions';
import Header from '../Header';
import EditUserDetails from '../EditUserDetails';
import ManageUserBookings from '../ManageUserBookings';
import './UserProfilePage.css';
import hamburger from '../../hamburger.svg';


class UserProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editProfileIsActive: true, showSidebar: true };
  }
  componentWillMount() {
    console.log('in UserProfilePage componentWillMount');
    this.props.changeLoginState(window.localStorage.getItem('userName'));
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
      showSidebar: !prevState.showSidebar,
    }));
  }

  changeUserName = (newUserName) => {
    console.log('in UserProfilePage changeUserName');
    window.localStorage.setItem('userName', newUserName);
    this.props.changeLoginState(window.localStorage.getItem('userName'));
  }

  render() {
    console.log('in UserProfilePage render, state, userName', this.state, window.localStorage.getItem('userName'));
    if (!window.localStorage.getItem('userName')) {
      return (
        <Redirect to="/" />
      );
    }
    return (
      <div className="userProfilePage" >
        <Header
          logoGreen
          logoutHandler={this.logoutHandler}
          profileButtonClass="profileButtonBlack"
          setStyle={{ height: '10%', padding: '0% 2%' }}
        />
        <div className="userProfileBody" >
          <div className="userProfileBody-col1" style={this.state.showSidebar ? { display: 'flex' } : {}}>
          <img src={hamburger} onClick={this.toggleUserPicSidebar} alt="hamburger" className="hamburger" />
            <div className="userPicBlock" >
              <div className="userPicCircle">{window.localStorage.getItem('userName')[0]}</div>
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
            <img src={hamburger} onClick={this.toggleUserPicSidebar} alt="hamburger" className="hamburger" />
            <div
              className="backButtonContainer"
            >
                <div className="backArrow">◀</div><Link to="/" className="goHomeLink">Go to Home</Link>
            </div>
            <Switch>
              <Route exact path="/userProfile/" component={() => (<EditUserDetails changeUserName={this.changeUserName} />)} />
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
  changeLoginState: (firstName) => {
    dispatch(changeLoginState(firstName));
  },
});

const mapStateToProps = state => ({
  firstName: state.userReducer.firstName,
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfilePage);


UserProfilePage.propTypes = {
  logout: PropTypes.func.isRequired,
  changeLoginState: PropTypes.func.isRequired,
};
