import React, { useEffect, useState } from "react"
import {
  Popconfirm,
  Space,
  Table,
  Button,
  notification,
  Form,
  Input,
  Modal,
  Upload
} from "antd"
import { UploadOutlined } from "@ant-design/icons"
import { SmileOutlined, AppstoreAddOutlined } from "@ant-design/icons"
import { createStructuredSelector } from "reselect"
import { connect } from "react-redux"
import { compose } from "recompose"
import { selectNews, selectLoading } from "./stores/selector"
import {
  asyncCreateNews,
  asyncDeleteNews,
  asyncgetIdNews,
  asyncUpdateNews,
  getAllNews
} from "./stores/actions"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import "./index.scss"
const { Search } = Input
const FeedBacks = props => {
  const { listNews, isloading } = props
  const { getAllNewss, createNews, deleteNewsAction, getIdNews, updateNews } =
    props
  const [valueSearch, setvalueSearch] = useState("")
  const [paginatios, setPaginatios] = useState({
    paging: { pageIndex: 1, pageSize: 10 }
  })
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => (
        <Space>
          {paginatios.paging.pageIndex * paginatios.paging.pageSize +
            index +
            1 -
            paginatios.paging.pageSize}
        </Space>
      )
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title - b.title
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
      sorter: (a, b) => a.tag - b.tag
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => a.createdAt - b.createdAt
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
      sorter: (a, b) => a.createdBy - b.createdBy
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
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [formModal] = Form.useForm()

  const onSearch = () => {
    console.log(valueSearch)
    getAllNewss(valueSearch)
  }
  const params = {
    search: valueSearch || "",
    paging: {
      pageIndex: 1,
      pageSize: 10
    },
    sorting: {
      field: "createdAt",
      order: "desc"
    }
  }
  const onTableChange = async pagination => {
    const { current, pageSize } = pagination
    const paging = { pageIndex: current, pageSize }
    const paramsPayload = { ...paginatios, paging }
    setPaginatios(paramsPayload)
    getAllNewss({
      ...params,
      paging: {
        pageSize: paramsPayload.paging.pageSize,
        pageIndex: paramsPayload.paging.pageIndex
      }
    })
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo)
  }
  // const normFile = (e: any) => {
  //   console.log("Upload event:", e)
  //   if (Array.isArray(e)) {
  //     return e
  //   }
  //   return e?.fileList
  // }

  const addNew = () => {
    setshowBtn(true)
    setIsModalVisible(true)
    formModal.resetFields()
  }

  const [showBtn, setshowBtn] = useState(false)
  const onFinish = async values => {
    console.log(values)
    var form = new FormData()
    form.append("file", values.image?.file.originFileObj)
    form.append("title", values.title || "")
    form.append("description", values.description || "")
    form.append("tag", values.tag || "")
    if (values.id) {
      const reponse = await updateNews(values.id, form)
      if (reponse.status === 200) {
        getAllNewss()
      }
    } else {
      const response = await createNews(form)
      if (response.status === 201) {
        getAllNewss()
      }
    }
    handleCancel()
  }

  const openModal = async id => {
    setshowBtn(false)
    setIsModalVisible(true)
    const res = await getIdNews(id)
    if (res) {
      formModal.setFieldsValue({
        id: res.id
      })
    }
  }

  const handleDelete = async id => {
    const res = await deleteNewsAction(id)
    console.log(res.status)
    if (res.code === 200) {
      getAllNewss()
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

  useEffect(() => {
    getAllNewss(params)
  }, [])
  // const  getAllNewss = valueSearch => {
  //   const params = {
  //     search: valueSearch || "",
  //     paging: {
  //       pageIndex: 1,
  //       pageSize: 10
  //     },
  //     sorting: {
  //       field: "createdAt",
  //       order: "desc"
  //     }
  //   }
  //   getAllNewss(params)
  // }
  return (
    <>
      <span>Home </span>/ <b>News</b>
      <h1>News Management</h1>
      <div className="antd-pro">
        <Search
          placeholder="input search by tag"
          value={valueSearch}
          onChange={e => setvalueSearch(e.target.value)}
          style={{
            width: 500
          }}
          onSearch={onSearch}
          enterButton
        />
        <Button onClick={addNew} type="primary" icon={<AppstoreAddOutlined />}>
          Create New
        </Button>
      </div>
      <Modal
        title={showBtn === true ? "Create" : "Edit"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          <Button
            loading={isloading}
            className="btn-add"
            htmlType="submit"
            form="formModal"
          >
            {showBtn === true ? "Create" : "Save"}
          </Button>
        }
        width="500"
      >
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          form={formModal}
          name="formModal"
        >
          <Form.Item
            label="Image"
            name="image"
            valuePropName="fileList"
            // getValueFromEvent={normFile}
          >
            <Upload
              name="filename"
              action="/api/File/download"
              listType="picture"
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="Title" name="title">
            <Input />
          </Form.Item>
          <Form.Item label="Tag" name="tag">
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <CKEditor
              editor={ClassicEditor}
              data="<p>Hello from CKEditor 5!</p>"
              // onReady={editor => {
              //   // You can store the "editor" and use when it is needed.
              //   console.log("Editor is ready to use!", editor)
              // }}
              // onChange={(event, editor) => {
              //   const data = editor.getData()
              //   console.log({ event, editor, data })
              // }}
              // onBlur={(event, editor) => {
              //   console.log("Blur.", editor)
              // }}
              // onFocus={(event, editor) => {
              //   console.log("Focus.", editor)
              // }}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Table
        dataSource={listNews.data}
        columns={columns}
        loading={isloading}
        pageIndex={paginatios.paging.pageIndex}
        pagination={{
          current: paginatios.paging.pageIndex,
          total: listNews.paging?.total,
          pageSize: paginatios.paging.pageSize
        }}
        onChange={onTableChange}
      />
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  listNews: selectNews,
  isloading: selectLoading
})

const mapDispatchToProps = dispatch => ({
  getAllNewss: payload => dispatch(getAllNews(payload)),
  createNews: payload => asyncCreateNews(dispatch)(payload),
  deleteNewsAction: payload => asyncDeleteNews(dispatch)(payload),
  updateNews: payload => asyncUpdateNews(dispatch)(payload),
  getIdNews: payload => asyncgetIdNews(dispatch)(payload)
})
const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withConnect)(FeedBacks)
