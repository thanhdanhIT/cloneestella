import { takeLatest, put, call, all } from "redux-saga/effects"
import { GET_ALL_DASHBOARD } from "./contant"
import { getListDashboard } from "../../../services/systemService"
import { saveAllDashboard, setLoading } from "./action"

function* getDashboardSaga() {
  try {
    yield put(setLoading(true))
    const respone = yield call(getListDashboard)
    yield all([put(setLoading(false)), put(saveAllDashboard(respone.result))])
  } catch (error) {
    console.log(error)
    yield put(setLoading(false))
  }
}
export function* listDashboard() {
  yield takeLatest(GET_ALL_DASHBOARD, getDashboardSaga)
}
