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
  Upload,
  Breadcrumb,
  Typography,
  Tag,
  DatePicker
} from "antd"
import { UploadOutlined } from "@ant-design/icons"
import { SmileOutlined, AppstoreAddOutlined } from "@ant-design/icons"
import { createStructuredSelector } from "reselect"
import { connect } from "react-redux"
import { compose } from "recompose"
import { selectFeedbacks, selectLoading } from "./stores/selector"
import {
  getAllFeedback,
  asyncDeleteFeedBack,
  asyncGetFeedBackDetail
} from "./stores/actions"
import { Link } from "react-router-dom"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import "./index.scss"
const { Search } = Input
const { Title } = Typography
const FeedBacks = props => {
  const { listFeedbacks, isLoading } = props
  const { getAllFeedbacks, deleteFeedback, getFeedbackDetails } = props
  const [valueSearch, setValueSearch] = useState("")
  const [paginations, setPaginations] = useState({
    paging: { pageIndex: 1, pageSize: 10 },
    sorting: { field: "CreateAt", order: "asc" }
  })
  const [dates, setDates] = useState(null)
  const [hackValue, setHackValue] = useState(null)
  const [value, setValue] = useState(null)
  const { TextArea } = Input
  const [feedbackDetail, setFeedbackDetail] = useState({
    title: "",
    content: "",
    reply: "",
    imageUrl: ""
  })
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => (
        <Space>
          {paginations.paging.pageIndex * paginations.paging.pageSize +
            index +
            1 -
            paginations.paging.pageSize}
        </Space>
      ),
      align: "center"
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title - b.title,
      render: (text, record, index) => (
        <div onClick={() => handleShowDetail(record.id)}>
          <a>{text}</a>
        </div>
      )
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.tag - b.tag,
      render: (text, record, index) =>
        text === "WAITINGFORREPLY" ? (
          <Tag color="gold">WAITINGFORREPLY</Tag>
        ) : (
          <Tag color="green">REPLIED</Tag>
        )
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
            <Button>Delete</Button>
          </Popconfirm>
        </Space>
      ),
      align: "center"
    }
  ]
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [formModal] = Form.useForm()
  const handleShowDetail = async value => {
    const res = await getFeedbackDetails(value)
    if (res.code === 200) {
      const { title, content, imageUrl, reply } = res.result
      setFeedbackDetail({
        title,
        content,
        imageUrl,
        reply
      })
    }
    setIsModalVisible(true)
  }
  const disabledDate = current => {
    if (!dates) {
      return false
    }

    const tooLate = dates[0] && current.diff(dates[0], "days") > 7
    const tooEarly = dates[1] && dates[1].diff(current, "days") > 7
    return !!tooEarly || !!tooLate
  }

  const onOpenChange = open => {
    if (open) {
      setHackValue([null, null])
      setDates([null, null])
    } else {
      setHackValue(null)
    }
  }

  useEffect(() => {
    getAllFeedbackDefault()
  }, [])
  const getAllFeedbackDefault = async () => {
    const params = {
      search: valueSearch || "",
      endAt: null,
      startAt: null,
      paging: { pageIndex: 1, pageSize: 10 },
      sorting: { field: "CreateAt", order: "desc" }
    }
    getAllFeedbacks(params)
    setValueSearch("")
  }
  const onSearch = () => {
    getAllFeedbackDefault()
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
  const onTableChange = async (pagination, filter, sorter) => {
    const { current, pageSize } = pagination
    const paging = { pageIndex: current, pageSize }
    const sorting = {
      field: sorter.field,
      order: sorter.order === "ascend" ? "asc" : "desc"
    }
    const paramsPayload = { ...paginations, paging, sorting }
    setPaginations(paramsPayload)
    getAllFeedbacks({
      ...params,
      paging,
      sorting
    })
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const [showBtn, setshowBtn] = useState(false)

  const handleDelete = async id => {
    const res = await deleteFeedback(id)
    console.log(res.status)
    if (res.code === 200) {
      getAllFeedback()
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
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>Admin</Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/admin/feedbacks">feedbacks</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Title level={2} type="secondary">
        Feedbacks
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
        <div className="dateTime">
          Filler : &nbsp;
          <DatePicker.RangePicker
            value={hackValue || value}
            disabledDate={disabledDate}
            onCalendarChange={val => setDates(val)}
            onChange={val => setValue(val)}
            onOpenChange={onOpenChange}
          />
        </div>
      </div>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        title={feedbackDetail.title}
      >
        <div className="w-full h-[300px] border">
          <img
            src={`data:image/jpeg;charset=utf-8;base64,${feedbackDetail.imageUrl}`}
            alt="ảnh mô tả"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="py-3">{feedbackDetail.content}</div>
        <TextArea row={5} value={feedbackDetail.reply}/>
      </Modal>
      <Table
        dataSource={listFeedbacks.data}
        columns={columns}
        loading={isLoading}
        pageIndex={paginations.paging.pageIndex}
        pagination={{
          current: paginations.paging.pageIndex,
          total: listFeedbacks.paging?.total,
          pageSize: paginations.paging.pageSize
        }}
        onChange={onTableChange}
      />
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  listFeedbacks: selectFeedbacks,
  isLoading: selectLoading
})

const mapDispatchToProps = dispatch => ({
  getAllFeedbacks: payload => dispatch(getAllFeedback(payload)),
  // createNews: payload => asyncCreateNews(dispatch)(payload),
  deleteFeedback: payload => asyncDeleteFeedBack(dispatch)(payload),
  // updateNews: payload => asyncUpdateNews(dispatch)(payload),
  getFeedbackDetails: payload => asyncGetFeedBackDetail(dispatch)(payload)
})
const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withConnect)(FeedBacks)
