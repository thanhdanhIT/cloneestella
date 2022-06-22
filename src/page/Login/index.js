import React, { useEffect } from "react"
import { Form, Input, Button, Checkbox, notification, Tabs, Spin } from "antd"
import { SmileOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import "./Login.scss"
import { createStructuredSelector } from "reselect"
import { connect } from "react-redux"
import { compose } from "recompose"
import { selectUserInfo, selectLoading } from "./store/selector"
import { loginRequest } from "./store/actions"
import { useDispatch } from "react-redux"
const Login = props => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { TabPane } = Tabs
  useEffect(() => {}, [])
  const onFinish = async values => {
    const { username, password } = values
    dispatch(props.loginRequest({ username, password, navigate }))
  }

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo)
  }
  return props.selectLoading ? (
    <Spin size="large" />
  ) : (
    <div className="bg-login justify-center items-center">
      <div className="login h-screen justify-center absolute top-[-100px]">
        <div className="group-login-title">
          <h1 className="login-title">Estella Heights</h1>
          <p className="login-title-des">Estella Heights - A class beyond</p>
        </div>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Authenticate Page" key="1">
            <Form
              name="basic"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 19 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                  {
                    pattern: new RegExp(/[a-zA-Z]/g),
                    message: "Please enter a valid username"
                  }
                ]}
                hasFeedback
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" }
                ]}
                className=""
                hasFeedback
              >
                <Input.Password className="" />
              </Form.Item>
              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 0, span: 16 }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 0, span: 26 }}>
                <Button type="primary" htmlType="submit" block>
                  <span className="text-white">Login</span>
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  loginRequest: payload => loginRequest(payload)
})

const mapStateToProps = createStructuredSelector({
  selectLoading: selectLoading,
  selectUserInfo: selectUserInfo
})
const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withConnect)(Login)
