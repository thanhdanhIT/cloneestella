import {
  SET_LOADING,
  GET_ALL_SYSTEM,
  SAVE_ALL_SYSTEM,
  CREATE_NEW_SERVICE,
  DELETE_NEW_SERVICE
} from "./contans"

export const setLoading = payload => {
  return {
    type: SET_LOADING,
    payload
  }
}

export const getAllSystemService = payload => {
  return {
    type: GET_ALL_SYSTEM,
    payload
  }
}

export const saveAllSystemService = payload => {
  return {
    type: SAVE_ALL_SYSTEM,
    payload
  }
}

export const createNewService = (payload, resolve) => {
  return {
    type: CREATE_NEW_SERVICE,
    payload,
    resolve
  }
}

export function asyncCreateNewService(dispatch) {
  return function returnAsync(payload) {
    return new Promise(resolve => dispatch(createNewService(payload, resolve)))
  }
}

export const deleteNewService = (payload, resolve) => {
  return {
    type: DELETE_NEW_SERVICE,
    payload,
    resolve
  }
}

export function asyncDeleteNewService(dispatch) {
  return function returnAsync(payload) {
    return new Promise(resolve => dispatch(deleteNewService(payload, resolve)))
  }
}
