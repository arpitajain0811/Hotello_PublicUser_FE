export const setCheckInDate = date => ({
  type: 'setCheckInDate',
  payload: {
    date,
  },
});
export const setCheckOutDate = date => ({
  type: 'setCheckOutDate',
  payload: {
    date,
  },
});
export const setSearchCityText = text => ({
  type: 'setSearchCityText',
  payload: text,
});
export const setSearchCityLatLng = obj => ({
  type: 'setSearchCityLatLng',
  payload: obj,
});
export const changeAdultsInRoom = (value, id) => ({
  type: 'changeAdultsInRoom',
  payload: {
    value,
    id,
  },
});
export const changeChildrenInRoom = (value, id) => ({
  type: 'changeChildrenInRoom',
  payload: {
    value,
    id,
  },
});
export const removeRoom = id => ({
  type: 'removeRoom',
  payload: {
    id,
  },
});
export const addRoom = () => ({
  type: 'addRoom',
});
export const confirmRooms = () => ({
  type: 'confirmRooms',
});

export const storeAllHotels = allHotels => ({
  type: 'STORE_ALL_HOTELS',
  payload: allHotels,
});

export const storeFilteredHotels = filteredHotels => ({
  type: 'STORE_FILTERED_HOTELS',
  payload: filteredHotels,
});
export const saveUser = userDetailsObj => ({
  type: 'saveUser',
  payload: userDetailsObj,
});

export const changeRoomId = roomId => ({
  type: 'CHANGE_ROOM_ID',
  payload: roomId,
});

export const changeLoginState = firstName => ({
  type: 'changeLoginState',
  payload: firstName,
});

export const logout = () => ({
  type: 'logout',
});

export const userBookingDetails = userBookDetails => ({
  type: 'userBookingDetails',
  payload: userBookDetails,
});

