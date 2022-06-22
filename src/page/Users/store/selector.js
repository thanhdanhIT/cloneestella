import { createSelector } from "reselect"
import { INIT_STATE } from "./state"

const selectMyUsers = state => state.usersReducers || INIT_STATE
const selectLoading = createSelector(selectMyUsers, state => state.isLoading)
const selectUsers = createSelector(selectMyUsers, state => state.listUsersReact)
const selectDeleteUsers = createSelector(
  selectMyUsers,
  state => state.infoDeleteUsers
)
export { selectLoading, selectUsers, selectDeleteUsers }
