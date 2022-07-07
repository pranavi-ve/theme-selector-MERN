export const initialState = {
  loading: false,
  error: null,
  token: null,
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER_REQUEST":
      return {
        ...state,
        loading: true,
        error:null
      };
    case "REGISTER_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
      };
    case "REGISTER_FAILED":
      return {
        ...state,
        loading: false,
        error: action.payload.error || action.payload.error.message,
      };
    case "LOGIN_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILED":
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case "REDIRECT":
      return {
        ...state,
        loading: false,
        error: null,
        redirect: action.payload,
      };
    default:
      throw Error("cannot find mentioned type ", action.type);
  }
};
