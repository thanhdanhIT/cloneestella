import axios from "axios"

const request = axios.create({
  timeout: 60000,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    Accept: "application/json"
  }
})

const HandleError = error => {
  const { response = {} } = error
  const { data, status, statusText } = response
  return { data, status, statusText }
}

export const getCookie = cName => {
  let name = cName + "="
  let decodedCookie = decodeURIComponent(document.cookie)
  let ca = decodedCookie.split(";")
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === " ") {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ""
}

request.interceptors.request.use(config => {
  const token = getCookie("token")
  config.headers.Authorization = `Bearer ${token}`
  return config
})

request.interceptors.response.use(response => {
  return response.data
}, HandleError)

export default request
