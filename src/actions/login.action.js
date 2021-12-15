import {
  HTTP_LOGIN_FETCHING,
  HTTP_LOGIN_SUCCESS,
  HTTP_LOGIN_FAILED,
  server,
  key,
  OK,
  YES,
  HTTP_LOGIN_ALERTED,
} from "../constants";
import { httpClient } from "./../utils/HttpClient";
import * as moment from "moment";
import Swal from "sweetalert2";

export const setLoginStateToFetching = () => ({
  type: HTTP_LOGIN_FETCHING,
});

export const setLoginStateToSuccess = (payload) => ({
  type: HTTP_LOGIN_SUCCESS,
  payload,
});

export const setLoginStateToFailed = (payload) => ({
  type: HTTP_LOGIN_FAILED,
  payload: payload,
});

export const setLoginStateToErrorAlerted = (payload) => ({
  type: HTTP_LOGIN_ALERTED,
  payload: payload,
});

export const autoLogin = (history) => {
  return () => {
    if (localStorage.getItem(key.LOGIN_PASSED) === YES) {
      setTimeout(() => history.push("/home"), 100);
    }
  };
};

export const login = (history, credential) => {
  return async (dispatch, getState) => {
    dispatch(setLoginStateToFetching());
    try {
      let resultBackend = await httpClient.post(server.LOGIN_URL, credential);
      if (resultBackend.data.api_result === OK) {
        localStorage.setItem(key.LOGIN_PASSED, YES);
        localStorage.setItem(key.USER_NAME, resultBackend.data.result.username);
        localStorage.setItem(key.TIME_LOGIN, moment());
        localStorage.setItem(key.API_KEY, resultBackend.data.jwt);
        localStorage.setItem(key.USER_LV, resultBackend.data.result.levelUser);
        
        dispatch(setLoginStateToSuccess(resultBackend.data));
        
        window.location.replace("../home");
        // history.push("/home");
        // getState().appReducer.app.forceUpdate();
      } else {
        dispatch(setLoginStateToFailed(resultBackend.data.error));
      }
    } catch (error) {
      console.log(error);
      dispatch(setLoginStateToFailed());
    }
  };
};

export const showLoginErrorAlerted = (messageError) => {
  return async (dispatch) => {
    dispatch(setLoginStateToErrorAlerted(messageError));
    Swal.fire({
      icon: "error",
      title: "Login error...",
      text: messageError,
    });
  };
};
