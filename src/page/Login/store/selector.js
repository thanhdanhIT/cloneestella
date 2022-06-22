import { createSelector } from "reselect"
import { INIT_STATE_LOGIN } from "./initState"

const selectMyLogin = state => {
  return state.loginReducers || INIT_STATE_LOGIN
}
const selectLoading = createSelector(selectMyLogin, state => state.isLoading)
const selectUserInfo = createSelector(selectMyLogin, state => state.userInfo)

export { selectUserInfo, selectLoading }
