import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getAllHotels from '../../helpers/getAllHotels';
import filterHotels from '../../helpers/filterHotels';
import { storeAllHotels, storeFilteredHotels } from '../../redux/actions';
import ReactGoogleMaps from '../ReactGoogleMaps';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }
  componentDidMount() {
    getAllHotels(
      'Mumbai', '2018-03-27', '2018-03-30', [
        {
          ADT: 1,
          CHD: 1,
        },
        {
          ADT: 1,
        },
      ],
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MjA2OTExMjksImVtYWlsIjoic2FtcGxldXNlckBnbWFpbC5jb20iLCJpYXQiOjE1MjA2ODc1Mjl9.cOMpx75eCCP0ADTlOjhVLqnDAbeWABI61qn0Ylk782c',
    )
      .then((response) => {
        this.props.saveAllHotels(response.hotelResultSet);
        this.setState({ loaded: true });
      });
  }

  updateFilteredHotels = (center, radius) => {
    const centerObj = { latitude: center.lat(), longitude: center.lng() };
    const radiusInKm = Math.floor(radius / 1000);
    const newFilteredHotels = filterHotels(centerObj, radiusInKm, this.props.allHotels);
    console.log('a:::::;', newFilteredHotels);
    this.props.saveFilteredHotels(newFilteredHotels);
  }


  render() {
    if (this.state.loaded === false) {
      return (
        <p>Loading...</p>
      );
    }

    return (
      <div>
        <ReactGoogleMaps isMarkerShown updateFilteredHotels={this.updateFilteredHotels} allHotels={this.props.allHotels} />
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
});


LandingPage.defaultProps = {
  allHotels: [],
  saveAllHotels: () => {},
  filteredHotels: [],
  saveFilteredHotels: () => {},
};
LandingPage.propTypes = {
  allHotels: PropTypes.arrayOf(Object),
  saveAllHotels: PropTypes.func,
  filteredHotels: PropTypes.arrayOf(Object),
  saveFilteredHotels: PropTypes.func,
};
export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
