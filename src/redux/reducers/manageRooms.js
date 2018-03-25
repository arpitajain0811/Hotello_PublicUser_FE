const defaultState = {
  currentRoomId: '',
  roomsArrayOfSelectedHotel: [],
  isRoomSelectionDisabled: false,
};

const storeHotelsReducer = (prevState = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_ROOM_ID': {
      return { ...prevState, currentRoomId: action.payload };
    }
    case 'setRoomTypeArray': {
      return { ...prevState, roomsArrayOfSelectedHotel: action.payload };
    }
    case 'setRoomTypeEditable': {
      return { ...prevState, isRoomSelectionDisabled: false };
    }
    case 'setRoomTypeUneditable': {
      return { ...prevState, isRoomSelectionDisabled: true };
    }
    default: {
      return prevState;
    }
  }
};

export default storeHotelsReducer;
