import request from "../utils/request"
const BASE_API = "https://quanlycudan.azurewebsites.net"
export function getListFormService(payload) {
  return request(`${BASE_API}/api/Forms/get-all/${payload.url}`, {
    method: "POST",
    data: payload.params
  })
}
export function getListUserProfile(payload) {
  return request(`${BASE_API}/api/Users/get-profile`, {
    method: "POST",
    data: payload
  })
}
