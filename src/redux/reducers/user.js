const defaultState = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  isLoggedIn: false,
  bookDetails: {
    bookBasket: [],
    address: {
      addressLine1: '',
      addressLine2: '',
      addressLine3: '',
      cityName: '',
      zipCode: '',
      countryCode: '',
      province: '',
    },
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: 0,
    persons: {
      namePrefix: '',
      firstName: '',
      lastName: '',
      birthDate: '1997-03-21',
      room_index: 0,
      passengerTypeCode: 'ADT',
      baggage: '0',
    },
  },
};

const userReducer = (prevState = defaultState, action) => {
  switch (action.type) {
    case 'saveUser': {
      return {
        ...prevState,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        phoneNumber: action.payload.phoneNumber,
      };
    }
    case 'changeLoginState': {
      return {
        ...prevState,
        isLoggedIn: true,
        firstName: action.payload,
      };
    }
    case 'logout': {
      return {
        ...prevState,
        isLoggedIn: false,
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
      };
    }
    case 'userBookingDetails': {
      return {
        ...prevState,
        bookDetails: {
          ...prevState.bookDetails,
          address: {
            ...prevState.bookDetails.address,
            addressLine1: action.payload.address.addressLine1,
            addressLine2: action.payload.address.addressLine2,
            addressLine3: action.payload.address.addressLine3,
            cityName: action.payload.address.cityName,
            zipCode: action.payload.address.zipCode,
            countryCode: action.payload.address.countryCode,
            province: action.payload.address.province,
          },
          email: action.payload.email,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          phoneNumber: action.payload.phoneNumber,
          persons: {
            ...prevState.bookDetails.persons,
            namePrefix: action.payload.persons.namePrefix,
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
          },
        },
      };
    }
    case 'UPDATE_BOOK_BASKET': {
      const tempArray = [];
      tempArray.push(action.payload);
      return {
        ...prevState,
        bookDetails: {
          ...prevState.bookDetails,
          bookBasket: tempArray,
        },
      };
    }
    default: {
      return prevState;
    }
  }
};

export default userReducer;
