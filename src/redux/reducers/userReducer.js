const initialState = {
  isLoggedIn: false,
  signup: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  login: {
    email: "",
    password: "",
  },
  details: {
    id: "",
    name: "",
    email: "",
    phone: "",
    addressDetails: {
      address: null,
      city: null,
      state: null,
      pincode: null,
    },
    role: "",
    dob: null,
    doj: null,
    accessToken: "",
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
    case "SET_REGISTER_USER":
      if (action.payload.name === "confirmPassword") {
        if (state.signup.password !== action.payload.value) {
          return {
            ...state,
            signup: {
              ...state.signup,
              [action.payload.name]: action.payload.value,
              passwordMatch: false,
            },
          };
        } else {
          return {
            ...state,
            signup: {
              ...state.signup,
              [action.payload.name]: action.payload.value,
              passwordMatch: true,
            },
          };
        }
      } else {
        return {
          ...state,
          signup: {
            ...state.signup,
            [action.payload.name]: action.payload.value,
          },
        };
      }
    case "UNSET_REGISTER_USER":
      return {
        ...initialState,
      };
    case "SET_LOGIN_USER":
      return {
        ...state,
        login: {
          ...state.login,
          [action.payload.name]: action.payload.value,
        },
      };
    case "UNSET_LOGIN_USER":
      return {
        ...state,
        login: {
          ...initialState.login,
        },
      };
  }
};

export default userReducer;
