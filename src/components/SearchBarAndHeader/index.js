import React from 'react';
import { Link } from 'react-router-dom';
import './SearchBarAndHeader.css';
import logo from '../../logo.svg';
import searchLogo from '../../searchLogo.svg';

class SearchBarAndHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="searchbarAndHeader">
        <div className="searchbarAndHeader-LogoAndSearchBox" >
          <div className="searchbarAndHeader-logo" >
            <img src={logo} alt="logo" className="logoInListPage" />
          </div>
          <div className="searchBox">
            <div className="searchLogoAndInputBoxContainer" >
              <img src={searchLogo} alt="searchLogo" className="searchLogo" />
              <input className="searchCityInputBox" value="Banglore" type="text" />
            </div>
            <button className="searchHotelByCityButton" >Search</button>
          </div>
        </div>
        <div className="searchbarAndHeader-LinksContainer">
          <Link to="/contact" className="searchbarAndHeader-Link">CONTACT</Link>
          <Link to="/saved" className="searchbarAndHeader-Link">SAVED</Link>
          <Link to="/signIn" className="searchbarAndHeader-Link">SIGN IN</Link>
        </div>
      </div>
    );
  }
}

export default SearchBarAndHeader;

