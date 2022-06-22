import request from "../utils/request"
const BASE_URL = "https://quanlycudan.azurewebsites.net/api"
export function feedBackRequestServices(payload) {
  return request(`${BASE_URL}/Feedback/get-all`, {
    method: "POST",
    data: payload
  })
}
export function feedBackDelete(payload) {
  return request(`${BASE_URL}/Feedback/delete/${payload}`, {
    method: "POST",
    data: payload
  })
}
export function feedBackDetail(payload) {
  return request(`${BASE_URL}/Feedback/get-detail/${payload}`, {
    method: "POST",
    data: payload
  })
}

