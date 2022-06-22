import { combineReducers } from "redux"
import loginReducers from "../../page/Login/store/reducers"
import systemServiceReducers from "../../page/SystemService/stores/reducer"
import newsReducers from "../../page/News/stores/reducer"
import usersReducers from "../../page/Users/store/reducer"
import listbookingReducers from "../../page/ListBooking/stores/reducer"
import dashboardReducers from "../../page/Dashboard/stores/reducer"
import listFormOnlineReducers from "../../page/FormOnline/stores/reducer"
import feedBacksReducers from "../../page/FeedBacks/stores/reducer"

export default function createReducer() {
  const rootReducer = combineReducers({
    loginReducers,
    systemServiceReducers,
    newsReducers,
    usersReducers,
    listbookingReducers,
    dashboardReducers,
    listFormOnlineReducers,
    feedBacksReducers
  })
  return rootReducer
}
