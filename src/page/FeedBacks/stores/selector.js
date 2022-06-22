import { createSelector } from "reselect"
import { INIT_STATE } from "./state"

const selectMyFeedbacks = state => state.feedBacksReducers || INIT_STATE
const selectLoading = createSelector(
  selectMyFeedbacks,
  state => state.isLoading
)
const selectFeedbacks = createSelector(
  selectMyFeedbacks,
  state => state.dataTable
)

export { selectLoading, selectFeedbacks }
