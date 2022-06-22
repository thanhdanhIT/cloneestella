import { takeLatest, put, call, all } from "redux-saga/effects"
import {
  SET_LOADING,
  GET_ALL_FEEDBACK,
  DELETE_FEEDBACK,
  GET_ID_FEEDBACK
} from "./constants"
import {
  feedBackRequestServices,
  feedBackDelete,
  feedBackDetail
} from "../../../services/feedBackServices"
import { saveAllFeedback, setLoading } from "./actions"
function* getListFeedBack({ payload }) {
  try {
    yield put(setLoading(true))
    const respone = yield call(feedBackRequestServices, payload)
    yield all([put(setLoading(false)), put(saveAllFeedback(respone.result))])
  } catch (error) {
    yield put(setLoading(false))
  }
}

function* deleteFeedbackSaga({ payload, resolve }) {
  try {
    yield put(setLoading(true))
    const respone = yield call(feedBackDelete, payload)
    resolve(respone)
    yield put(setLoading(false))
  } catch (error) {
    resolve(false)
    yield put(setLoading(false))
  }
}

function* getFeedBackDetail({ payload, resolve }) {
  try {
    yield put(setLoading(true))
    const respone = yield call(feedBackDetail, payload)
    resolve(respone)
    yield put(setLoading(false))
  } catch (error) {
    console.log(error)
    resolve(false)
    yield put(setLoading(false))
  }
}
export function* listMyFeedback() {
  yield takeLatest(GET_ALL_FEEDBACK, getListFeedBack)
  // yield takeLatest(CREATE_NEWS, createNewsService)
  // yield takeLatest(UPDATE_NEWS, updateNewsService)
  yield takeLatest(DELETE_FEEDBACK, deleteFeedbackSaga)
  yield takeLatest(GET_ID_FEEDBACK, getFeedBackDetail)
}
