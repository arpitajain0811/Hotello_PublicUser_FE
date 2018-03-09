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

export const storeAllHotels = allHotels => ({
  type: 'storeAllHotels',
  payload: allHotels,
});

