import request from "../utils/request"

const BASE_API = "https://quanlycudan.azurewebsites.net"

export function getListServiceSystem(payload) {
  return request(`${BASE_API}/api/services/get-all`, {
    method: "POST",
    data: payload
  })
}

export function getListNews(payload) {
  return request(`${BASE_API}/api/News/get-all`, {
    method: "POST",
    data: payload
  })
}
export function getListBooking(payload) {
  return request(`${BASE_API}/api/services/get-all-booking`, {
    method: "POST",
    data: payload
  })
}

export function createNews(params) {
  return request(`${BASE_API}/api/News/create`, {
    method: "POST",
    requestType: "form",
    data: params
  })
}

export function deleteNews(id, payload) {
  return request(`${BASE_API}/api/News/delete/${id}`, {
    method: "POST",
    data: payload
  })
}

export function updateNews(params) {
  return request(`${BASE_API}/api/News/update​/${params.id}`, {
    method: "POST",
    data: params
  })
}

export function getListNewsDetail(id, payload) {
  return request(`${BASE_API}/api/News/get-detail/${id}`, {
    method: "POST",
    data: payload
  })
}
export function getListDashboard(payload) {
  return request(`${BASE_API}/api/residence/get-dashboard`, {
    method: "POST",
    data: payload
  })
}

export function createNewServiceSystem(payload) {
  return request(`${BASE_API}/api/services/create`, {
    method: "POST",
    data: payload
  })
}

export function deleteNewServiceSystem(payload) {
  return request(`${BASE_API}/api/services/delete/${payload}`, {
    method: "POST",
    data: payload
  })
}
