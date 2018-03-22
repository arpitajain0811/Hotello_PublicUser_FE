import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import constants from '../../constants.json';
import './ListingPage.css';
import SearchBarAndHeader from '../SearchBarAndHeader';
import HotelParameterBox from '../HotelParameterBox';
import MapAndListView from '../MapAndListView';
import getAllHotels from '../../helpers/getAllHotels';
import { storeAllHotels, storeFilteredHotels, logout, changeLoginState } from '../../redux/actions';
import filterByPrice from '../../helpers/filterByPrice';
import FooterBlack from '../FooterBlack';


class ListingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      center: {},
      selectedHotelDetails: {},
      priceFilter: {
        minPrice: 1000,
        maxPrice: 20000,
      },
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
      this.props.changeLoginState(window.localStorage.getItem('userName'));
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
      this.updateFilteredHotels([25, 75]);
      this.setState({ loaded: true });
    });
  }

  updateFilteredHotels = (priceRange) => {
    // console.log('received', radius);
    const newFilteredHotels = filterByPrice(this.props.allHotels, priceRange);
    this.props.saveFilteredHotels(newFilteredHotels);
    const currentMinPrice = 1000 + ((priceRange[0] / 100) * (20000 - 1000));
    const currentMaxPrice = (1000 + ((priceRange[1] / 100) * (20000 - 1000)));
    this.setState({
      priceFilter:
      { minPrice: currentMinPrice.toFixed(0), maxPrice: currentMaxPrice.toFixed(0) },
    });
  }

  displayCard=(hotelId, hotelName, stars, origin) => {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const reqUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=12.995460,%2077.696218&radius=1000&type=transit_station&key=AIzaSyCnIdPzEpfEV0b_6AGKeL6mF0AVw_yOgi4';
    console.log('display');
    fetch(proxyUrl + reqUrl)
      .then(response => response.json())
      .then(respJSON => respJSON.results)
      .then((results) => {
        const nearby = [];
        for (let i = 0; i < 5; i += 1) {
          if (results[i].types[0] === 'bus_station') {
            nearby.push({ icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/bus-71.png', name: results[i].name });
          }
        }
        this.setState({
          selectedHotelDetails: {
            id: hotelId, name: hotelName, origin, stars, nearby,
          },
        });
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
      this.updateFilteredHotels([25, 75]);
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
        <SearchBarAndHeader
          updateSearch={this.updateSearch}
          logoutHandler={this.logoutHandler}
          cityPlaceholder={this.props.city}
        />
        <HotelParameterBox
          priceFilter={this.state.priceFilter}
          updateFilteredHotels={this.updateFilteredHotels}
        />
        <MapAndListView
          center={this.state.center}
          loaded={this.state.loaded}
          updateCenter={this.updateCenter}
          selectedHotelDetails={this.state.selectedHotelDetails}
          displayCard={this.displayCard}
        />
        <FooterBlack />
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
  logout: () => {
    dispatch(logout());
  },
  changeLoginState: (firstName) => {
    dispatch(changeLoginState(firstName));
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
  logout: PropTypes.func.isRequired,
  changeLoginState: PropTypes.func.isRequired,
  saveFilteredHotels: PropTypes.func.isRequired,
  allHotels: PropTypes.arrayOf(Object).isRequired,
  saveAllHotels: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListingPage);
