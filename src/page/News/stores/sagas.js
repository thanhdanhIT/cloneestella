import { takeLatest, put, call, all } from "redux-saga/effects"
import {
  CREATE_NEWS,
  DELETE_NEWS,
  GET_ALL_NEWS,
  GET_ID_NEWS,
  UPDATE_NEWS
} from "./constants"
import {
  createNews,
  deleteNews,
  getListNews,
  updateNews
} from "../../../services/systemService"
import { saveAllNews, setLoading } from "./actions"
function* getListNewss({ payload }) {
  try {
    yield put(setLoading(true))
    const respone = yield call(getListNews, payload)
    yield all([put(setLoading(false)), put(saveAllNews(respone.result))])
  } catch (error) {
    yield put(setLoading(false))
  }
}

function* createNewsService({ payload, resolve }) {
  try {
    yield put(setLoading(true))
    const respone = yield call(createNews, payload)
    resolve(respone.status)
    yield put(setLoading(false))
  } catch (error) {
    resolve(false)
    yield put(setLoading(false))
  }
}

function* deleteNewsSaga({ payload, resolve }) {
  try {
    yield put(setLoading(true))
    const respone = yield call(deleteNews, payload)
    console.log(respone)
    resolve(respone)
    yield put(setLoading(false))
  } catch (error) {
    resolve(false)
    yield put(setLoading(false))
  }
}

function* updateNewsService({ payload, resolve }) {
  try {
    yield put(setLoading(true))
    console.log(payload)
    const respone = yield call(updateNews, payload)
    console.log(respone.data)
    resolve(respone.data)
    yield put(setLoading(false))
  } catch (error) {
    console.log(error)
    resolve(error)
    yield put(setLoading(false))
  }
}
function* getIdNews({ payload, resolve }) {
  try {
    yield put(setLoading(true))
    const respone = yield call(getIdNews, payload)
    console.log(respone)
    resolve(respone.data)
    yield put(setLoading(false))
  } catch (error) {
    console.log(error)
    resolve(false)
    yield put(setLoading(false))
  }
}
export function* listMyNews() {
  yield takeLatest(GET_ALL_NEWS, getListNewss)
  yield takeLatest(CREATE_NEWS, createNewsService)
  yield takeLatest(UPDATE_NEWS, updateNewsService)
  yield takeLatest(DELETE_NEWS, deleteNewsSaga)
  yield takeLatest(GET_ID_NEWS, getIdNews)
}
