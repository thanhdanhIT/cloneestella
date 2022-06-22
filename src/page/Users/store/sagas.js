import { takeLatest, put, call, all } from "redux-saga/effects"
import {
  CREATE_USERS,
  DELETE_USERS,
  GET_ALL_USERS,
  GET_DETAIL_USERS,
  UPDATE_USERS
} from "./constants"
import {
  usersCreate,
  usersRequestServices,
  usersDelete,
  usersDetail,
  usersUpdate
} from "../../../services/userServices"
import { saveAllUsers, setLoading } from "./actions"
function* getListUsersSaga({ payload }) {
  try {
    yield put(setLoading(true))
    const response = yield call(usersRequestServices, payload)
    yield all([put(setLoading(false)), put(saveAllUsers(response.result))])
  } catch (error) {
    yield put(setLoading(false))
  }
}

function* createUsersService({ payload, resolve }) {
  try {
    yield put(setLoading(true))
    const response = yield call(usersCreate, payload)
    resolve(response)
    yield put(setLoading(false))
  } catch (error) {
    resolve(false)
    yield put(setLoading(false))
  }
}

function* deleteUsersSaga({ payload, resolve }) {
  try {
    yield put(setLoading(true))
    const response = yield call(usersDelete, payload)
    resolve(response)
    yield put(setLoading(false))
  } catch (error) {
    resolve(false)
    yield put(setLoading(false))
  }
}

function* updateUsersService({ payload, resolve }) {
  try {
    yield put(setLoading(true))
    const respone = yield call(usersUpdate, payload)
    resolve(respone)
    yield put(setLoading(false))
  } catch (error) {
    console.log(error)
    resolve(error)
    yield put(setLoading(false))
  }
}
function* getDetailUsers({ payload, resolve }) {
  try {
    yield put(setLoading(true))
    const response = yield call(usersDetail, { username: payload })
    resolve(response)
    yield put(setLoading(false))
  } catch (error) {
    resolve(false)
    yield put(setLoading(false))
  }
}
export function* listMyUsers() {
  yield takeLatest(GET_ALL_USERS, getListUsersSaga)
  yield takeLatest(CREATE_USERS, createUsersService)
  yield takeLatest(UPDATE_USERS, updateUsersService)
  yield takeLatest(DELETE_USERS, deleteUsersSaga)
  yield takeLatest(GET_DETAIL_USERS, getDetailUsers)
}
