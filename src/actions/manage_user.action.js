import {
  HTTP_USER_FETCHING,
  HTTP_USER_FAILED,
  HTTP_USER_SUCCESS,
  HTTP_USER_ALERTED,
  server,
  OK,
  key,
} from "../constants";
import { httpClient } from "./../utils/HttpClient";
import Swal from "sweetalert2";

export const setStateToFetching = () => ({
  type: HTTP_USER_FETCHING,
});

export const setStateToSuccess = (payload) => ({
  type: HTTP_USER_SUCCESS,
  payload,
});

export const setStateToFailed = (payload) => ({
  type: HTTP_USER_FAILED,
  payload: payload,
});

export const setStateToErrorAlerted = (payload) => ({
  type: HTTP_USER_ALERTED,
  payload: payload,
});

const doGetUser = async (dispatch) => {
  try {
    let userResult = await httpClient.get(server.USER_URL);
    dispatch(setStateToSuccess(userResult.data.result));
  } catch (error) {
    dispatch(setStateToFailed(error));
  }
};

export const getUser = () => {
  return async (dispatch) => {
    dispatch(setStateToFetching());
    doGetUser(dispatch);
    try {
    } catch (error) {
      dispatch(setStateToFailed(error));
    }
  };
};

export const deleteUser = (username) => {
  return async (dispatch) => {
    dispatch(setStateToFetching());
    try {
      await httpClient.delete(server.USER_URL, { data: { username, editBy: localStorage.getItem(key.USER_NAME) } });
    } catch (error) {
      dispatch(setStateToFailed(error));
    }
    doGetUser(dispatch);
    try {
    } catch (error) {
      dispatch(setStateToFailed(error));
    }
  };
};

// updateUserLevel
export const updateUserLevel = (history, updateData) => {
  return async (dispatch) => {
    dispatch(setStateToFetching());
    try {
      let resultBackend = await httpClient.put(
        server.USER_URL + "/levelUser",
        updateData
      );
      if (resultBackend.data.api_result === OK) {
        dispatch(setStateToSuccess(resultBackend.data.result));
        history.goBack();
      } else {
        dispatch(setStateToFailed(resultBackend.data.error));
      }
    } catch (error) {
      dispatch(setStateToFailed(error));
    }
  };
};

export const getUserByKeyword = (event) => {
  return (dispatch) => {
    var keyword = event.target.value;
    dispatch(setStateToFetching());
    try {
      if (keyword !== null && keyword !== "") {
        httpClient
          .get(`${server.USER_URL}/keyword/${keyword}`)
          .then((result) => {
            dispatch(setStateToSuccess(result.data.result));
          });
      } else {
        doGetUser(dispatch);
      }
    } catch (error) {
      dispatch(setStateToFailed(error));
    }
  };
};

export const showUserErrorAlerted = (messageError) => {
  return async (dispatch) => {
    dispatch(setStateToErrorAlerted(messageError));
    Swal.fire({
      icon: "error",
      title: "Manage user error...",
      text: messageError,
    });
  };
};
