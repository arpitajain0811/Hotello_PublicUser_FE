import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import './SearchBarAndHeader.css';
// import logo from '../../logo.svg';
import searchLogo from '../../searchLogo.svg';
import { setSearchCityText, setSearchCityLatLng } from '../../redux/actions';
import HeaderLinks from '../HeaderLinks';
import logo from '../../logo.svg';
import UserGreetingAndIcon from '../UserGreetingAndIcon';
import TypeAheadSearchBox from '../TypeAheadSearchBox';


class SearchBarAndHeader extends React.Component {
  constructor(props) {
    super(props);
    console.log('in SearchBarAndHeader constructor, props', this.props);
    this.state = {
      displaySignOptions: null,
      displayUserIcon: null,
      style: {
        backgroundColor: 'white',
      },
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
    let bgColor = '';
    let shadow = '';
    console.log('rerendered');
    if (this.props.type === 1) {
      bgColor = 'white';
      shadow = '0 2px 10px 2px rgba(0, 0, 0, 0.1)';
    } else {
      bgColor = 'transparent';
      shadow = 'none';
    }
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
      if (this.props.type === 1) {
        signOptionsBlock = (
          <HeaderLinks changeColor="true" />
        );
      } else {
        signOptionsBlock = (
          <HeaderLinks />
        );
      }
    }
    console.log(signOptionsBlock);
    console.log(userGreetingAndIcon);
    return (
      <div className="searchbarAndHeaderDetails" style={{ backgroundColor: bgColor, boxShadow: shadow }}>
        <div className="searchbarAndHeader-LogoAndSearchBox" >
          {/* <div className="searchbarAndHeader-logo" > */}
          <img src={this.props.type===1?'/group-26.svg':logo} alt="logo" className="logoInListPage" />
          {/* </div> */}


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

