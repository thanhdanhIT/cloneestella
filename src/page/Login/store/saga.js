import {
  takeLatest,
  take,
  fork,
  call,
  all,
  StrictEffect,
  put,
  delay
} from "redux-saga/effects"
import { LOGIN_REQUEST } from "./constants"
import { saveInfoLogin, fetchLoginFailure, setLoading } from "./actions"
import { loginRequestServices } from "../../../services/loginServices"
import { notification } from "antd"
import { SmileOutlined } from "@ant-design/icons"
function* loginRequestSaga({ payload }) {
  const { username, password } = payload
  try {
    yield put(setLoading(true))
    const res = yield call(loginRequestServices, { username, password })
    if (res) {
      yield all([put(setLoading(false)), put(saveInfoLogin(res.result))])
      notification.open({
        message: "Login",
        description: "Login Success",
        icon: <SmileOutlined style={{ color: "green" }} />
      })
      payload.navigate("/admin/dashboard")
    } else {
      notification.open({
        message: "Login",
        description: "Login Failed",
        icon: <SmileOutlined style={{ color: "red" }} />
      })
      yield all([put(setLoading(false)), put(fetchLoginFailure("incorrect"))])
    }
  } catch (error) {
    notification.open({
      message: "Login",
      description: "Login Failed",
      icon: <SmileOutlined style={{ color: "red" }} />
    })
    yield all([put(setLoading(false)), put(fetchLoginFailure(error))])
  }
}

export default function* SLoginRequest() {
  yield takeLatest(LOGIN_REQUEST, loginRequestSaga)
}
