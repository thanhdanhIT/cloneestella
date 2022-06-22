import React, { useEffect, useState } from "react"
import { Table, Input, Space, Tag, DatePicker } from "antd"
import { createStructuredSelector } from "reselect"
import { connect } from "react-redux"
import { compose } from "recompose"
import "./index.scss"
import { selectLoading, selectListBookingService } from "./stores/selector"
import { getAllListBooking } from "./stores/action"
import { withTranslation, useTranslation } from "react-i18next"
import i18next from "i18next"
import DefaultLayout from "../../common/DefaultLayout"
// import { render } from "@testing-library/react"

const { Search } = Input
const ListBookingService = props => {
  const { listBookingService, isloading } = props
  const { getAllListBookings } = props

  // console.log(listBookingService)

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra)
  }

  const columns = [
    {
      title: "Id",
      // dataIndex: "id",
      key: "id",
      render: (text, record, index) => <Space>{index + 1}</Space>
    },
    {
      title: "Service Name",
      dataIndex: "serviceName",
      key: "serviceName"
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
      title: "CreateaBy",
      dataIndex: "createdBy",
      key: "createdBy",
      sorter: {
        compare: (a, b) => Date(a.createdBy) - Date(b.createdBy),
        multiple: 3
      }
    },
    {
      title: "Booking Date",
      dataIndex: "chooseDate",
      key: "chooseDate",
      sorter: {
        compare: (a, b) => Date(a.chooseDate) - Date(b.chooseDate),
        multiple: 3
      },

      align: "center"
    },
    {
      title: "Booking TIme",
      dataIndex: "bookingTime",
      key: "bookingTime",
      sorter: {
        compare: (a, b) => Date(a.bookingTime) - Date(b.bookingTime),
        multiple: 3
      },
      align: "center"
    }
  ]

  useEffect(() => {
    getListBookingService()
  }, [])

  const getListBookingService = valueSearch => {
    const params = {
      search: valueSearch || "",
      startAt: "2020-01-01T07:46:21.543Z",
      endAt: "2022-02-01T07:46:21.543Z",
      paging: {
        pageIndex: 1,
        pageSize: 10
      },
      sorting: {
        field: "chooseDate",
        order: "desc"
      }
    }
    getAllListBookings(params)
  }

  const [valueSearch, setvalueSearch] = useState("")

  const onSearch = () => {
    console.log(valueSearch)
    getListBookingService(valueSearch)
  }

  return (
    <div>
      <span>Home </span>/ <span>Services</span> / <b>Booking Services</b>
      <h1>Booking Services</h1>
      <div className="ant-row ant-row-start">
        <div className="ant-col ant-col-8">
          <Search
            placeholder="Seach by service's name"
            onChange={e => setvalueSearch(e.target.value)}
            style={{
              width: 500,
              paddingBottom: 10
            }}
            onSearch={onSearch}
            enterButton
          />
        </div>
        <div className="ant-col ant-col-16" style={{ textAlign: "right" }}>
          Filler : &nbsp;
          <DatePicker.RangePicker
            style={{
              width: "30%"
            }}
          />
        </div>
      </div>
      <Table
        dataSource={listBookingService}
        columns={columns}
        loading={isloading}
        onChange={onChange}
      />
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  listBookingService: selectListBookingService,
  isloading: selectLoading
})

const mapDispatchToProps = dispatch => ({
  getAllListBookings: payload => dispatch(getAllListBooking(payload))
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withConnect)(ListBookingService)
