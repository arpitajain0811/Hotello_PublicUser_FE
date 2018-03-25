const defaultState = {
  currentRoomId: '',
  hotelDetails: {},
  rooms: {},
  redirect: false,
};

const storeHotelsReducer = (prevState = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_ROOM_ID': {
      return { ...prevState, currentRoomId: action.payload };
    }
    case 'UPDATE_HOTEL_DETAILS': {
      return { ...prevState, hotelDetails: action.payload.hotelDetails, rooms: action.payload.rooms };
    }
    case 'UPDATE_REDIRECT': {
      return { ...prevState, redirect: !prevState.redirect };
    }
    default: {
      return prevState;
    }
  }
};

export default storeHotelsReducer;
