import moment from 'moment';

const defaultState = {
  city: '',
  checkInDate: (new Date()),
  checkOutDate: moment((new Date()).setDate((new Date()).getDate() + 1)),
  rooms: [{
    adults: 1,
    children: 0,
  }],
  totalRooms: 1,
  totalAdults: 1,
  totalChildren: 0,
};
const searchOptionsReducer = (prevState = defaultState, action) => {
  switch (action.type) {
    case 'setCheckInDate': {
      return {
        ...prevState,
        checkInDate: action.payload.date,
      };
    }
    case 'setCheckOutDate': {
      return {
        ...prevState,
        checkOutDate: action.payload.date,
      };
    }
    case 'setSearchCityText': {
      return {
        ...prevState,
        city: action.payload.text.target.value,
      };
    }
    default: {
      return prevState;
    }
  }
};
export default searchOptionsReducer;
