const defaultState = {
  allHotels: [],
  filteredHotels: [],
};

const storeHotelsReducer = (prevState = defaultState, action) => {
  switch (action.type) {
    case 'STORE_ALL_HOTELS': {
      return { ...prevState, allHotels: action.payload };
    }
    case 'STORE_FILTERED_HOTELS': {
      return { ...prevState, filteredHotels: action.payload };
    }
    default: {
      return prevState;
    }
  }
};

export default storeHotelsReducer;

