const defaultState = {
  currentRoomId: '',
};

const storeHotelsReducer = (prevState = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_ROOM_ID': {
      return { ...prevState, currentRoomId: action.payload };
    }
    default: {
      return prevState;
    }
  }
};

export default storeHotelsReducer;
