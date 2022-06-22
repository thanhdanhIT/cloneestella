import React, { useEffect, useState } from "react"
import { Routes, Route, Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "antd/dist/antd.css"
import { Layout, Menu, Space, Avatar, Button, Popover, Dropdown } from "antd"
import { getCookie } from "../../utils/request"
import { selectUserInfo } from "../../page/Login/store/selector"
import routes from "../../routers"
import "./default.scss"

import { createStructuredSelector } from "reselect"
import { compose } from "recompose"
import { connect } from "react-redux"
import { withTranslation, useTranslation } from "react-i18next"
import i18next from "i18next"

const DefaultLayout = props => {
  const { t } = props
  const { i18n } = useTranslation()

  const navigate = useNavigate()
  useEffect(() => {
    const user = getCookie("token")
    if (!user) {
      navigate("/login")
    }
  }, [])
  const showContentMenu = routes => {
    let result = null
    if (routes) {
      result = routes.map((item, index) => {
        return <Route key={index} path={item.path} element={item.component()} />
      })
    }
    return result
  }

  return (
    <div>
      <Routes>{showContentMenu(routes)}</Routes>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({})

const mapStateToProps = createStructuredSelector({
  selectUserInfo: selectUserInfo
})
const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withConnect)(DefaultLayout)
