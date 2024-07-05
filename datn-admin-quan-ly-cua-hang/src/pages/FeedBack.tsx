import { Button, Form, Input, Modal, Table } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const FeedBack = () => {
  const [dataFeedBack, setDataFeedBack] = useState([])
  const [showFeedBack, setShowFeedBack] = useState(false)
  const [messageReSend, setMessageReSend] = useState('')
  useEffect(() => {
    const handelFetchApi = async () => {
      const { data } = await axios.get('http://localhost:8000/api/getAllFeedback')
      console.log(data)
      setDataFeedBack(data)
    }
    handelFetchApi()
  }, [])
  const dataSource = dataFeedBack?.map((items: any, index: number) => ({
    key: items._id,
    user: items.idUser.username,
    start: items.start,
    message: items.message,
    pro: items.idPro.name,
    stt: index + 1,
    feedBackForAdmin: items.feedBackForAdmin
  }))

  const columns = [
    {
      title: '#',
      dataIndex: 'stt',
      key: 'stt'
    },
    {
      title: 'tên user',
      dataIndex: 'user',
      key: 'user'
    },
    {
      title: 'số sao',
      dataIndex: 'start',
      key: 'start'
    },
    {
      title: 'message',
      dataIndex: 'message',
      key: 'message'
    },
    {
      title: 'Phòng',
      dataIndex: 'pro',
      key: 'pro'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'feedBackForAdmin',
      key: 'feedBackForAdmin',
      render: (text: any) => {
        console.log(text,'tet')
        return <div className={`${text ? "text-success" : "text-danger"} `}>{text ? 'đã phản hồi' : 'chưa phản hồi'}</div>
      }
    },
    {
      title: 'phản hồi',
      render: ({ key }: { key: string }) => {
        return (
          <div>
            <Button
              onClick={() => {
                setShowFeedBack(true)
                setMessageReSend(key)
              }}
            >
              Phản hồi khách hàng
            </Button>
          </div>
        )
      }
    }
  ]
  const handleOk2 = () => {
    setShowFeedBack(false)
  }
  const handleCancel2 = () => {
    setShowFeedBack(false)
  }
  const handelFeedBack = (data: any) => {
    axios
      .post('http://localhost:8000/api/updateFeedBack/' + messageReSend, {
        message: data.username
      })
      .then(() => {
        toast.success('success')
        setShowFeedBack(false)
      })
      .catch(() => toast.error('error'))
  }
  const onFinishFailed = () => {}
  return (
    <div>
      <Modal title='Trả lời' open={showFeedBack} onOk={handleOk2} onCancel={handleCancel2}>
        <>
          <Form
            name='basic'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={handelFeedBack}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
          >
            <Form.Item
              label='Trả lời'
              name='username'
              rules={[{ required: true, message: 'Please input your input!' }]}
            >
              <Input.TextArea className='rounded-md !border !border-[#ccc]' />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type='primary' className='bg-red-500' htmlType='submit'>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </>
      </Modal>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  )
}

export default FeedBack
