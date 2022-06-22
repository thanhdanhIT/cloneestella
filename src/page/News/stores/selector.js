import { createSelector } from "reselect"
import { INIT_STATE } from "./state"

const selectMyNews = state => state.newsReducers || INIT_STATE
const selectLoading = createSelector(selectMyNews, state => state.isLoading)
const selectNews = createSelector(selectMyNews, state => state.dataTable)

export { selectLoading, selectNews }
