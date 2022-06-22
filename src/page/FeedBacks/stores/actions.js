import {
  SET_LOADING,
  GET_ALL_FEEDBACK,
  SAVE_ALL_FEEDBACK,
  DELETE_FEEDBACK,
  GET_ID_FEEDBACK
} from "./constants"

export const setLoading = payload => {
  return {
    type: SET_LOADING,
    payload
  }
}

export const getAllFeedback = payload => {
  return {
    type: GET_ALL_FEEDBACK,
    payload
  }
}

export const saveAllFeedback = payload => {
  return {
    type: SAVE_ALL_FEEDBACK,
    payload
  }
}

export const deleteFeedBack = (payload, resolve) => {
  return {
    type: DELETE_FEEDBACK,
    payload,
    resolve
  }
}

export function asyncDeleteFeedBack(dispatch) {
  return function returnAsync(payload) {
    return new Promise(resolve => dispatch(deleteFeedBack(payload, resolve)))
  }
}

export const getFeedBackDetail = (payload, resolve) => {
  return {
    type: GET_ID_FEEDBACK,
    payload,
    resolve
  }
}
export function asyncGetFeedBackDetail(dispatch) {
  return function returnAsync(payload) {
    return new Promise(resolve => dispatch(getFeedBackDetail(payload, resolve)))
  }
}
