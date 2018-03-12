import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './ListingPage.css';
import SarchBarAndHeader from '../SearchBarAndHeader';
import HotelParameterBox from '../HotelParameterBox';
import MapAndListView from '../MapAndListView';
import getAllHotels from '../../helpers/getAllHotels';
import { storeAllHotels, storeFilteredHotels } from '../../redux/actions';
import FooterBlack from '../FooterBlack';

// import ReactGoogleMaps from '../ReactGoogleMaps';
// import HotelCardsContainer from '../HotelCardsContainer';


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
    ).then((response) => {
      this.props.saveAllHotels(response.hotelResultSet);
      this.setState({ loaded: true });
    });
  }

  updateSearch=() => {
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


  render() {
    return (
      <div className="listingPage" >
        <SarchBarAndHeader updateSearch={this.updateSearch} />
        <HotelParameterBox />
        <MapAndListView loaded={this.state.loaded} />
        {this.state.loaded ? <FooterBlack /> : ''}
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
  saveFilteredHotels: PropTypes.func,
  allHotels: PropTypes.arrayOf(Object),
};

export default connect(mapStateToProps, mapDispatchToProps)(ListingPage);
