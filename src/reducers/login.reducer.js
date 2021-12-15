import {
  HTTP_LOGIN_FETCHING,
  HTTP_LOGIN_SUCCESS,
  HTTP_LOGIN_FAILED,
  HTTP_LOGIN_ALERTED,
} from "../constants";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
  errorMessage: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_LOGIN_FETCHING:
      return {
        ...state,
        result: null,
        isFetching: true,
        isError: false,
        errorMessage: null,
      };

    case HTTP_LOGIN_SUCCESS:
      return {
        ...state,
        result: payload,
        isFetching: false,
        isError: false,
        errorMessage: null,
      };

    case HTTP_LOGIN_FAILED:
      return {
        ...state,
        result: null,
        isFetching: false,
        isError: true,
        errorMessage: payload,
      };

    case HTTP_LOGIN_ALERTED:
      return {
        ...state,
        result: null,
        isFetching: false,
        isError: false,
        errorMessage: payload,
      };

    default:
      return state;
  }
};
