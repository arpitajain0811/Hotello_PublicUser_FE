import React from 'react';
import './ManageUserBookings.css';
import ManageUserBookingsRow from '../ManageUserBookingsRow';

class ManageUserBookings extends React.Component {
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
      const bookingRow = (<ManageUserBookingsRow
        key={booking.bookingid}
        amount={booking.amount}
        bookingDate={booking.bookingdate}
        bookingId={booking.bookingid}
        checkIn={booking.checkin}
        checkOut={booking.checkout}
        hotelName={booking.hotelname}
        numOfGuests={booking.numofguests}
        numOfRooms={booking.numofrooms}
        status={booking.status}
      />);
      allBookingRows.push(bookingRow);
    });
    if (allBookingRows.length) {
      return (
        <div className="manage-user-bookings">
          {allBookingRows}
        </div>
      );
    }
    return (
      <div className="manage-user-bookings">
        <div className="messageContainer" >
          No Bookings Found
        </div>
      </div>
    );
  }
}
ManageUserBookings.defaultProps = {
};
ManageUserBookings.propTypes = {
};
export default ManageUserBookings;
