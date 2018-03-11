import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './SearchBarAndHeader.css';
import logo from '../../logo.svg';
import searchLogo from '../../searchLogo.svg';
import { setSearchCityText } from '../../redux/actions';


class SearchBarAndHeader extends React.Component {
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
              <input
                className="searchCityInputBox"
                value={this.props.city}
                type="text"
                onChange={text => this.props.saveSearchCityText(text)}
              />
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
};
