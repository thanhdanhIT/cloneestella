import React, { useEffect } from "react"
import DefaultLayout from "./common/DefaultLayout"
import Admin from "./page/Admin"
import { Routes, Route } from "react-router-dom"
import Login from "./page/Login"
function App() {
  useEffect(() => {}, [])
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<DefaultLayout />} />
      </Routes>
    </div>
  )
}

export default App
