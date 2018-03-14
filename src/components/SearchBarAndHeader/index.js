import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './SearchBarAndHeader.css';
import logo from '../../logo.svg';
import searchLogo from '../../searchLogo.svg';
import { setSearchCityText } from '../../redux/actions';
import UserProfileIcon from '../UserProfileIcon';


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
    if (this.props.loginState.isLoggedIn) {
      this.setState({
        displaySignOptions: false,
        displayUserIcon: true,
      });
    } else if (this.props.loginState.noDisplay) {
      this.setState({
        displaySignOptions: false,
        displayUserIcon: false,
      });
    } else if (this.props.loginState.isLoggedIn === false) {
      this.setState({
        displaySignOptions: true,
        displayUserIcon: false,
      });
    }
  }

  componentWillReceiveProps(newProps) {
    console.log('in SearchBarAndHeader componentWillReceiveProps, newProps', newProps);
    if (newProps.loginState.isLoggedIn === false) {
      this.setState({
        displaySignOptions: true,
        displayUserIcon: false,
      });
    }
  }
  render() {
    console.log('in SearchBarAndHeader render, this.state', this.state);
    let userIconBlock = null;
    let signOptionsBlock = null;
    if (this.state.displayUserIcon) {
      userIconBlock = (
        <div className="userNameDisplay" >
          <h3 style={{ color: 'green' }} >Hi {this.props.loginState.firstName}</h3>
          <UserProfileIcon logoutHandler={this.props.logoutHandler} />
        </div>
      );
    }
    if (this.state.displaySignOptions) {
      signOptionsBlock = (
        <div className="headerLinksContainer" style={{ backgroundColor: 'green' }} >
          <Link to="/signUp" className="headerLink">SIGN UP</Link>
          <Link to="/signIn" className="headerLink">SIGN IN</Link>
        </div>
      );
    }
    console.log(signOptionsBlock);
    console.log(userIconBlock);
    return (
      <div className="searchbarAndHeader">
        <div className="searchbarAndHeader-LogoAndSearchBox" >
          <div className="searchbarAndHeader-logo" >
            <img src={logo} alt="logo" className="logoInListPage" />
          </div>
          <div className="searchBox">
            <div className="searchLogoAndInputBoxContainer" >
              <img src={searchLogo} alt="searchLogo" className="searchLogo" />
              <input
                className="searchCityInputBox"
                value={this.props.city}
                type="text"
                onChange={text => this.props.saveSearchCityText(text)}
              />
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
        {userIconBlock}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  saveSearchCityText: (text) => {
    dispatch(setSearchCityText(text));
  },
});
const mapStateToProps = state => ({
  city: state.searchOptions.city,
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchBarAndHeader);
SearchBarAndHeader.propTypes = {
  city: PropTypes.string.isRequired,
  saveSearchCityText: PropTypes.func.isRequired,
  updateSearch: PropTypes.func.isRequired,
};
