const defaultState = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  isLoggedIn: false,
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
    default: {
      return prevState;
    }
  }
};

export default userReducer;
