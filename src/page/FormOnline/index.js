import React, { useEffect, useState } from "react"
import { Input, Table, Tabs, Tag, Space, DatePicker } from "antd"
import { createStructuredSelector } from "reselect"
import { connect } from "react-redux"
import { compose } from "recompose"
import { selectListFormOnlineService, selectLoading } from "./stores/selector"
import { getAllListForm, getAllUserProfile } from "./stores/actions"
import "./index.scss"
const { TabPane } = Tabs
const FormOnline = props => {
  const { isloading, listFormOnlines } = props
  const { getAllFormOnlines, getALLProfiles } = props
  const { Search } = Input
  const [valueSearch, setvalueSearch] = useState("")
  const onChange = key => {
    console.log(key)
    const payload = {
      url: key,
      params
    }
    getAllFormOnlines(payload)
  }
  const onSearch = () => {
    console.log(valueSearch)
    // getListAllNewss(valueSearch)
  }
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title - b.title
    },
    {
      title: "Form Type",
      dataIndex: "formType",
      key: "formType",
      sorter: (a, b) => a.formType - b.formType,
      render: (text, record) =>
        record.formType === "MOVEIN" ? (
          <Tag color="green"> {record.formType.toUpperCase()}</Tag>
        ) : (
          <Tag color="red"> {record.formType.toUpperCase()}</Tag>
        )
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status - b.status,
      render: (text, record) =>
        record.status === "APPROVED" ? (
          <Tag color="green"> {record.status.toUpperCase()}</Tag>
        ) : (
          <Tag color="red"> {record.status.toUpperCase()}</Tag>
        )
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: {
        compare: (a, b) => Date(a.createdAt) - Date(b.createdAt),
        multiple: 3
      }
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
      sorter: {
        compare: (a, b) => Date(a.createdBy) - Date(b.createdBy),
        multiple: 3
      }
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space>
          {/* <Popconfirm
            title="Are you want delete?"
            onConfirm={() => handleDelete(record.id)}
          > */}
          <a>Delete</a>
          {/* </Popconfirm> */}
        </Space>
      )
    }
  ]
  const [params, setParams] = useState({
    search: valueSearch || "",
    startAt: null,
    endAt: null,
    paging: {
      pageIndex: 1,
      pageSize: 10
    },
    sorting: {
      field: "createAt",
      order: "desc"
    }
  })
  useEffect(() => {
    getALLProfiles({ username: "admineh" })
    const payload = {
      url: "ALL",
      params
    }
    getAllFormOnlines(payload)
  }, [])
  return (
    <>
      <span>Home </span>/ <b>Form</b>
      <h1>Form Online Management</h1>
      <div className="antd-pro">
        <Search
          placeholder="input search by title"
          value={valueSearch}
          onChange={e => setvalueSearch(e.target.value)}
          style={{
            width: 500
          }}
          onSearch={onSearch}
          enterButton
        />
        <div className="dateTime">
          Filler : &nbsp;
          <DatePicker.RangePicker />
        </div>
      </div>
      <Tabs defaultActiveKey="ALL" onChange={onChange}>
        <TabPane tab="All" key="ALL"></TabPane>
        <TabPane tab="Work Licence" key="Fixing"></TabPane>
        <TabPane tab="Move In" key="MoveIn"></TabPane>
        <TabPane tab="Move Out" key="MoveOut"></TabPane>
        <TabPane tab="Requirement" key="WorkOrder"></TabPane>
      </Tabs>
      <Table
        dataSource={listFormOnlines}
        columns={columns}
        loading={isloading}
      />
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  listFormOnlines: selectListFormOnlineService,
  isloading: selectLoading
})

const mapDispatchToProps = dispatch => ({
  getALLProfiles: payload => dispatch(getAllUserProfile(payload)),
  getAllFormOnlines: payload => dispatch(getAllListForm(payload))
})
const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withConnect)(FormOnline)
