import { constant } from "lodash";

// App_Init
export const APP_INIT = "APP_INIT";
export const APP_TITLE = "Material Receiving Tag";

// Login Page
export const HTTP_LOGIN_FETCHING = "HTTP_LOGIN_FETCHING";
export const HTTP_LOGIN_SUCCESS = "HTTP_LOGIN_SUCCESS";
export const HTTP_LOGIN_FAILED = "HTTP_LOGIN_FAILED";
export const HTTP_LOGIN_ALERTED = "HTTP_LOGIN_ALERTED";

// Register Page
export const HTTP_REGISTER_FETCHING = "HTTP_REGISTER_FETCHING";
export const HTTP_REGISTER_SUCCESS = "HTTP_REGISTER_SUCCESS";
export const HTTP_REGISTER_FAILED = "HTTP_REGISTER_FAILED";
export const HTTP_REGISTER_ALERTED = "HTTP_REGISTER_ALERTED";

// user
export const HTTP_USER_FETCHING = "HTTP_USER_FETCHING";
export const HTTP_USER_SUCCESS = "HTTP_USER_SUCCESS";
export const HTTP_USER_FAILED = "HTTP_USER_FAILED";
export const HTTP_USER_ALERTED = "HTTP_USER_ALERTED";

// plant code
export const HTTP_PLANTCODE_FETCHING = "HTTP_PLANTCODE_FETCHING";
export const HTTP_PLANTCODE_SUCCESS = "HTTP_PLANTCODE_SUCCESS";
export const HTTP_PLANTCODE_FAILED = "HTTP_PLANTCODE_FAILED";
export const HTTP_PLANTCODE_ALERTED = "HTTP_PLANTCODE_ALERTED";

// Division code
export const HTTP_DIVCODE_FETCHING = "HTTP_DIVCODE_FETCHING";
export const HTTP_DIVCODE_SUCCESS = "HTTP_DIVCODE_SUCCESS";
export const HTTP_DIVCODE_FAILED = "HTTP_DIVCODE_FAILED";
export const HTTP_DIVCODE_ALERTED = "HTTP_DIVCODE_ALERTED";

// Error Code
export const E_PICKER_CANCELLED = "E_PICKER_CANCELLED";
export const E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR =
  "E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR";
export const E_PERMISSION_MISSING = "E_PERMISSION_MISSING";
export const E_PICKER_NO_CAMERA_PERMISSION = "E_PICKER_NO_CAMERA_PERMISSION";
export const E_USER_CANCELLED = "E_USER_CANCELLED";
export const E_UNKNOWN = "E_UNKNOWN";
export const E_DEVELOPER_ERROR = "E_DEVELOPER_ERROR";
export const TIMEOUT_NETWORK = "ECONNABORTED"; // request service timeout
export const NOT_CONNECT_NETWORK = "NOT_CONNECT_NETWORK";

//////////////// Localization Begin ////////////////
export const NETWORK_CONNECTION_MESSAGE =
  "Cannot connect to server, Please try again.";
export const NETWORK_TIMEOUT_MESSAGE =
  "A network timeout has occurred, Please try again.";
export const UPLOAD_PHOTO_FAIL_MESSAGE =
  "An error has occurred. The photo was unable to upload.";

export const apiUrl = "http://54.255.187.109:2008/api/material-receiving-tag/";
export const imageUrl = "http://54.255.187.109:2008/";

// export const apiUrl = "http://127.0.0.1:2008/api/material-receiving-tag/";
// export const imageUrl = "http://127.0.0.1:2008/";

export const YES = "YES";
export const NO = "NO";
export const OK = "ok";
export const NOK = "nok";

export const server = {
  LOGIN_URL: `authen/login`,
  REGISTER_URL: `authen/register`,
  VERIFY_EMAIL_URL: `authen/verifyEmail`,
  FORGOT_PASS_URL:'authen/forgotPassword',
  
  USER_URL: `manage_user/user`,
  DIVISIONCODE_URL: `manage_master/division`,
  PLANTCODE_URL: `manage_master/plantCode`,
};

export const key = {
  LOGIN_PASSED: `LOGIN_PASSED`,
  API_KEY: `API_KEY`,
  USER_LV: `USER_LV`,
  USER_NAME: "USER_NAME",
  TIME_LOGIN: "TIME_LOGIN",
};
