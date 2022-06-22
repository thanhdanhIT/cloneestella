import React, { useEffect, useState } from "react"
import { Routes, Route, Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "antd/dist/antd.css"
import {
  Layout,
  Menu,
  Space,
  Avatar,
  Button,
  Popover,
  Dropdown,
  Input,
  Form,
  Modal
} from "antd"
import { getCookie } from "../../utils/request"
import { selectUserInfo } from "../Login/store/selector"
import { IoEarthOutline } from "react-icons/io5"
import { withTranslation, useTranslation } from "react-i18next"
import i18next from "i18next"
import routes from "../../routers"
import "./Admin.scss"
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CoffeeOutlined,
  DashboardOutlined,
  AuditOutlined,
  FormOutlined,
  FrownOutlined,
  UserOutlined,
  TableOutlined,
  SettingOutlined,
  ApiOutlined
} from "@ant-design/icons"
import { createStructuredSelector } from "reselect"
import { compose } from "recompose"
import { connect } from "react-redux"

const { Content, Footer, Sider, Header } = Layout
const Admin = props => {
  const { t } = useTranslation()
  const { i18n } = useTranslation()
  const navigate = useNavigate()
  useEffect(() => {
    const user = getCookie("token")
    if (user !== props.selectUserInfo.token) {
      navigate("/login")
    }
  }, [])
  const [collapsed, setCollapsed] = useState(false)
  function getItem(label, key, icon, items) {
    return {
      key,
      icon,
      items,
      label
    }
  }

  const items = [
    getItem(t("dashboard"), "./dashboard", <DashboardOutlined />),
    getItem(t("userManagement"), "./users", <UserOutlined />),
    getItem(t("news"), "./news", <CoffeeOutlined />),
    getItem(t("feedbacks"), "./feedbacks", <AuditOutlined />),
    getItem(t("formOnline"), "./form-online", <FormOutlined />),
    getItem(t("servicesManagement"), "./services", <FrownOutlined />, [
      getItem(t("listBookingService"), "/booking", <TableOutlined />),
      getItem(t("systemService"), "/system", <SettingOutlined />)
    ]),
    getItem(t("configuration"), "./config", <ApiOutlined />)
  ]

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    window.location.href = "/login"
  }

  const handleChangePassword = () => {
    setIsModalVisible(true)
  }

  const content = (
    <div className="flex flex-col gap-2">
      <Button onClick={handleLogout}>{t("Logout")}</Button>
      <Button onClick={handleChangePassword}>{t("changePassword")}</Button>
    </div>
  )

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [formModal] = Form.useForm()
  const openModal = id => {
    setIsModalVisible(true)
  }
  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo)
  }
  const handleCancel = () => {
    formModal.resetFields()
    setIsModalVisible(false)
  }
  const onFinish = async values => {}

  const showContentMenu = routes => {
    let result = []
    if (routes) {
      routes.map(item => {
        if (item.Routes) {
          result = item.Routes.map((route, index1) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={route.component()}
              />
            )
          })
        }
      })
    }
    return result
  }

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: <a onClick={() => changeLanguage("en")}>en English</a>
        },
        {
          key: "2",
          label: <a onClick={() => changeLanguage("vi")}>vi Vietnamese</a>
        }
      ]}
    />
  )
  const changeLanguage = lang => {
    i18next.changeLanguage(lang)
  }
  return (
    <div>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          width={256}
          className="site-layout-background"
          collapsible
          collapsed={collapsed}
          onCollapse={value => setCollapsed(value)}
          theme="light"
        >
          <a className="logo" href="/">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKoAAACqCAIAAACyFEPVAAAACXBIWXMAAAsTAAALEwEAmpwYAAAMQklEQVR4nO2d7W8Uxx2A12sToAlUqamitmRndmYdooBf8N3ZwYaSYjfEpqlagiPSYOdTv7R/QKGtCgFKA1KrhjOG2Hfn8yshJGoTRKR+qtQvTQwoxjRJFQw+n40xmNfQF/VDpc7M7tmmtm/38O76jvlJj1Znczc7M8/8ZgffvCh5QQpIi7LgOQAWENAvNaBfakC/1IB+qQH9UgP6pQb0Sw3olxrQLzWgX2pAv9SAfqkB/VID+qUG9EsN6Jca0C81oF9qQL/UgH6pAf1SA/qlBvRLDeiXGtAvNRnoV0MkP0jzQwwirjkAy7MaoAybovGrkRckGRQtmLqFl3rU4OQdDYcZsz4YcJQxp/p5WuVUKS1SSg2llIirCc1KzIwRpYzkMfdcP0lbOsILGKJKmYMSlQnM12uNvJDhVQsImXWeWT2zj6Ras+GafiVAv1pFV9VSo4bQTdTYRIoYNQz2G08omh8sn6tqyJPP6Tz0A/YVoYYMVnErN+pP1TpN/+lasnIjUQJ6vjdxz+p8WSV9qkZntc0rZNPkreeoK+FlaQXLEmvNJH2Lz0A/61KUYvryq/pgRDvfgs+3oIEWbeAovnAUXeBX/DcPuDA/PmnBl9pw7z5UUG7k2fWEapB3rUqJEd+Nh2O4/whKk7IoOD7XgpNxdOznSFljTHa5LlIg8lP7Evl7mz5wFA2k7jtXbQ+04M+OsVKj0heIUsI+zp56RS7qJ42N+s1uNBxFI4wYHs1uWD5vdaHTb+BFATMa0rlXreom7+3X7/WgRMQ+/aEo/sfbWu/rWOi3j7MH0V9s1Dfg652stvXRGEqfn5EovtqOEzEUqGf6DYeDkgyiv7GRcP3mzbKeRBTf6MZM/+IA70XT1UXAGmGxJn5yL9OPhyIO0o/gfx7HvXt0ZQ1X5bp+szfa0kAmuH6ctMtPUuhnjTJYr7MPFgTtB7yZ6d/RSK53IVY1w9Ec4HKExQ0+9Rum37DRH5zUT9/Zq9/p5k8N2/TZe+714p7dnuqndQ1kvIPfLmGXH7PHYrkK1Om88w8SJ4P/TPXz9rXgah3qZ3Fzykn0i0BhwzdWxpP7MtD/paXfk2d/fgWP/nquH2Win3X+Ohv/FwTd7vxzTj97avLoL7fRrwr94llL392fof49Huvflql+jesvkV7/0FTnbx/9+anoNzv/y847f++e/RU8P6DfL/2h7NNfQjPv/DXo/EE/6Af9oB/0S6rf+cgf9D/M+h8B/TLrh+iXU7/Onv0fgP6F0I8EC6vfjH4EQz9f9SeEe3Hlw++FYrANj8fR++zZz/QHbSbkgH4X9ZstgF+vxNF4B77agcc78bh59YWrnfhKXL/Xi/50CIZ+vus3oz8R0wZa0MdhvS+M+5p1f8EfHcafHtPiu/EiHv1O/+b/h19n+IUv6J+j/9eS7fg7W4iy2vhKkC4J+A9ZGqSLxdfeeUGiONP//gEM+uenP4ISES0ZxSNxvGGLrqymaoh3v77DZ3mktz5Tf0bf94P+2fORiCBT/7e/R5Rig5XE9dpxua7h2e+efmTqH+X6ddAvm34M+kE/6Af9oB/0g37Qn9WAftAP+kE/6Af9oB/0g37QD/pBP+gH/aAf9IN+0A/6QT/oB/2gH/SDftAP+mfoH4njjS+KTcYq+WxP/+BbdGZQ0eo89HeLrZ0KKsRNXaVgamsnnFP6+dXUjyqfJ4pB1RLK6sg/Vhus4pxsaTpdv7m1U6Y7e3Xtxsoqoq41xEa/hrXd77wwzH2F1bVUedqo3UrHO/ThqJ5L+hMiNyMx7Sc/1qu/rz/foNdu8wFcu43UbCWbG/CzL5JHQtR2L9f7oj9o7ex117H+O93o3X348ZDxrQ30m+vpN1zCTGrlBvp4iLzyI/1Kh8Z6U9s1k1mlX6zxi2jjHU/e7EY3uxC73jJfeAtf1vmfE+jPv0PLKwyl3OlT4AE6f4F2qQ190oL7+T7HnH43OG9dUf8R9NkxvmIiEdVsM5Mt+kU71YatZX7aUARdjqKhSSKewdPHl1rxRAc+fRA9yp6dXuo3W3kyisbatbF2ZHLFDcx0RmM85ZEY4jeK2S+Xzhb9ZugL7AcsLhNDrPwTHej0QfyYx/onC5taU8ybYGLeTKbDwyYilkyJmswZ/akOwF/xFjqrtYlO/CHTH/JDv5dMe95Hcif6F5ahiM70nz6Ecl9/ZoB+Dt/JuQt9eIhFvw9DvywC9IN+6fWL3RyFfl+GftkD6Af9oB/0g37QD/pBv8z6YeQvp/4J0C+zfh79B9FjIQL6ZdQ/YemHZ/+C6be+omD1eMlfLrbi8Tg+9YYvQz8+rc3DbYkvi/RzT38iopkTfm50oS970N0ezR/udKMb3dp/T2p/+T1e5r1+c0rj1TjiiK2LXWHMfBHHY3FtNGY/zSu79E/u6M2qpncP+u3P9PAu/fAu6+op4V348E7c+ku886f6Ur6VqP257fPRn4yhL1pRXzM+14zONmNXQWfD6ONmfKHFrMxcmu3D3oOSEZyM48oXdKXIUEv5x5U1fOayhxTzqbFKcRF/XUbyAhnM9nywmb63e9CJ1/VlZfSJKuPrVXTFOrqiyg3WcZ6opo+WG9u2o7G4eMrkkn4+TQWPtqONYlPXRR7Mg56V/BA/TzU/RFRnhZ+n/ru9WuevsLKKquXEjTm+98HTfIZ8dythTwEn86ayRT+fnCRmpo5YyzyoF9PgZ8XMrRo0495p6M9Dv3WCd74X8/xZfkqN+pfJ1Q5H0+ayRv//r/KhD+sqH8+PcC426raRazm6ykeaRV7e6ad14gjnnI7+h14/rPED/aAf9IN+0A/6QT/oB/2gH/SDftAP+rMZ0A/6QT/oB/2gH/SDftAP+kE/6Af9oB/0g37QD/pBP+gH/aAf9IN+0J9GP8kC/fYT/kG/F/rRc/w4B7qokorFNwuFYVsRoN99/ck4XreZ8DVQZZRlyF+MKUr4Nh/2+sV+/u9lcpwD6J+NiLXIK9mOX9tBVtWQ8npSVpei3i/qqElwCy1cT9O0AHUy+tfQDw7g26B/XtHPr2JhSgRdjKDBNjzYpour31xsRV+04vFObfsOzIcgc0uaiv79EP3z1Y8SEXNNMhqOoZEoz5bPjMT44vuEOODhdjdqasKsKm30w7Pfregf4ogTaCLmuT5Wg/AHc/Ah8oAuRxDL86uvsREoAf0+6bfOprB7p4fwlsdrje/0ZOmH6PdFv8ir0x1pvGYogm50o8Ymsc4c9Pujf+EOc5mpH090ox1Nuv3QD/S7pz9bYPpvgH6Z9U9F/9x/ewb9EuiH6Af9oB/0g37QD/pBP+gH/aBfev0FoN+Rfsc7zGcD9/3ZZ47/96vTvvA19Wf4ha/hmX4jq/Tr1zqRecZAwprVk8WIKmO5vd5lE/3qtM7/xF58uwtfak2fOP9GY7AN3+3BXeaevp7pr2sgY3FxqrtdhbOGPhLVB9tQoI6wbsN9/U1N+t1exJrYWDsDXWHELcZmI/2/egq/aTuDB8S941pTU7qtha0tlHn0kz8ewP86jpKxVCIzijP5YzKG//0OensvVp7xrPMvJlsayK1uUdupu8+sUvPH0XZ0rQONtKNQvfX1phpwVf9Lr+gXjml9h/WzR/RzzUicYZC98Owd0fvC+NO3tB9sJ+m/8FXN6C+hb/0Cf96KPnpTOxPW5kw8jM6FUV8Yfd6qvbkT8y3LPdDPxyIlxqYfkv5j2plUifrCc2bsTBj1H9H+ehiVbia883eWJUf6+fsCZEmlXlhtFFbrhevZla6oIlMnEFTPRpp/8hTrvkTkk6yoNpawSJp7ure1h3rIYI1g+Tr2flpYxZmZ/2m/JAK6/FkjjwVZyOmxIc5Rg0QJ0sUVRmEVg/Danp6x+8tr/b6afq2KPhIieQGiOtvP3ql+0QKoUk4U8+iCtYaylmYxhpVDM8Npu0E1aKSOA+Bnv01LYe70y1PvKTdERbuvn5HPUuZ1bkzLlW2pRYl4ed3Wz6qJZSifVVaI5g58xCcEz2mIVRaHl46P/x0law4YRYxmdGxIJrVtwueo8Z7JcZGnl8tN/dMwPGrvrmJM5tPmbJcAD7K8oP1qkNkg064eleIBS+2EB9MPPCSAfqkB/VID+qUG9EsN6Jca0C81oF9qQL/UgH6pAf1SA/qlBvRLDeiXGtAvNaBfakC/1IB+qQH9UgP6pQb0Sw3olxrQLzWgX2r+B/qD3yv/gcdcAAAAAElFTkSuQmCC"
              alt="logo"
            />
            {!collapsed ? <h1>Estella Heights</h1> : ""}
          </a>
          <Menu
            mode="inline"
            defaultSelectedKeys={["./dashboard"]}
            defaultOpenKeys={["sub1"]}
            style={{ borderRight: 0 }}
            className="border-r-0"
          >
            {items.map(item => {
              return !item.items ? (
                <Menu.Item key={item.key}>
                  <Link to={item.key} className="nav-text">
                    <div className="flex items-center">
                      {item.icon}
                      <span className=" text-slate-700">
                        {!collapsed ? item.label : ""}
                      </span>
                    </div>
                  </Link>
                </Menu.Item>
              ) : (
                <Menu.SubMenu
                  key={item.key}
                  title={
                    <div className="flex items-center">
                      {item.icon}
                      <span className=" text-slate-700">
                        {!collapsed ? item.label : ""}
                      </span>
                    </div>
                  }
                >
                  {item.items.map(child => {
                    return (
                      <Menu.Item key={child.key}>
                        <Link
                          to={`${item.key}${child.key}`}
                          className="nav-text"
                        >
                          <div className="flex items-center ">
                            {child.icon}
                            <span className=" text-slate-700">
                              {child.label}
                            </span>
                          </div>
                        </Link>
                      </Menu.Item>
                    )
                  })}
                </Menu.SubMenu>
              )
            })}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background flex justify-between shadow-lgl"
            style={{ padding: 0, backgroundColor: "" }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger collap",
                onClick: () => setCollapsed(!collapsed)
              }
            )}
            <div className="flex items-center">
              <Popover content={content}>
                <div className="mr-[20px]">
                  <Avatar
                    style={{ backgroundColor: "#87d068" }}
                    icon={<UserOutlined />}
                  />
                  <span className="ml-[8px]">
                    {props.selectUserInfo.username}
                  </span>
                </div>
              </Popover>
              <Dropdown overlay={menu} placement="bottomRight">
                <IoEarthOutline className="text-xl mr-4" />
              </Dropdown>
            </div>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280
            }}
          >
            <Routes>{showContentMenu(routes)}</Routes>
            <Modal
              title="Add new user"
              visible={isModalVisible}
              onCancel={handleCancel}
              footer={null}
            >
              <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="on"
                form={formModal}
                name="Change Password"
              >
                <Form.Item
                  label="Old password"
                  name="oldPassword"
                  rules={[
                    { required: true, message: "Please input your Full name!" }
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="New Password"
                  name="newPassword"
                  rules={[
                    { required: true, message: "Please input your Full name!" }
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Re-enter Password"
                  name="Rpassword"
                  rules={[
                    { required: true, message: "Please input your Full name!" }
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    <span className="text-white">Submit</span>
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({})

const mapStateToProps = createStructuredSelector({
  selectUserInfo: selectUserInfo
})
const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withConnect)(Admin)
