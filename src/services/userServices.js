import request from "../utils/request"
const BASE_URL = "https://quanlycudan.azurewebsites.net/api"
export function usersRequestServices(payload) {
  return request(`${BASE_URL}/users/get-all/${payload.rules}`, {
    method: "POST",
    data: payload.params
  })
}
export function usersCreate(payload) {
  return request(`${BASE_URL}/users/create`, {
    method: "POST",
    data: payload
  })
}
export function usersDelete(payload) {
  return request(`${BASE_URL}/users/delete/${payload}`, {
    method: "POST",
    data: payload
  })
}
export function usersDetail(payload) {
  return request(`${BASE_URL}/users/get-profile`, {
    method: "POST",
    data: payload
  })
}

export function usersUpdate(payload) {
  return request(`${BASE_URL}/users/update`, {
    method: "POST",
    data: payload
  })
}
