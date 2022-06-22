import {
  SET_LOADING,
  LOGIN_REQUEST,
  SAVE_INFO_LOGIN,
  FETCH_LOGIN_FAILURE
} from "./constants"

export const loginRequest = payload => {
  return {
    type: LOGIN_REQUEST,
    payload: payload
  }
}

export const saveInfoLogin = payload => {
  return {
    type: SAVE_INFO_LOGIN,
    payload: payload
  }
}

export const fetchLoginFailure = payload => {
  return {
    type: FETCH_LOGIN_FAILURE,
    payload: payload
  }
}

export const setLoading = payload => {
  return { type: SET_LOADING, payload: payload }
}
