import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import './SearchBarAndHeader.css';
// import logo from '../../logo.svg';
import searchLogo from '../../searchLogo.svg';
import { setSearchCityText, setSearchCityLatLng } from '../../redux/actions';
import HeaderLinks from '../HeaderLinks';
import UserGreetingAndIcon from '../UserGreetingAndIcon';
import TypeAheadSearchBox from '../TypeAheadSearchBox';


class SearchBarAndHeader extends React.Component {
  constructor(props) {
    super(props);
    console.log('in SearchBarAndHeader constructor, props', this.props);
    this.state = {
      displaySignOptions: null,
      displayUserIcon: null,
    };
  }

  componentWillMount() {
    console.log('in SearchBarAndHeader componentWillMount, this.props.loginState', this.props.loginState);
    if (this.props.isLoggedIn) {
      this.setState({
        displaySignOptions: false,
        displayUserIcon: true,
      });
    } else if (this.props.isLoggedIn === false) {
      this.setState({
        displaySignOptions: true,
        displayUserIcon: false,
      });
    }
  }

  // componentWillReceiveProps(newProps) {
  //   console.log('in SearchBarAndHeader componentWillReceiveProps, newProps', newProps);
  //   if (newProps.loginState.isLoggedIn === false) {
  //     this.setState({
  //       displaySignOptions: true,
  //       displayUserIcon: false,
  //     });
  //   }
  // }
  render() {
    if (this.props.isLoggedIn === true && this.state.displayUserIcon === false) {
      this.setState({
        displaySignOptions: false,
        displayUserIcon: true,
      });
    } else if (this.props.isLoggedIn === false && this.state.displayUserIcon === true) {
      this.setState({
        displaySignOptions: true,
        displayUserIcon: false,
      });
    }
    // console.log('in SearchBarAndHeader render, this.state', this.state);
    let userGreetingAndIcon = null;
    let signOptionsBlock = null;
    if (this.state.displayUserIcon) {
      userGreetingAndIcon = (
        <UserGreetingAndIcon
          isLoggedIn={this.props.isLoggedIn}
          logoutHandler={this.props.logoutHandler}
          firstName={this.props.firstName}
          profileButtonClass="profileButtonBlack"
        />
      );
    }
    if (this.state.displaySignOptions) {
      signOptionsBlock = (
        <HeaderLinks changeColor="true" />
      );
    }
    console.log(signOptionsBlock);
    console.log(userGreetingAndIcon);
    return (
      <div className="searchbarAndHeader">
        <div className="searchbarAndHeader-LogoAndSearchBox" >
          {/* <div className="searchbarAndHeader-logo" > */}
          <img src="/h-logo.png" alt="logo" className="logoInListPage" />
          {/* </div> */}
          <div className="searchBox">
            <div className="searchLogoAndInputBoxContainer" >
              <img src={searchLogo} alt="searchLogo" className="searchLogo" />
              <TypeAheadSearchBox cityPlaceholder={this.props.cityPlaceholder} saveSearchCityText={this.props.saveSearchCityText} saveSearchCityLatLng={this.props.saveSearchCityLatLng} />
              {/* <input
                className="searchCityInputBox"
                value={this.props.city}
                type="text"
                onChange={text => this.props.saveSearchCityText(text)}
              /> */}
            </div>
            <button className="searchHotelByCityButton" onClick={() => { this.props.updateSearch(); }}>Search</button>
          </div>
        </div>
        {/* <div className="searchbarAndHeader-LinksContainer">
          <Link to="/contact" className="searchbarAndHeader-Link">CONTACT</Link>
          <Link to="/saved" className="searchbarAndHeader-Link">SAVED</Link>
          <Link to="/signIn" className="searchbarAndHeader-Link">SIGN IN</Link>
        </div> */}
        {signOptionsBlock}
        {userGreetingAndIcon}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  saveSearchCityText: (text) => {
    dispatch(setSearchCityText(text));
  },
  saveSearchCityLatLng: (obj) => {
    dispatch(setSearchCityLatLng(obj));
  },
});
const mapStateToProps = state => ({
  city: state.searchOptions.city,
  isLoggedIn: state.userReducer.isLoggedIn,
  firstName: state.userReducer.firstName,
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchBarAndHeader);
SearchBarAndHeader.propTypes = {
  city: PropTypes.string.isRequired,
  saveSearchCityText: PropTypes.func.isRequired,
  updateSearch: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  logoutHandler: PropTypes.func.isRequired,
  firstName: PropTypes.string.isRequired,
};

