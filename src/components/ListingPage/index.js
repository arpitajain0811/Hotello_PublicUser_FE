import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './ListingPage.css';
import SarchBarAndHeader from '../SearchBarAndHeader';
import HotelParameterBox from '../HotelParameterBox';
import MapAndListView from '../MapAndListView';
import getAllHotels from '../../helpers/getAllHotels';
import filterHotels from '../../helpers/filterHotels';
import { storeAllHotels, storeFilteredHotels } from '../../redux/actions';
import ReactGoogleMaps from '../ReactGoogleMaps';
import HotelCardsContainer from '../HotelCardsContainer';

class ListingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
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
      '123424fdgdfgdgf66tytvhvh',
    ).then((response) => {
      this.props.saveAllHotels(response.hotelResultSet);
      this.setState({ loaded: true });
    });
  }

  updateFilteredHotels = (center, radius) => {
    console.log('received', radius);
    const newFilteredHotels = filterHotels(center, radius, this.props.allHotels);
    this.props.saveFilteredHotels(newFilteredHotels);
  }
    
  render() {
    return (
      <div className="listingPage" >
        <SarchBarAndHeader />
        <HotelParameterBox />
        <MapAndListView loaded={this.state.loaded} />
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


LandingPage.defaultProps = {
  allHotels: [],
  saveAllHotels: () => {},
  saveFilteredHotels: () => {},
};


ListingPage.propTypes = {
  checkInDate: PropTypes.objectOf.isRequired,
  checkOutDate: PropTypes.objectOf.isRequired,
  city: PropTypes.string.isRequired,
  rooms: PropTypes.arrayOf(Object).isRequired,
  saveAllHotels: PropTypes.func.isRequired,
  saveFilteredHotels: PropTypes.func.isRequired,
  allHotels: PropTypes.arrayOf(Object)
};

export default connect(mapStateToProps, mapDispatchToProps)(ListingPage);
