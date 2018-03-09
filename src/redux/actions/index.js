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
  type: 'STORE_ALL_HOTELS',
  payload: allHotels,
});

export const storeFilteredHotels = filteredHotels => ({
  type: 'STORE_FILTERED_HOTELS',
  payload: filteredHotels,
});

