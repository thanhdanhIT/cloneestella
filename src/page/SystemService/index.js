import React, { useEffect, useState } from "react"
import {
  Table,
  Popconfirm,
  Space,
  Modal,
  Form,
  Input,
  Button,
  Radio,
  Select,
  notification,
  Tag
} from "antd"
import { SmileOutlined, AppstoreAddOutlined } from "@ant-design/icons"
import "./index.scss"
import { createStructuredSelector } from "reselect"
import { connect } from "react-redux"
import { compose } from "recompose"
import { selectLoading, selectListSystemService } from "./stores/selector"
import {
  getAllSystemService,
  asyncCreateNewService,
  asyncDeleteNewService
} from "./stores/actions"
// import {} from "../SystemService/stores/selector"

const { Option } = Select
const { Search } = Input

const SystemServices = props => {
  const { listSystemService, isloading } = props
  const { getSystemServices, createNew, deleteNew } = props

  const [paginations, setPaginations] = useState({
    paging: { pageIndex: 1, pageSize: 10 }
  })

  const columns = [
    {
      title: "Id",
      // dataIndex: "id",
      key: "id",
      render: (text, record, index) => (
        <Space>
          {paginations.paging.pageIndex * paginations.paging.pageSize +
            index +
            1 -
            10}
        </Space>
      )
    },
    {
      title: "Service Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name - b.name
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text, record) => (
        <Tag color="gold"> {record.type.toUpperCase()}</Tag>
      ),
      sorter: (a, b) => a.type - b.type
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <Tag color="blue"> {record.status.toUpperCase()}</Tag>
      ),
      sorter: (a, b) => a.status - b.status
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space>
          <Popconfirm
            title="Are you want delete?"
            onConfirm={() => handleDelete(record.id)}
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      )
    }
  ]

  useEffect(() => {
    getListSystemService()
  }, [])

  const getListSystemService = valueSearch => {
    const params = {
      search: valueSearch || "",
      paging: {
        pageIndex: paginations.paging.pageIndex,
        pageSize: paginations.paging.pageSize
      },
      sorting: {
        field: "createdAt",
        order: "desc"
      }
    }
    getSystemServices(params)
  }

  const onTableChange = async pagination => {
    const { current, pageSize } = pagination
    const paging = { pageIndex: current, pageSize }
    const params = { ...paginations, paging }
    console.log(params)

    getSystemServices({
      search: valueSearch || "",
      paging: {
        pageIndex: params.paging.pageIndex,
        pageSize: params.paging.pageSize
      },
      sorting: {
        field: "",
        order: ""
      }
    })

    setPaginations(params)
  }

  const handleDelete = async id => {
    const res = await deleteNew(id)
    if (res === 200) {
      getListSystemService()
      notification.open({
        message: "Delete",
        description: "Delete Success",
        icon: <SmileOutlined style={{ color: "green" }} />
      })
    } else {
      notification.open({
        message: "Delete",
        description: "delete Failed",
        icon: <SmileOutlined style={{ color: "red" }} />
      })
    }
  }

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [formModal] = Form.useForm()

  const handleOk = () => {
    setIsModalVisible(false)
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const onFinish = async values => {
    const response = await createNew({ values })
    if (response === 200) {
      getListSystemService()
      notification.open({
        message: "Create",
        description: "Create Success",
        icon: <SmileOutlined style={{ color: "green" }} />
      })
    } else {
      notification.open({
        message: "Create",
        description: "Create Failed",
        icon: <SmileOutlined style={{ color: "red" }} />
      })
    }
    setIsModalVisible(false)
    formModal.resetFields()
  }

  const openModal = id => {
    setIsModalVisible(true)
  }

  const [valueSearch, setvalueSearch] = useState("")

  // const [gender, setGender] = useState("MALE")
  // const onChangeGender = e => {
  //   console.log("radio checked", e.target.value)
  //   setGender(e.target.value)
  // }

  const onSearch = () => {
    getListSystemService(valueSearch)
  }

  return (
    <div>
      <span>Home </span>/ <span>Services</span> / <b>List Services</b>
      <h1>System Services</h1>
      <div className="button_custom">
        <Search
          placeholder="Seach by service's name"
          onChange={e => setvalueSearch(e.target.value)}
          style={{
            width: 500
          }}
          onSearch={onSearch}
          enterButton
        />
        <Button
          type="primary"
          icon={<AppstoreAddOutlined />}
          onClick={openModal}
        >
          Create New Service
        </Button>
      </div>
      <Table
        dataSource={listSystemService.data}
        columns={columns}
        loading={isloading}
        pageIndex={paginations.paging.pageIndex}
        pagination={{
          current: paginations.paging.pageIndex,
          total: listSystemService?.paging?.total,
          pageSize: paginations.paging.pageSize
        }}
        onChange={onTableChange}
      />
      <Modal
        title="Create New Service"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          <Space>
            <Button type="primary" htmlType="submit" form="formModal">
              Save
            </Button>
            <Button type="primary" onClick={handleCancel} danger>
              Close
            </Button>
          </Space>
        }
      >
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          form={formModal}
          name="formModal"
        >
          {/* <Form.Item label="Id" name="Id">
            <Input disabled />
          </Form.Item> */}
          <Form.Item
            label="Name"
            name="name"
            // rules={[
            //   { required: true, message: "Please input your UserName!" },
            //   { min: 5, message: "Vui lòng nhập trên 5 kí tự" }
            // ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Type" name="type">
            <Input />
          </Form.Item>

          <Form.Item label="Status" name="status">
            <Input />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input />
          </Form.Item>

          <Form.Item label="imageUrl" name="imageUrl">
            <Input />
          </Form.Item>

          {/* <Form.Item
            label="Gender"
            name="Gender"
            rules={[{ required: true, message: "Please input your Gender!" }]}
          >
            <Radio.Group onChange={onChangeGender} defaultValue={gender}>
              <Radio value={"MALE"}>Nam</Radio>
              <Radio value={"FEMALE"}>Nữ</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Rooom"
            name="roomId"
            rules={[{ required: true, message: "Please input your Gender!" }]}
          >
            <Select>
              <Option value="T4-3403">T4-3403</Option>
              <Option value="T4-3402">T4-3402</Option>
              <Option value="T4-3401">T4-3401</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Role"
            name="roleId"
            rules={[{ required: true, message: "Please input your Gender!" }]}
          >
            <Select>
              <Option value="Accountant">Accountant</Option>
              <Option value="Guest">Guest</Option>
              <Option value="Owner">Owner</Option>
            </Select>
          </Form.Item> */}

          {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item> */}
        </Form>
      </Modal>
    </div>
  )
}
const mapStateToProps = createStructuredSelector({
  isloading: selectLoading,
  listSystemService: selectListSystemService
})

const mapDispatchToProps = dispatch => ({
  getSystemServices: payload => dispatch(getAllSystemService(payload)),
  createNew: payload => asyncCreateNewService(dispatch)(payload),
  deleteNew: payload => asyncDeleteNewService(dispatch)(payload)
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withConnect)(SystemServices)
