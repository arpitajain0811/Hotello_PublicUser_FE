import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import constants from '../../constants.json';
import './ListingPage.css';
import SarchBarAndHeader from '../SearchBarAndHeader';
import HotelParameterBox from '../HotelParameterBox';
import MapAndListView from '../MapAndListView';
import getAllHotels from '../../helpers/getAllHotels';
import { storeAllHotels, storeFilteredHotels } from '../../redux/actions';
// import FooterBlack from '../FooterBlack';

// import ReactGoogleMaps from '../ReactGoogleMaps';
// import HotelCardsContainer from '../HotelCardsContainer';


class ListingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      center: {},
      // loginState: {
      //   isLoggedIn: false,
      //   firstName: '',
      // },
    };
  }

  componentWillMount() {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.props.city}&key=${constants.API_KEY}`).then((value) => {
      // console.log(value.data.results[0].geometry.location);
      this.setState({
        center: value.data.results[0].geometry.location,
      });
    });
    console.log('in ListingPage componentWillMount, window.localStorage.getItem(userName)', window.localStorage.getItem('userName'), typeof (window.localStorage.getItem('userName')));
    if (window.localStorage.getItem('userName') !== null) {
      // console.log('in ListingPage componentWillMount, inside if');
      // this.setState({
      //   loginState: {
      //     isLoggedIn: true,
      //     firstName: window.localStorage.getItem('userName'),
      //   },
      // });
    }
  }


  componentDidMount() {
    let inDate = this.props.checkInDate.format();
    let outDate = this.props.checkOutDate.format();
    console.log(inDate, outDate);
    inDate = inDate.substring(0, inDate.lastIndexOf('T'));
    outDate = outDate.substring(0, outDate.lastIndexOf('T'));
    getAllHotels(
      this.props.city,
      inDate, outDate,
      this.props.rooms,
    ).then((response) => {
      this.props.saveAllHotels(response.hotelResultSet);
      this.setState({ loaded: true });
    });
  }

  logoutHandler = () => {
    console.log('in ListingPage logoutHandler');
    this.props.logout();
  }

  updateCenter=(c) => {
    this.setState({ center: c });
  }
  updateSearch=() => {
    let inDate = this.props.checkInDate.format();
    let outDate = this.props.checkOutDate.format();
    console.log(inDate, outDate);
    inDate = inDate.substring(0, inDate.lastIndexOf('T'));
    outDate = outDate.substring(0, outDate.lastIndexOf('T'));
    this.setState({ loaded: false });
    getAllHotels(
      this.props.city,
      inDate, outDate,
      this.props.rooms,
    ).then((response) => {
      this.props.saveAllHotels(response.hotelResultSet);
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.props.city}&key=${constants.API_KEY}`).then((value) => {
        console.log(value.data.results[0].geometry.location);
        this.setState({
          center: value.data.results[0].geometry.location,
          loaded: true,
        });
      });
    });
  }


  render() {
    console.log('in ListingPage render, state', this.state);
    return (
      <div className="listingPage" >
        <SarchBarAndHeader
          updateSearch={this.updateSearch}
          // loginState={this.state.loginState}
          logoutHandler={this.logoutHandler}
        />
        <HotelParameterBox />
        <MapAndListView center={this.state.center} loaded={this.state.loaded} updateCenter={this.updateCenter} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  saveAllHotels: (allHotelsArray) => {
    dispatch(storeAllHotels(allHotelsArray));
  },
  saveFilteredHotels: (filteredHotelsArray) => {
    dispatch(storeFilteredHotels(filteredHotelsArray));
  },
});
const mapStateToProps = state => ({
  allHotels: state.storeHotels.allHotels,
  checkInDate: state.searchOptions.checkInDate,
  checkOutDate: state.searchOptions.checkOutDate,
  city: state.searchOptions.city,
  rooms: state.searchOptions.rooms,
});


ListingPage.defaultProps = {

};

ListingPage.propTypes = {
  checkInDate: PropTypes.objectOf.isRequired,
  checkOutDate: PropTypes.objectOf.isRequired,
  city: PropTypes.string.isRequired,
  rooms: PropTypes.arrayOf(Object).isRequired,
  saveAllHotels: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  // allHotels: PropTypes.arrayOf(Object),
};

export default connect(mapStateToProps, mapDispatchToProps)(ListingPage);
