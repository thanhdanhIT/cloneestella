import { INIT_STATE } from "./state"
import produce from "immer"
import { SAVE_ALL_FEEDBACK, SET_LOADING } from "./constants"

export default function feedBacksReducers(state = INIT_STATE, action) {
  return produce(state, draf => {
    switch (action.type) {
      case SET_LOADING:
        draf.isLoading = action.payload
        break
      case SAVE_ALL_FEEDBACK:
        draf.dataTable = action.payload
        break
      default:
        return state
    }
  })
}
