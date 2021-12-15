import {
  HTTP_REGISTER_FETCHING,
  HTTP_REGISTER_SUCCESS,
  HTTP_REGISTER_FAILED,
  HTTP_REGISTER_ALERTED,
  server,
  OK,
  key,
} from "../constants";
import { httpClient } from "./../utils/HttpClient";
import Swal from "sweetalert2";

export const setRegisterStateToFetching = () => ({
  type: HTTP_REGISTER_FETCHING,
});

export const setRegisterStateToSuccess = (payload) => ({
  type: HTTP_REGISTER_SUCCESS,
  payload: payload,
});

export const setRegisterStateToFailed = (payload) => ({
  type: HTTP_REGISTER_FAILED,
  payload: payload,
});

export const setStateToErrorAlerted = (payload) => ({
  type: HTTP_REGISTER_ALERTED,
  payload: payload,
});

function isEmailAddress(str) {
  var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return pattern.test(str); // returns a boolean
}

export const register = (history, credential) => {
  return async (dispatch) => {
    dispatch(setRegisterStateToFetching());
    if (credential.username.length < 6) {
      dispatch(setRegisterStateToFailed("username lenght should be 6-20"));
      return;
    }

    if (credential.password.length < 6) {
      dispatch(setRegisterStateToFailed("Password lenght should be 6-20"));
      return;
    }

    if (credential.email === "" || credential.email === null) {
      dispatch(setRegisterStateToFailed("Please fill your email"));
      return;
    }

    if (!isEmailAddress(credential.email)) {
      dispatch(
        setRegisterStateToFailed("it not email address, please try again")
      );
      return;
    }

    if (credential.vendorCode === "" || credential.vendorCode == null) {
      dispatch(setRegisterStateToFailed("Please select division code..."));
      return;
    }

    if (credential.password !== credential.confirmPassword) {
      //alert("Password not match");
      dispatch(setRegisterStateToFailed("Password not match"));
    } else {
      try {
        console.log('start register');
        console.log(credential);
        let resultBackend = await httpClient.post(server.REGISTER_URL, credential);
        console.log(resultBackend);
        if (resultBackend.data.api_result === OK) {
          dispatch(setRegisterStateToSuccess(resultBackend.data.result));
          Swal.fire({
            icon: "success",
            title: ":D  Register completed!",
            text: "Please verify your email before login...",
          });
          history.goBack();
        } else {
          // alert(JSON.stringify(resultBackend.data.error) );
          dispatch(setRegisterStateToFailed("backend error"));
        }
      } catch (error) {
        dispatch(setRegisterStateToFailed(JSON.stringify(error)));
      }
    }
  };
};

export const RequestNewPassword = (history, email) => {
  return async (dispatch) => {
    dispatch(setRegisterStateToFetching());

    if (email === "" || email === null) {
      dispatch(setRegisterStateToFailed("Please fill your email"));
      return;
    }

    if (!isEmailAddress(email)) {
      dispatch(
        setRegisterStateToFailed("it not email address, please try again")
      );
      return;
    }

    try {
      let resultBackend = await httpClient.patch(server.FORGOT_PASS_URL, { email });
      if (resultBackend.data.api_result === OK) {
        dispatch(setRegisterStateToSuccess(resultBackend.data.result));
        Swal.fire({
          icon: "success",
          title: ":D  Request new password completed!",
          text: "Please wait email for new password and login again",
        });
        history.push("/login");
      } else {
        dispatch(setRegisterStateToFailed("email not found"));
      }
    } catch (error) {
      dispatch(setRegisterStateToFailed(error));
    }
  };
};

export const changePassword = (credential) => {
  return async (dispatch) => {
    dispatch(setRegisterStateToFetching());

    if (credential.oldPassword === "" || credential.oldPassword === null) {
      dispatch(setRegisterStateToFailed("Please fill old password"));
      return;
    }

    if (credential.newPassword.length < 6) {
      dispatch(setRegisterStateToFailed("Password lenght should be 6-20"));
      return;
    }

    if (credential.newPassword !== credential.confirmPassword) {
      //alert("Password not match");
      dispatch(setRegisterStateToFailed("Password not match"));
      return;
    }
    try {
      let resultBackend = await httpClient.put(
        server.USER_URL + "/password",
        credential
      );
      if (resultBackend.data.api_result === OK) {
        dispatch(setRegisterStateToSuccess(resultBackend.data.result));
        Swal.fire({
          title: ":D  Change password completed!",
          text: "Please re-login",
          icon: "success",
        }).then((result) => {
          window.location.replace("../login");
          localStorage.removeItem(key.LOGIN_PASSED);
          localStorage.removeItem(key.API_KEY);
          localStorage.removeItem(key.USER_NAME);
          localStorage.removeItem(key.USER_LV);
          localStorage.removeItem(key.TIME_LOGIN);
        });
      } else {
        dispatch(setRegisterStateToFailed(resultBackend.data.error));
      }
    } catch (error) {
      dispatch(setRegisterStateToFailed(error));
    }
  };
};

export const showRegisterErrorAlerted = (messageError) => {
  return async (dispatch) => {
    dispatch(setStateToErrorAlerted(messageError));
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: messageError,
    });
  };
};
