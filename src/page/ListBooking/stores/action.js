import { SET_LOADING, GET_ALL_BOOKING, SAVE_ALL_BOOKING } from "./contant"

export const setLoading = payload => {
  return {
    type: SET_LOADING,
    payload
  }
}

export const getAllListBooking = payload => {
  return {
    type: GET_ALL_BOOKING,
    payload
  }
}

export const saveAllListBooking = payload => {
  return {
    type: SAVE_ALL_BOOKING,
    payload
  }
}
