import {
  SET_LOADING,
  GET_ALL_NEWS,
  SAVE_ALL_NEWS,
  CREATE_NEWS,
  DELETE_NEWS,
  UPDATE_NEWS,
  GET_ID_NEWS,
  GET_ALL_UPLOAD,
  SAVE_ALL_UPLOAD
} from "./constants"

export const setLoading = payload => {
  return {
    type: SET_LOADING,
    payload
  }
}

export const getAllNews = payload => {
  return {
    type: GET_ALL_NEWS,
    payload
  }
}

export const saveAllNews = payload => {
  return {
    type: SAVE_ALL_NEWS,
    payload
  }
}

export const getAllUploadFile = payload => {
  return {
    type: GET_ALL_UPLOAD,
    payload
  }
}

export const saveAllUploadFile = payload => {
  return {
    type: SAVE_ALL_UPLOAD,
    payload
  }
}

export const createNews = (payload, resolve) => {
  return {
    type: CREATE_NEWS,
    payload,
    resolve
  }
}

export function asyncCreateNews(dispatch) {
  return function returnAsync(payload) {
    return new Promise(resolve => dispatch(createNews(payload, resolve)))
  }
}

export const deleteNews = (payload, resolve) => {
  return {
    type: DELETE_NEWS,
    payload,
    resolve
  }
}

export function asyncDeleteNews(dispatch) {
  return function returnAsync(payload) {
    return new Promise(resolve => dispatch(deleteNews(payload, resolve)))
  }
}

export const updateNews = (payload, resolve) => {
  return {
    type: UPDATE_NEWS,
    payload,
    resolve
  }
}

export function asyncUpdateNews(dispatch) {
  return function returnAsync(payload) {
    return new Promise(resolve => dispatch(updateNews(payload, resolve)))
  }
}

export const getIdNews = (payload, resolve) => {
  return {
    type: GET_ID_NEWS,
    payload,
    resolve
  }
}
export function asyncgetIdNews(dispatch) {
  return function returnAsync(payload) {
    return new Promise(resolve => dispatch(getIdNews(payload, resolve)))
  }
}
