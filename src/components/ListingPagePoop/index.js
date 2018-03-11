import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getAllHotels from '../../helpers/getAllHotels';
import { storeAllHotels } from '../../redux/actions';

class ListingPage extends React.Component {
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
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MjA2MzIxMjgsImVtYWlsIjoic2FtcGxldXNlckBnbWFpbC5jb20iLCJpYXQiOjE1MjA2Mjg1Mjh9.GIfXHNYWqA6EuEZ-3tyvJcjZckNqxRvKS3cHHNjy_J8',
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
    const h = this.props.allHotels.map(hotel => (<div>{hotel.hotel_name}</div>));
    return (<div>{h}</div>
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


ListingPage.defaultProps = {
  allHotels: [],
  saveAllHotels: () => {},
};
ListingPage.propTypes = {
  allHotels: PropTypes.arrayOf(Object),
  saveAllHotels: PropTypes.func,
};
export default connect(mapStateToProps, mapDispatchToProps)(ListingPage);