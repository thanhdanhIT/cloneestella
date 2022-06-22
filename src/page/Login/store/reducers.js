import { INIT_STATE_LOGIN } from "./initState"
import { SAVE_INFO_LOGIN, FETCH_LOGIN_FAILURE, SET_LOADING } from "./constants"
import produce from "immer"
import { Cookies } from "react-cookie"
export function setCookie(cname, cvalue) {
  document.cookie = cname + "=" + cvalue + ";"
}
export default function loginReducers(state = INIT_STATE_LOGIN, action) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }
    case SAVE_INFO_LOGIN:
      setCookie("token", action.payload.token)
      return {
        ...state,
        userInfo: action.payload
      }
    case FETCH_LOGIN_FAILURE:
      state.error = action.payload
      break
    default:
      return state
  }
}
