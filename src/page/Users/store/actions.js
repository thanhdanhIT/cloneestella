import {
  SET_LOADING,
  GET_ALL_USERS,
  SAVE_ALL_USERS,
  CREATE_USERS,
  DELETE_USERS,
  SAVE_DELE_USERS,
  UPDATE_USERS,
  GET_DETAIL_USERS
} from "./constants"

export const setLoading = payload => {
  return {
    type: SET_LOADING,
    payload
  }
}

export const getAllUsers = payload => {
  return {
    type: GET_ALL_USERS,
    payload
  }
}

export const saveAllUsers = payload => {
  return {
    type: SAVE_ALL_USERS,
    payload
  }
}

export const createUsers = (payload, resolve) => {
  return {
    type: CREATE_USERS,
    payload,
    resolve
  }
}

export function asyncCreateUsers(dispatch) {
  return function returnAsync(payload) {
    return new Promise(resolve => dispatch(createUsers(payload, resolve)))
  }
}

export const deleteUsers = (payload, resolve) => {
  return {
    type: DELETE_USERS,
    payload,
    resolve
  }
}


export function asyncDeleteUsers(dispatch) {
  return function returnAsync(payload) {
    return new Promise(resolve => dispatch(deleteUsers(payload, resolve)))
  }
}

export const updateUsers = (payload, resolve) => {
  return {
    type: UPDATE_USERS,
    payload,
    resolve
  }
}

export function asyncUpdateUsers(dispatch) {
  return function returnAsync(payload) {
    return new Promise(resolve => dispatch(updateUsers(payload, resolve)))
  }
}

export const getDetailUsers = (payload, resolve) => {
  return {
    type: GET_DETAIL_USERS,
    payload,
    resolve
  }
}
export function asyncGetDetailUsers(dispatch) {
  return function returnAsync(payload) {
    return new Promise(resolve => dispatch(getDetailUsers(payload, resolve)))
  }
}
