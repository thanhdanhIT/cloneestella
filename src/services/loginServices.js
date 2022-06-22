import request from "../utils/request"
const BASE_URL = "https://quanlycudan.azurewebsites.net/api"
export function loginRequestServices(payload) {
  return request(`${BASE_URL}/users/authenticate`, {
    method: "POST",
    data: payload
  })
}
