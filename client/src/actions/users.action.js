import * as constants from "../helpers/constants";
import { register, login, savePref, getPref } from "../api/users.api";
import { toast } from 'react-toastify';
function registerUser(dispatch, user, navigate) {
  dispatch({ type: constants.REGISTER_REQUEST });
  register(user)
    .then((data) => {
      if (data.error) {
        dispatch({ type: constants.REGISTER_FAILED, payload: data });
        toast(data.error);
        return;
      }
      dispatch({ type: constants.REGISTER_SUCCESS });
      navigate("/auth?page=login",{
        replace: true,
      });
      toast("User successfully registered");
    })
    .catch((err) => {
      toast("Some error occured");
      dispatch({ type: constants.REGISTER_FAILED, payload: err });
    });
}

function loginUser(dispatch, user, navigate) {
  dispatch({ type: constants.LOGIN_REQUEST });
  login(user)
    .then((data) => {
      if (data.error) {
        toast(data.error);
        dispatch({ type: constants.LOGIN_FAILED, payload: data });
        return;
      }
      dispatch({ type: constants.LOGIN_SUCCESS });
      navigate("/",{
        replace: true,
      });
    })
    .catch((err) => {
      toast("Some error occured");
      dispatch({ type: constants.LOGIN_FAILED, payload: err });
    });
}

async function savePreferences(dispatch, preference) {
  return savePref(preference)
    .then((data) => {
      if (data.error) {
        dispatch({ type: constants.SAVE_PREF_FAILED, payload: preference });
        return;
      }
      dispatch({ type: constants.SAVE_PREF_SUCCESS });
    })
    .catch((err) => {
      dispatch({ type: constants.SAVE_PREF_FAILED, payload: err });
    });
}
async function getPreferences(dispatch) {
  return getPref()
    .then((data) => {
      if (data.error) {
        dispatch({ type: constants.GET_PREF_FAILED });
        return;
      }
      dispatch({ type: constants.GET_PREF_SUCCESS });
    })
    .catch((err) => {
      dispatch({ type: constants.GET_PREF_FAILED, payload: err });
    });
}
export { registerUser, loginUser, savePreferences, getPreferences };
