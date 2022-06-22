import { INIT_STATE_FORM } from "./state"
import produce from "immer"
import { SAVE_ALL_FORM, SET_LOADING, SAVE_ALL_PROFILE } from "./constants"

export default function listFormOnlineReducers(
  state = INIT_STATE_FORM,
  action
) {
  return produce(state, draf => {
    switch (action.type) {
      case SET_LOADING:
        draf.isLoading = action.payload
        break
      case SAVE_ALL_FORM:
        draf.listFormOnline = action.payload
        break
      case SAVE_ALL_PROFILE:
        draf.listUserProfile = action.payload
        break
      default:
        return state
    }
  })
}
