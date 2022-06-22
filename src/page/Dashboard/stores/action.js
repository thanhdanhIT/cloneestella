import { SET_LOADING, GET_ALL_DASHBOARD, SAVE_ALL_DASHBOARD } from "./contant"

export const setLoading = payload => {
  return {
    type: SET_LOADING,
    payload
  }
}

export const getAllDashboard = payload => {
  return {
    type: GET_ALL_DASHBOARD,
    payload
  }
}

export const saveAllDashboard = payload => {
  return {
    type: SAVE_ALL_DASHBOARD,
    payload
  }
}
