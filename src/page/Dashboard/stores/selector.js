import { createSelector } from "reselect"
import { INIT_STATE_DASHBOARD } from "./state"

const selectDashboard = state => state.dashboardReducers || INIT_STATE_DASHBOARD
const selectLoading = createSelector(selectDashboard, state => state.isLoading)
const selectListDashboard = createSelector(
  selectDashboard,
  state => state.listDashboard
)

export { selectLoading, selectListDashboard }
