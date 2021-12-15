import {
    HTTP_USER_FETCHING,
    HTTP_USER_FAILED,
    HTTP_USER_SUCCESS,
    HTTP_USER_ALERTED,
  } from "../constants";
  
  const initialState = {
    result: null,
    isFetching: false,
    isError: false,
    errorMessage: null,
  };
  
  export default (state = initialState, { type, payload }) => {
    switch (type) {
      case HTTP_USER_FETCHING:
        return {
          ...state,
          result: null,
          isFetching: true,
          isError: false,
          errorMessage: null,
        };
  
      case HTTP_USER_SUCCESS:
        return {
          ...state,
          result: payload,
          isFetching: false,
          isError: false,
          errorMessage: null,
        };
  
      case HTTP_USER_FAILED:
        return {
          ...state,
          result: null,
          isFetching: false,
          isError: true,
          errorMessage: payload,
        };
  
      case HTTP_USER_ALERTED:
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
  