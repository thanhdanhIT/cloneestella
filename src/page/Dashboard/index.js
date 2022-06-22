import React, { useEffect, useState } from "react"
import { Card, Col, Row, Switch, Avatar, Skeleton } from "antd"
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined
} from "@ant-design/icons"
import { createStructuredSelector } from "reselect"
import { connect } from "react-redux"
import { compose } from "recompose"
// import "./index.css"
import { selectLoading, selectListDashboard } from "./stores/selector"
import { getAllDashboard } from "./stores/action"
// import { render } from "@testing-library/react"
const { Meta } = Card
const Dashboard = props => {
  const { listDashboard, isloading } = props
  const { getDashboard } = props
  const [loading, setLoading] = useState(false)

  const onChange = checked => {
    setLoading(!checked)
  }

  useEffect(() => {
    getDashboard()
  }, [])

  return (
    <div className="ant-pro-grid-content">
      <Row gutter={16}>
        <Col span={8}>
          <Card title={`Unreplied Bookings: ${listDashboard.bookingRemand}`}>
            Total bookings : {listDashboard.bookingTotal}
          </Card>
        </Col>
        <Col span={8}>
          <Card title={`Unreplied Feedbacks: ${listDashboard.feedbackRemand}`}>
            Total feedbacks : {listDashboard.feedbackTotal}
          </Card>
        </Col>
        <Col span={8}>
          <Card title={`Unreplied Forms: ${listDashboard.formRemand}`}>
            Total forms : {listDashboard.formTotal}
          </Card>
        </Col>
      </Row>

      <div style={{ marginTop: "3rem" }} className="ant-row">
        <div className="ant-col ant-col-24">
          <div className="card_head">
            <Card type="inner" title="New feedbacks">
              <Switch checked={!loading} onChange={onChange} />
              {listDashboard?.feedbacks?.map((item, index) => {
                return (
                  <Card
                    key={index}
                    style={{
                      marginTop: 16
                    }}
                    actions={[
                      <SettingOutlined key="setting" />,
                      <EditOutlined key="edit" />,
                      <EllipsisOutlined key="ellipsis" />
                    ]}
                  >
                    <Skeleton loading={loading} avatar active>
                      <Meta
                        avatar={
                          <Avatar src="https://joeschmoe.io/api/v1/random" />
                        }
                        title={`Title: ${item.title}`}
                        description={`By: ${item.createdBy}`}
                      />
                    </Skeleton>
                  </Card>
                )
              })}

              {/* <Card
                style={{
                  marginTop: 16
                }}
                actions={[
                  <SettingOutlined key="setting" />,
                  <EditOutlined key="edit" />,
                  <EllipsisOutlined key="ellipsis" />
                ]}
              >
                <Skeleton loading={loading} avatar active>
                  <Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title="Card title"
                    description="This is the description"
                  />
                </Skeleton>
              </Card>

              <Card
                style={{
                  marginTop: 16
                }}
                actions={[
                  <SettingOutlined key="setting" />,
                  <EditOutlined key="edit" />,
                  <EllipsisOutlined key="ellipsis" />
                ]}
              >
                <Skeleton loading={loading} avatar active>
                  <Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title="Card title"
                    description="This is the description"
                  />
                </Skeleton>
              </Card>

              <Card
                style={{
                  marginTop: 16
                }}
                actions={[
                  <SettingOutlined key="setting" />,
                  <EditOutlined key="edit" />,
                  <EllipsisOutlined key="ellipsis" />
                ]}
              >
                <Skeleton loading={loading} avatar active>
                  <Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title="Card title"
                    description="This is the description"
                  />
                </Skeleton>
              </Card> */}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  listDashboard: selectListDashboard,
  isloading: selectLoading
})

const mapDispatchToProps = dispatch => ({
  getDashboard: payload => dispatch(getAllDashboard(payload))
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withConnect)(Dashboard)
