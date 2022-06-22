import { INIT_STATE_BOOKING } from "./state"
import produce from "immer"
import { SAVE_ALL_BOOKING, SET_LOADING } from "./contant"

export default function listbookingReducers(
  state = INIT_STATE_BOOKING,
  action
) {
  return produce(state, draf => {
    switch (action.type) {
      case SET_LOADING:
        draf.isLoading = action.payload
        break
      case SAVE_ALL_BOOKING:
        draf.listBookingService = action.payload
        break
      default:
        return state
    }
  })
}
