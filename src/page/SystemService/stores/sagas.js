import { takeLatest, put, call, all } from "redux-saga/effects"
import {
  GET_ALL_SYSTEM,
  CREATE_NEW_SERVICE,
  DELETE_NEW_SERVICE
} from "./contans"
import {
  getListServiceSystem,
  createNewServiceSystem,
  deleteNewServiceSystem
} from "../../../services/systemService"
import { saveAllSystemService, setLoading } from "./actions"

function* getListAllServiceSystem({ payload }) {
  try {
    yield put(setLoading(true))
    const respone = yield call(getListServiceSystem, payload)
    // console.log(respone.result)
    yield all([
      put(setLoading(false)),
      put(saveAllSystemService(respone.result))
    ])
  } catch (error) {
    console.log(error)
    yield put(setLoading(false))
  }
}

function* createNewServiceSaga({ payload, resolve }) {
  try {
    yield put(setLoading(true))
    const respone = yield call(createNewServiceSystem, payload.values)
    // console.log(respone)
    resolve(respone.code)
    yield put(setLoading(false))
  } catch (error) {
    resolve(false)
    yield put(setLoading(false))
  }
}

function* deleteNewServiceSaga({ payload, resolve }) {
  try {
    yield put(setLoading(true))
    const respone = yield call(deleteNewServiceSystem, payload)
    resolve(respone.code)
    yield put(setLoading(false))
  } catch (error) {
    resolve(false)
    yield put(setLoading(false))
  }
}
export function* listSystemService() {
  yield takeLatest(GET_ALL_SYSTEM, getListAllServiceSystem)
  yield takeLatest(CREATE_NEW_SERVICE, createNewServiceSaga)
  yield takeLatest(DELETE_NEW_SERVICE, deleteNewServiceSaga)
}
