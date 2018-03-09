import React from 'react';
import moment from 'moment';

const defaultState = {
  city: '',
  checkInDate: (new Date()),
  checkOutDate: moment((new Date()).setDate((new Date()).getDate() + 1)),
  rooms: [],
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
    default: {
      return prevState;
    }
  }
};
export default searchOptionsReducer;
