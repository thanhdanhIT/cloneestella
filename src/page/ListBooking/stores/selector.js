import { createSelector } from "reselect"
import { INIT_STATE_BOOKING } from "./state"

const selectListBooking = state =>
  state.listbookingReducers || INIT_STATE_BOOKING
const selectLoading = createSelector(
  selectListBooking,
  state => state.isLoading
)
const selectListBookingService = createSelector(
  selectListBooking,
  state => state.listBookingService
)

export { selectLoading, selectListBookingService }
