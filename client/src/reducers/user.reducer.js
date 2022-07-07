export const initialState = {
  loading: false,
  error: null,
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PREF_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "GET_PREF_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
      };
    case "GET_PREF_FAILED":
      return {
        ...state,
        loading: false,
        error: action.payload.error || action.payload.error.message,
      };
    case "SAVE_PREF_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "SAVE_PREF_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
      };
    case "SAVE_PREF_FAILED":
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      throw Error("cannot find mentioned type ", action.type);
  }
};
