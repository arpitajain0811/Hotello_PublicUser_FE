import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import './UserProfileIcon.css';

class UserProfileIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropDownOpen: false,
      isLoggedIn: true,
    };
  }

  componentWillMount() {

  }

  doLogout = () => {
    const config = {
      method: 'POST',
      headers: {
        authorization: window.localStorage.getItem('token'),
      },
    };
    fetch('/logout', config).then(response => response.json()).then((respJson) => {
      console.log(respJson);
      window.localStorage.setItem('token', respJson.token);
      window.localStorage.setItem('userName', null);
      this.props.logoutHandler();
      // this.setState({
      //   isLoggedIn: false,
      // });
    });
  }

  toggleDropDown = () => {
    this.setState(prevState => ({
      isDropDownOpen: !prevState.isDropDownOpen,
    }));
  }

  render() {
    // console.log(this.state);
    // if (this.state.isLoggedIn) {
    return (
      <div>
        <div className="profileIconBlock" >
          <button
            className="profileButton"
            onClick={this.toggleDropDown}
          >
            <i className="material-icons">person</i>
          </button>
        </div>
        <div className={this.state.isDropDownOpen ? 'dropDownBlock-opened' : 'dropDownBlock-closed'}>
          <Link to="/adminMain/edit" className="noUnderLine">
            <div className="dropDown-item" onClick={() => { alert('clicked user profile'); }}>
                Your Profile
            </div>
          </Link>
          <div className="dropDown-item" onClick={this.doLogout}>
                Logout
          </div>
        </div>
      </div>
    );
    // }
    // return <Redirect to="/" />;
  }
}

export default UserProfileIcon;
