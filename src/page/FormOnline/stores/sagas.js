import { saveAllListForm, setLoading, saveAllUserProfile } from "./actions"
import { takeLatest, put, call, all } from "redux-saga/effects"
import {
  getListFormService,
  getListUserProfile
} from "../../../services/formServices.js"
import { GET_ALL_FORM, GET_ALL_PROFILE } from "./constants"
function* getListFormOnlineSaga({ payload }) {
  try {
    console.log(payload)
    yield put(setLoading(true))
    const respone = yield call(getListFormService, payload)
    yield all([
      put(setLoading(false)),
      put(saveAllListForm(respone.result.data))
    ])
  } catch (error) {
    console.log(error)
    yield put(setLoading(false))
  }
}

function* getListUserProfileSaga({ payload }) {
  try {
    console.log(payload)
    yield put(setLoading(true))
    const respone = yield call(getListUserProfile, payload)
    yield all([put(setLoading(false)), put(saveAllUserProfile(respone.result))])
  } catch (error) {
    console.log(error)
    yield put(setLoading(false))
  }
}
export function* listMyFormOnline() {
  yield takeLatest(GET_ALL_FORM, getListFormOnlineSaga)
  yield takeLatest(GET_ALL_PROFILE, getListUserProfileSaga)
}
