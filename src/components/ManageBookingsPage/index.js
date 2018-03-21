import React from 'react';
import './ManageBookingsPage.css';
import ManageBookingsRow from '../ManageBookingsRow';

class ManageBookingsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allBookings: [],
    };
  }
  componentDidMount() {
    const jwt = window.localStorage.getItem('token');
    const options = {
      method: 'get',
      headers: {
        authorization: jwt,
      },
    };
    fetch('/userViewBookings', options)
      .then(response => response.json())
      .then((respJSON) => {
        this.setState({ allBookings: respJSON });
      });
  }
  render() {
    const allBookingRows = [];
    this.state.allBookings.forEach((booking) => {
      const bookingRow = (<ManageBookingsRow
        key={booking.bookingid}
        amount={booking.amount}
        bookingDate={booking.bookingdate}
        bookingId={booking.bookingid}
        checkIn={booking.checkin}
        checkOut={booking.checkout}
        hotelName={booking.hotelname}
        numOfGuests={booking.numofguests}
        numOfRooms={booking.numofrooms}
      />);
      allBookingRows.push(bookingRow);
    });
    return (
      <div>
        {allBookingRows}
      </div>
    );
  }
}
ManageBookingsPage.defaultProps = {
};
ManageBookingsPage.propTypes = {
};
export default ManageBookingsPage;
