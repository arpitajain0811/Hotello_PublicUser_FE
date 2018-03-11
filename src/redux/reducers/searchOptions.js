import moment from 'moment';

const defaultState = {
  city: '',
  checkInDate: (new Date()),
  checkOutDate: moment((new Date()).setDate((new Date()).getDate() + 1)),
  rooms: [{
    ADT: 1,
    CHD: 0,
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
    case 'changeAdultsInRoom': {
      const updatedRooms = prevState.rooms.slice();
      for (let i = 0; i < prevState.rooms.length; i += 1) {
        if (action.payload.id === i + 1) {
          updatedRooms[i].ADT = Number(action.payload.value);
        }
      }
      return {
        ...prevState,
        rooms: updatedRooms,
      };
    }
    case 'changeChildrenInRoom': {
      const updatedRooms = prevState.rooms.slice();
      for (let i = 0; i < prevState.rooms.length; i += 1) {
        if (action.payload.id === i + 1) {
          updatedRooms[i].CHD = Number(action.payload.value);
        }
      }
      return {
        ...prevState,
        rooms: updatedRooms,
      };
    }
    case 'removeRoom': {
      const updatedRooms = [];
      for (let i = 0; i < prevState.rooms.length; i += 1) {
        if (action.payload.id !== i + 1) {
          updatedRooms.push(prevState.rooms[i]);
        }
      }
      return {
        ...prevState,
        rooms: updatedRooms,
      };
    }
    case 'addRoom': {
      const updatedRooms = prevState.rooms.slice();
      updatedRooms.push({
        ADT: 1,
        CHD: 0,
      });
      return {
        ...prevState,
        rooms: updatedRooms,
      };
    }
    case 'confirmRooms': {
      const updatedRooms = prevState.rooms.slice();
      const rooms = updatedRooms.length;
      let adults = 0;
      let children = 0;
      for (let i = 0; i < rooms; i += 1) {
        adults += updatedRooms[i].ADT;
        children += updatedRooms[i].CHD;
      }
      return {
        ...prevState,
        totalRooms: rooms,
        totalAdults: adults,
        totalChildren: children,
      };
    }
    default: {
      return prevState;
    }
  }
};
export default searchOptionsReducer;
