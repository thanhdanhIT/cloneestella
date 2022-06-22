import React, { useEffect, useState } from "react"
import {
  Popconfirm,
  Space,
  Table,
  Button,
  Breadcrumb,
  Typography,
  Input,
  Tag,
  Form,
  Modal,
  Select,
  Radio,
  notification,
  Tabs
} from "antd"
import {
  ClockCircleTwoTone,
  SmileOutlined,
  AppstoreAddOutlined
} from "@ant-design/icons"
import { createStructuredSelector } from "reselect"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { compose } from "recompose"
import { withTranslation, useTranslation } from "react-i18next"
import i18next from "i18next"
import {
  getAllUsers,
  asyncCreateUsers,
  asyncDeleteUsers,
  asyncGetDetailUsers,
  asyncUpdateUsers
} from "./store/actions"
import { selectLoading, selectUsers } from "./store/selector"
const { Title } = Typography
const { Option } = Select
const { Search } = Input
const { TabPane } = Tabs
const Users = props => {
  const { t } = useTranslation()
  const { listUsers, isLoading } = props
  const { getAllUsers, addUser, deleteUsers, getDetailUsers, updateUsers } =
    props
  const [valueRadio, setValueRadio] = useState("male")
  const [valueSearch, setValueSearch] = useState("")
  const [isEdit, setIsEdit] = useState(false)
  const [rules, setRules] = useState("All")
  const [Pagination, setPagination] = useState({
    paging: { pageIndex: 1, pageSize: 10 },
    sorting: { field: "username", order: "asc" }
  })
  useEffect(() => {
    getAllUsersDefault()
  }, [])
  const getAllUsersDefault = async (rules = "All") => {
    const params = {
      search: valueSearch || "",
      paging: { pageIndex: 1, pageSize: 10 },
      sorting: { field: "username", order: "asc" }
    }
    const res = await getAllUsers({ params, rules })
    setValueSearch("")
  }
  const dataSource = listUsers?.data?.map((user, index) => {
    return {
      ...user,
      key: index
    }
  })
  const handleChange = (pagination, filter, sorter) => {
    const { current, pageSize } = pagination
    const paging = { pageIndex: current, pageSize }
    const params = {
      search: "",
      paging,
      sorting: {
        field: sorter.field,
        order: sorter.order === "ascend" ? "asc" : "desc"
      }
    }
    setPagination(prev => {
      return {
        ...prev,
        paging
      }
    })
    getAllUsers({ params, rules })
  }
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [formModal] = Form.useForm()
  const openModal = id => {
    setIsModalVisible(true)
  }
  const handleCancel = () => {
    formModal.resetFields()
    setIsModalVisible(false)
  }
  const onFinish = async values => {
    const params = {
      username: values.username,
      fullName: values.fullName,
      email: values.email,
      phoneNumber: values.phoneNumber,
      address: values.address,
      gender: valueRadio,
      roleId: values.roleId,
      roomId: values.roomId
    }
    let response
    if (isEdit) {
      console.log(params)
      response = await updateUsers(params)
      setIsEdit(!isEdit)
    } else {
      response = await addUser(params)
    }
    if (response.code === 200) {
      getAllUsersDefault()
      notification.open({
        message: isEdit ? "Edit" : "Create",
        description: isEdit ? "Edit Success" : "Create Success",
        icon: <SmileOutlined style={{ color: "green" }} />
      })
      handleCancel()
    } else {
      notification.open({
        message: isEdit ? "Edit" : "Create",
        description: isEdit ? "Edit Fail" : "Create Fail",
        icon: <SmileOutlined style={{ color: "red" }} />
      })
    }
  }

  const handleEditData = async payload => {
    const res = await getDetailUsers(payload)
    if (res.code === 200) {
      setIsEdit(!isEdit)
      console.log(res.result)
      formModal.setFieldsValue({
        ...res.result,
        roleId: res.result.role
      })
      setIsModalVisible(true)
    }
  }

  const handleDelete = async payload => {
    const response = await deleteUsers(payload)
    if (response.code === 200 && response) {
      getAllUsersDefault()
      notification.open({
        message: "Delete",
        description: "Delete Success",
        icon: <SmileOutlined style={{ color: "green" }} />
      })
    } else {
      notification.open({
        message: "Delete",
        description: "Delete Failed",
        icon: <SmileOutlined style={{ color: "red" }} />
      })
    }
  }

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo)
  }
  const onChangeRadio = e => {
    setValueRadio(e.target.value)
  }
  const onChangeRules = async value => {
    const res = await getAllUsersDefault(value)
    setRules(value)
  }
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="84">+84</Option>
        {/* <Option value="87">+87</Option> */}
      </Select>
    </Form.Item>
  )
  //COLUMN
  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => {
        return (
          <span>
            {(Pagination.paging.pageIndex - 1) * Pagination.paging.pageSize +
              1 +
              index}
          </span>
        )
      },
      align: "center"
    },
    {
      title: t("username"),
      dataIndex: "username",
      key: "username",
      sorter: (a, b) => a.username - b.username
    },
    {
      title: t("status"),
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status - b.status,
      render: (text, record) => {
        return text === "Activated" ? (
          <Tag color="success">
            <ClockCircleTwoTone twoToneColor="#52c41a" />
          </Tag>
        ) : (
          <Tag color="error">
            <ClockCircleTwoTone twoToneColor="#f9676e" />
          </Tag>
        )
      },
      align: "center"
    },
    {
      title: t("fullName"),
      dataIndex: "fullName",
      key: "fullName",
      sorter: (a, b) => a.fullName - b.fullName
    },
    {
      title: t("debtAmount"),
      dataIndex: "debtAmount",
      key: "debtAmount",
      sorter: (a, b) => a.debtAmount - b.debtAmount,
      align: "center"
    },
    {
      title: t("action"),
      key: "action",
      render: (text, record) => (
        <Space>
          <Button onClick={() => handleEditData(record.username)}>
            {t("edit")}
          </Button>
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => handleDelete(record.username)}
          >
            <Button>{t("delete")}</Button>
          </Popconfirm>
        </Space>
      ),
      align: "center"
    }
  ]
  const onSearch = value => {
    getAllUsersDefault()
  }
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>Admin</Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/admin/users">Users</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Title level={2} type="secondary">
        {t("userManagement")}
      </Title>
      <div className="antd-pro">
        <Search
          placeholder="input search by tag"
          value={valueSearch}
          onChange={e => setValueSearch(e.target.value)}
          style={{
            width: 500
          }}
          onSearch={onSearch}
          enterButton
        />
        <Button type="primary" onClick={openModal}>
          <div className="flex items-center gap-2">
            <AppstoreAddOutlined />
            <span className="text-white">{t("create")}</span>
          </div>
        </Button>
      </div>
      <Tabs defaultActiveKey="1" onChange={onChangeRules}>
        <TabPane tab={t("all")} key="All"></TabPane>
        <TabPane tab={t("resident")} key="Resident"></TabPane>
        <TabPane tab={t("tenant")} key="Tenant"></TabPane>
        <TabPane tab={t("admin")} key="Admin"></TabPane>
        <TabPane tab={t("reception")} key="Reception"></TabPane>
        <TabPane tab={t("accountant")} key="Accountant"></TabPane>
        <TabPane tab={t("security")} key="Security"></TabPane>
        <TabPane tab={t("guest")} key="Guest"></TabPane>
      </Tabs>
      <Table
        dataSource={dataSource}
        columns={columns}
        loading={isLoading}
        pagination={{
          current: Pagination.paging.pageIndex,
          total: listUsers?.paging?.total || 999,
          pageSize: Pagination.paging.pageSize
        }}
        onChange={handleChange}
      />
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
          name="formModal"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Full name"
            name="fullName"
            rules={[
              { required: true, message: "Please input your Full name!" }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>

          <Form.Item name="phoneNumber" label="Phone Number">
            <Input addonBefore={prefixSelector} />
          </Form.Item>

          <Form.Item label="Address" name="address">
            <Input />
          </Form.Item>

          <Form.Item label="Gender" name="gender">
            <Radio.Group onChange={onChangeRadio} value={valueRadio}>
              <Radio value={"male"}>Male</Radio>
              <Radio value={"female"}>Female</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Room" name="roomId">
            <Input />
          </Form.Item>
          <Form.Item label="Roles" name="roleId">
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              <span className="text-white">Submit</span>
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
const mapStateToProps = createStructuredSelector({
  listUsers: selectUsers,
  isLoading: selectLoading
})

const mapDispatchToProps = dispatch => ({
  getAllUsers: payload => dispatch(getAllUsers(payload)),
  addUser: payload => asyncCreateUsers(dispatch)(payload),
  deleteUsers: payload => asyncDeleteUsers(dispatch)(payload),
  getDetailUsers: payload => asyncGetDetailUsers(dispatch)(payload),
  updateUsers: payload => asyncUpdateUsers(dispatch)(payload)
})
const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withConnect)(Users)
