import { createSelector } from "reselect"
import { INIT_STATE } from "./state"

const selectSystemService = state => state.systemServiceReducers || INIT_STATE
const selectLoading = createSelector(
  selectSystemService,
  state => state.isLoading
)
const selectListSystemService = createSelector(
  selectSystemService,
  state => state.listServiceSystem
)

export { selectLoading, selectListSystemService }
