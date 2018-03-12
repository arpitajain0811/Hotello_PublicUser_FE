const defaultState = {
  firstName: '',
  lastName: '',
  email: '',
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

    default: {
      return prevState;
    }
  }
};

export default userReducer;
