import { INIT_STATE_DASHBOARD } from "./state"
import produce from "immer"
import { SAVE_ALL_DASHBOARD, SET_LOADING } from "./contant"

export default function dashboardReducers(
  state = INIT_STATE_DASHBOARD,
  action
) {
  return produce(state, draf => {
    switch (action.type) {
      case SET_LOADING:
        draf.isLoading = action.payload
        break
      case SAVE_ALL_DASHBOARD:
        draf.listDashboard = action.payload
        break
      default:
        return state
    }
  })
}
