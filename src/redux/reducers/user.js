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
            addressLine1: action.payload.addressLine1,
            addressLine2: action.payload.addressLine2,
            addressLine3: action.payload.addressLine3,
            zipCode: action.payload.zipCode,
            countryCode: action.payload.countryCode,
            province: action.payload.province,
          },
          email: action.payload.email,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          phoneNumber: action.payload.phoneNumber,
          persons: {
            ...prevState.bookDetails.persons,
            namePrefix: action.payload.title,
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
          },
        },
      };
    }
    default: {
      return prevState;
    }
  }
};

export default userReducer;
