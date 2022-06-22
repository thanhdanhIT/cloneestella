import { all } from "redux-saga/effects"
import SLoginRequest from "../../page/Login/store/saga"
import * as systemServiceSagas from "../../page/SystemService/stores/sagas"
import * as newsSagas from "../../page/News/stores/sagas"
import * as userSaga from "../../page/Users/store/sagas"
import * as listbookingSagas from "../../page/ListBooking/stores/saga"
import * as dashboardSagas from "../../page/Dashboard/stores/saga"
import * as formOnlineSagas from "../../page/FormOnline/stores/sagas"
import * as listMyFeedbackSaga from "../../page/FeedBacks/stores/sagas"
export default function* () {
  yield all([
    SLoginRequest(),
    systemServiceSagas.listSystemService(),
    newsSagas.listMyNews(),
    userSaga.listMyUsers(),
    listbookingSagas.listBookingService(),
    dashboardSagas.listDashboard(),
    formOnlineSagas.listMyFormOnline(),
    listMyFeedbackSaga.listMyFeedback()
  ])
}
