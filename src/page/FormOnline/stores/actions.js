import {
  SET_LOADING,
  GET_ALL_FORM,
  SAVE_ALL_FORM,
  GET_ALL_PROFILE,
  SAVE_ALL_PROFILE
} from "./constants"

export const setLoading = payload => {
  return {
    type: SET_LOADING,
    payload
  }
}

export const getAllListForm = payload => {
  return {
    type: GET_ALL_FORM,
    payload
  }
}

export const saveAllListForm = payload => {
  return {
    type: SAVE_ALL_FORM,
    payload
  }
}

export const getAllUserProfile = payload => {
  return {
    type: GET_ALL_PROFILE,
    payload
  }
}

export const saveAllUserProfile = payload => {
  return {
    type: SAVE_ALL_PROFILE,
    payload
  }
}
