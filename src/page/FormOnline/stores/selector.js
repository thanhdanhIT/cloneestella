import { createSelector } from "reselect"
import { INIT_STATE_FORM } from "./state"
const selectListFormOnline = state =>
  state.listFormOnlineReducers || INIT_STATE_FORM
const selectLoading = createSelector(
  selectListFormOnline,
  state => state.isLoading
)
const selectListFormOnlineService = createSelector(
  selectListFormOnline,
  state => state.listFormOnline
)
const selectListUserProfileService = createSelector(
  selectListFormOnline,
  state => state.listUserProfile
)

export {
  selectLoading,
  selectListFormOnlineService,
  selectListUserProfileService
}
