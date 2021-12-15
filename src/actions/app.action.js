import { APP_INIT, key } from "../constants";

export const setApp = (app) => {
  return (dispatch) => {
    dispatch({
      type: APP_INIT,
      payload: app,
    });
  };
};

