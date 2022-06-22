import { INIT_STATE } from "./state"
import produce from "immer"
import { SAVE_ALL_SYSTEM, SET_LOADING } from "./contans"

export default function systemServiceReducers(state = INIT_STATE, action) {
  return produce(state, draf => {
    switch (action.type) {
      case SET_LOADING:
        draf.isLoading = action.payload
        break
      case SAVE_ALL_SYSTEM:
        draf.listServiceSystem = action.payload
        break
      default:
        return state
    }
  })
}
