import { takeLatest, put, call, all } from "redux-saga/effects"
import { GET_ALL_BOOKING } from "./contant"
import { getListBooking } from "../../../services/systemService"
import { saveAllListBooking, setLoading } from "./action"

function* getListBookingSaga({ payload }) {
  try {
    yield put(setLoading(true))
    const respone = yield call(getListBooking, payload)
    // console.log(respone.result.data)
    yield all([
      put(setLoading(false)),
      put(saveAllListBooking(respone.result.data))
    ])
  } catch (error) {
    console.log(error)
    yield put(setLoading(false))
  }
}

export function* listBookingService() {
  yield takeLatest(GET_ALL_BOOKING, getListBookingSaga)
}
