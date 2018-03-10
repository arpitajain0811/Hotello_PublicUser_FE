import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getAllHotels from '../../helpers/getAllHotels';
import { storeAllHotels } from '../../redux/actions';
import HotelCardsContainer from '../HotelCardsContainer';

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
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MjQyOTEzNjEsImVtYWlsIjoic2FtcGxldXNlckBnbWFpbC5jb20iLCJpYXQiOjE1MjA2OTEzNjF9.GihjaS7Lzg4hqvPlyx65fRq7BXANxdn3ko7Rgg8kTV8',
    )
      .then((response) => {
        this.props.saveAllHotels(response.hotelResultSet);
        this.setState({ loaded: true });
      });
  }
  render() {
    if (this.state.loaded === false) {
      return (
        <p>Loading...</p>
      );
    }

    return (
      <HotelCardsContainer />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  saveAllHotels: (allHotelsArray) => {
    dispatch(storeAllHotels(allHotelsArray));
  },
});
const mapStateToProps = state => ({
  allHotels: state.storeHotels.allHotels,
});


LandingPage.defaultProps = {
  allHotels: [],
  saveAllHotels: () => {},
};
LandingPage.propTypes = {
  allHotels: PropTypes.arrayOf(Object),
  saveAllHotels: PropTypes.func,
};
export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
