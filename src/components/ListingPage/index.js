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
import filterByPriceAndStars from '../../helpers/filterByPriceAndStars';
import FooterBlack from '../FooterBlack';
import calcDistance from '../../helpers/filterHotels';

class ListingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      noCity: false,
      center: {},
      selectedHotelDetails: {},
      priceFilter: [
        1000,
        20000,
      ],
      starsFilter: {
        1: true,
        2: true,
        3: true,
        4: true,
        5: true,
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
      if (response.hotelResultSet) {
        this.props.saveAllHotels(response.hotelResultSet);
        this.updateFilteredHotels([5000, 17000]);
        this.setState({ noCity: false });
      } else {
        this.setState({ noCity: true });
      }
      this.setState({ loaded: true });
    });
  }

  updateFilteredHotels = (priceRange, stars) => {
    const priceFilter = (priceRange || this.state.priceFilter);
    const starsFilter = Object.assign({}, this.state.starsFilter);
    if (stars) {
      starsFilter[stars] = !starsFilter[stars];
    }
    console.log('received', priceFilter, starsFilter);
    const newFilteredHotels = filterByPriceAndStars(this.props.allHotels, priceFilter, starsFilter);
    this.props.saveFilteredHotels(newFilteredHotels);
    this.setState({
      priceFilter,
      starsFilter,
    });
  }


  displayCard=(hotelId, hotelName, lat, lng, stars, origin) => {
    // this.updateCenter({ lat: Number(lat), lng: Number(lng) });
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const reqUrlBus = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=bus_station&key=AIzaSyCnIdPzEpfEV0b_6AGKeL6mF0AVw_yOgi4`;
    const reqUrlTrain = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=train_station&key=AIzaSyCnIdPzEpfEV0b_6AGKeL6mF0AVw_yOgi4`;
    const reqUrlAir = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=airport&key=AIzaSyCnIdPzEpfEV0b_6AGKeL6mF0AVw_yOgi4`;
    console.log('display');

    const nearbyPromiseBus = fetch(proxyUrl + reqUrlBus).then(response => response.json()).then(respJSON => respJSON.results);
    const nearbyPromiseTrain = fetch(proxyUrl + reqUrlTrain).then(response => response.json()).then(respJSON => respJSON.results);
    const nearbyPromiseAir = fetch(proxyUrl + reqUrlAir).then(response => response.json()).then(respJSON => respJSON.results);
    const detailsPromise = fetch(`/viewHotelDetails/${hotelId}`).then(details => details.json()).then(detailsJSON => detailsJSON.hotel_details);
    Promise.all([nearbyPromiseBus, nearbyPromiseTrain, nearbyPromiseAir, detailsPromise]).then((promiseResults) => {
      const nearbyResultsBus = promiseResults[0];
      const nearbyResultsTrain = promiseResults[1];
      const nearbyResultsAir = promiseResults[2];

      const detailsResults = promiseResults[3];
      const nearby = [];
      const { location } = detailsResults;
      for (let i = 0; i < nearbyResultsBus.length; i += 1) {
        const distance = calcDistance(lat, nearbyResultsBus[i].geometry.location.lat, lng, nearbyResultsBus[i].geometry.location.lng);
        nearby.push({ icon: '/icon.svg', name: nearbyResultsBus[i].name, distance });
        if (i === 2) { break; }
      }
      for (let i = 0; i < nearbyResultsTrain.length; i += 1) {
        const distance = calcDistance(lat, nearbyResultsTrain[i].geometry.location.lat, lng, nearbyResultsTrain[i].geometry.location.lng);
        nearby.push({ icon: '/underground.svg', name: nearbyResultsTrain[i].name, distance });
        if (i === 1) { break; }
      }
      for (let i = 0; i < nearbyResultsAir.length; i += 1) {
        const distance = calcDistance(lat, nearbyResultsAir[i].geometry.location.lat, lng, nearbyResultsAir[i].geometry.location.lng);
        nearby.push({ icon: '/plane.svg', name: nearbyResultsAir[i].name, distance });
        break;
      }


      this.setState({
        selectedHotelDetails: {
          id: hotelId, name: hotelName, origin, stars, nearby, location, lat, lng,
        },
      });
    });
  }

  logoutHandler = () => {
    console.log('in ListingPage logoutHandler');
    this.props.logout();
  }

  updateCenter=(c) => {
    console.log('updatingcenter');
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
      if (response.hotelResultSet) {
        this.props.saveAllHotels(response.hotelResultSet);
        this.updateFilteredHotels([5000, 17000]);
        this.setState({ noCity: false });
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.props.city}&key=${constants.API_KEY}`).then((value) => {
          console.log(value.data.results[0].geometry.location);
          this.setState({
            center: value.data.results[0].geometry.location,
            loaded: true,
          });
        });
      } else {
        this.setState({ noCity: true });
      }
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
          starsFilter={this.state.starsFilter}
          updateFilteredHotels={this.updateFilteredHotels}
        />
        <MapAndListView
          center={this.state.center}
          loaded={this.state.loaded}
          noCity={this.state.noCity}
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
  latLng: state.searchOptions.LatLng,
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
  latLng: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListingPage);
