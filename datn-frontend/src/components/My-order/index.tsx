import { useEffect, useState } from 'react'
import { Modal, Button as ButtonAnt, Radio, Popconfirm, Row, Form, Input } from 'antd'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { Button } from '..'
import { ITopping } from '../../interfaces/topping.type'
import { useAppSelector } from '../../store/hooks'
import { useCanceledOrderMutation } from '../../store/slices/order'
import { formatCurrency } from '../../utils/formatCurrency'
import { pause } from '../../utils/pause'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { ClientSocket } from '../../socket'
import { RootState } from '../../store/store'
import './MyOrder.scss'
import axios from 'axios'

enum STATUS_ORDER {
  PENDING = 0,
  CONFIRMED = 1,
  DONE = 2,
  CANCELED = 3
}

const MyOrder = () => {
  const navigate = useNavigate()
  const [seletedTab, setSelectedTab] = useState(0)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [idOrder, setIdOrder] = useState('')
  const [reason, setReason] = useState('')
  const [messageFeed, setMessageFeed] = useState<any>({
    message: '',
    start: '',
    feedBackForAdmin: ''
  })

  const [dataOrder, setDataOrder] = useState<any[]>([])

  const [showFeedBack, setShowFeedBack] = useState(false)
  const [showMessage, setShowMessage] = useState(false)

  const { user } = useAppSelector((state: RootState) => state.persistedReducer.auth)
  const [orderUser, setOrderUser] = useState<any>([])
  const tabs = ['Chờ xác nhận', 'Đã xác nhận', 'Hoàn thành', 'Đã hủy']
  const [cancelOrder] = useCanceledOrderMutation()
  const reasonChange = (e: CheckboxChangeEvent) => {
    setReason(e.target.value)
  }
  const listReason: string[] = [
    'Không muốn book Khách sạn này nữa.',
    'Khách sạn không đúng mô tả trên trang web.',
    'Đã tìm thấy một Khách sạn tốt hơn ở nơi khác.',
    'Khách sạn không còn cần thiết.',
    'Thay đổi ý định book khách sạn.',
    'Gặp vấn đề tài chính không thể book Khách sạn.',
    'Đặt khách sạn nhầm.',
    'Thời gian giao khách sạn quá chậm.'
  ]

  const showModal2 = () => {
    setShowFeedBack(true)
  }
  const handleOk2 = () => {
    setShowFeedBack(false)
  }
  const handleCancel2 = () => {
    setShowFeedBack(false)
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = async () => {
    await pause(2000)
    cancelOrder({ id: idOrder, reasonCancelOrder: reason })
      .unwrap()
      .then(() => {
        ClientSocket.cancelOrder(idOrder)
        ClientSocket.sendNotification({
          idUser: user._id!,
          idOrder,
          content: `Đơn hàng "${idOrder.toUpperCase()}" đã được hủy thành công`
        })
        ClientSocket.sendNotificationToAdmin(`Đơn hàng "${idOrder.toUpperCase()}" đã được hủy!`)
        toast.success('Hủy đơn hàng thành công')
      })
      .catch(() => {
        toast.error('Hủy đơn hàng thất bại.')
      })
    handleCancel()
  }

  const handleCancel = () => {
    setReason('')
    setIsModalOpen(false)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  useEffect(() => {
    ;(async () => {
      if (seletedTab === STATUS_ORDER.PENDING) {
        ClientSocket.getOrderUser(setOrderUser, { room: user._id, status: 'pending' })
      }
      if (seletedTab === STATUS_ORDER.CANCELED) {
        ClientSocket.getOrderUser(setOrderUser, { room: user._id, status: 'canceled' })
      }
      if (seletedTab === STATUS_ORDER.DONE) {
        ClientSocket.getOrderUser(setOrderUser, { room: user._id, status: 'done' })
      }
      if (seletedTab === STATUS_ORDER.CONFIRMED) {
        ClientSocket.getOrderUser(setOrderUser, { room: user._id, status: 'confirmed' })
      }
    })()
  }, [seletedTab, isModalOpen])
  const handelFeedBack = (data: any) => {
    const idPros = dataOrder[0].product
    axios
      .post(`http://localhost:8000/api/createFeedback/${idPros}?idUser=${user._id}`, {
        message: data.username,
        start: data.password
      })
      .then((datas) => {
        console.log(datas)
        toast.success('success')
        setShowFeedBack(false)
      })
      .catch(() => {
        setShowFeedBack(false)
        toast.error('error')
      })
  }
  useEffect(() => {
    if (showMessage) {
      axios
        .get(`http://localhost:8000/api/userGetFeedBack?idUser=${user._id}&idPro=${dataOrder[0].product}`)
        .then((datas: any) => {
          console.log(datas, 'datas')
          setMessageFeed({
            message: datas.data.message,
            start: datas.data.start,
            feedBackForAdmin: datas.data.feedBackForAdmin
          })
        })
        .catch(() => {
          toast.error('error')
        })
    }
  }, [showMessage, dataOrder, user._id])
  return (
    <>
      {showFeedBack && (
        <>
          <Modal title='Đánh giá của bạn về dịch vụ' open={showFeedBack} onOk={handleOk2} onCancel={handleCancel2}>
            {showMessage ? (
              <div>
                <p>message : {messageFeed.message}</p>
                <p>start : {messageFeed.start}</p>

                <p>
                  <strong>feedback Admin : {messageFeed?.feedBackForAdmin ? messageFeed?.feedBackForAdmin : ''}</strong>
                </p>
              </div>
            ) : (
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
                    label='đánh giá'
                    name='username'
                    rules={[{ required: true, message: 'Please input your input!' }]}
                  >
                    <Input.TextArea className='rounded-md !border !border-[#ccc]' />
                  </Form.Item>
                  <Form.Item
                    label='sao'
                    name='password'
                    rules={[{ required: true, message: 'Please input your input!' }]}
                  >
                    <Input className='rounded-md !border !border-[#ccc]' />
                  </Form.Item>
                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <ButtonAnt type='primary' className='bg-red-500' htmlType='submit'>
                      Submit
                    </ButtonAnt>
                  </Form.Item>
                </Form>
              </>
            )}
          </Modal>
        </>
      )}
      <div className='layout-container w-full'>
        <h2 className='title text-[#333] text-lg font-medium mb-5'>Lịch sử book phòng</h2>
        <div className='tab-order mb-5 sticky top-[56px] bg-white'>
          <ul className='flex w-full text-center shadow-lg '>
            {tabs.map((tab: string, index: number) => (
              <li
                key={index + tab}
                onClick={() => setSelectedTab(index)}
                className={`${
                  seletedTab === index ? 'text-[#D8B979]' : ''
                } flex-1 cursor-pointer py-4 select-none border-b-4  hover:text-[#D8B979]`}
              >
                {tab}
              </li>
            ))}
          </ul>
          <div
            className={`h-1 bg-[#D8B979] absolute bottom-0 left-[25%]`}
            style={{
              width: 100 / tabs.length + '%',
              transition: 'left 0.3s ease-in-out',
              left: seletedTab * (100 / tabs.length) + '%'
            }}
          ></div>
        </div>
        <div className='max-h-screen overflow-scroll hidden-scroll-bar '>
          {orderUser.length <= 0 ? (
            <div className='flex flex-col items-center justify-center w-full h-screen'>
              <img
                src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/5fafbb923393b712b96488590b8f781f.png'
                alt=''
                className='max-w-[150px]'
              />
              <h4 className='mt-2 mb-2 text-lg'>Chưa có đơn hàng nào!</h4>
              <Button size='medium' shape='round' onClick={() => navigate('/products')}>
                Đặt mua ngay
              </Button>
            </div>
          ) : (
            orderUser &&
            orderUser?.map((order: any) => (
              <div key={order._id} className={`order-content mb-20  shadow-md bg-[#fafafa]`}>
                <div className='status py-2'>
                  <span className='ml-2'>Trạng thái: </span>
                  <span className='uppercase text-[#D8B979]'>
                    {(order.status === 'pending' && 'Chờ xác nhận') ||
                      (order.status === 'confirmed' && 'Đã xác nhận') ||
                      (order.status === 'done' && 'Hoàn thành') ||
                      (order.status === 'canceled' && 'Đã hủy')}
                  </span>
                </div>
                <div className='top py-3 px-6 shadow rounded-md max-h-[250px] overflow-y-auto hidden-scroll-bar'>
                  {order.items.map((item: any) => (
                    <div key={item._id} className='item flex items-center mb-5'>
                      <div className='left flex pr-4 flex-1'>
                        <div className='image w-[100px] h-[100px] shrink-0'>
                          <img className='w-full object-cover' src={item.image} alt='' />
                        </div>
                        <div className='title pl-3 flex flex-col'>
                          <h3 title={item?.product?.name} className='line-clamp-2 text-[16px] font-semibold uppercase '>
                            {item?.product.name}
                          </h3>
                          {/* <div className='category'>
                          <span className='text-sm text-[#866312]'>Danh mục: Cà phê</span>
                        </div> */}
                          <div>
                            <div className='size'>
                              <span className='text-sm text-[#866312]'>Size: {item.size.name}</span>
                            </div>
                            <div className={`topping ${item.toppings.length > 0 ? '' : 'hidden'}`}>
                              <span className='text-sm text-[#866312]'>
                                Dịch vụ :{' '}
                                {item.toppings.map((topping: ITopping) =>
                                  item.toppings[item.toppings.length - 1].name === topping.name
                                    ? topping.name + '.'
                                    : topping.name + ', '
                                )}
                              </span>
                            </div>
                          </div>
                          <div className='quantity'>x{item.quantity}</div>
                        </div>
                      </div>
                      <div className='right'>
                        <div className='price ml-3 flex items-center'>
                          {/* <span className='old-price line-through mr-1 text-black opacity-25 overflow-hidden'>₫90.000</span> */}
                          <span className='new-price text-[#D8B979] text-sm align-middle font-medium'>
                            {formatCurrency(item.price)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className='middle flex justify-end items-center my-1 py-2 px-6 shadow rounded-md'>
                  <div className='total-price'>
                    <span className='mr-[10px] text-sm text=black'>Thành tiền:</span>
                    <span className='text-2xl text-[#D8B979]'>{formatCurrency(order.total)}</span>
                  </div>
                </div>
                <div className='bottom flex items-center justify-end py-4 px-6 shadow rounded-md'>
                  <div className='note flex-1 '>
                    <span className='text-sm block w-[400px] max-w-[400px] text-left text-gray-500 '>
                      {order.status === 'canceled' && (
                        <>
                          <strong>Lý do hủy: </strong> {order?.reasonCancelOrder}
                        </>
                      )}
                      {order.status === 'pending' && 'Đơn hàng đang chờ được xác nhận'}
                      {order.status === 'confirmed' && 'Đơn hàng đã xác nhận'}
                      {order.status === 'done' && ' Đơn hàng đã hoàn thành'}
                    </span>
                  </div>

                  <div className='confirm-button flex gap-x-3 items-center'>
                    <Button
                      style={`${order.status !== 'done' && 'hidden'}`}
                      onClick={() => {
                        setDataOrder(order.items)
                        setShowFeedBack(true)
                        setShowMessage(true)
                      }}
                      size='medium'
                      shape='round'
                    >
                      chi tiết đánh giá
                    </Button>
                    <Button
                      style={`${order.status !== 'done' && 'hidden'}`}
                      onClick={() => {
                        setDataOrder(order.items)
                        setShowFeedBack(true)
                        setShowMessage(false)
                      }}
                      size='medium'
                      shape='round'
                    >
                      Đánh giá dịch vụ
                    </Button>
                    <Button
                      onClick={() => navigate(`/account-layout/my-order/${order._id}`)}
                      size='medium'
                      shape='round'
                    >
                      Chi tiết đơn hàng
                    </Button>
                    <Button
                      onClick={() => {
                        setIdOrder(order._id)
                        showModal()
                      }}
                      size='medium'
                      shape='round'
                      style={`${
                        (order.status === 'done' || order.status === 'confirmed' || order.status === 'canceled') &&
                        'hidden'
                      }`}
                    >
                      Hủy đơn hàng
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <Modal
          title='Lý do hủy đơn hàng?'
          open={isModalOpen}
          destroyOnClose
          onCancel={handleCancel}
          footer={[
            <ButtonAnt hidden={!reason} key='cancel' onClick={handleCancel}>
              Hủy
            </ButtonAnt>,
            <Popconfirm
              title='Bạn chắc chắn muôn hủy đơn hàng này?'
              onConfirm={handleOk}
              okText='Chắc chắn'
              cancelText='Hủy'
              okButtonProps={{ style: { background: '#D34053' } }}
            >
              <ButtonAnt hidden={!reason} key='submit' className='bg-[#D34053] text-white hover:!text-white'>
                Xác nhận
              </ButtonAnt>
            </Popconfirm>
          ]}
        >
          <Row className='list-cancel-reason'>
            {listReason.map((reasonItem, index) => (
              <Radio.Group
                key={index + reasonItem}
                optionType='button'
                buttonStyle='solid'
                size='large'
                onChange={reasonChange}
                value={reason}
                className='w-full my-1'
              >
                <Radio value={reasonItem} className='select-none w-full text-center'>
                  {reasonItem}
                </Radio>
              </Radio.Group>
            ))}
          </Row>
        </Modal>
      </div>
    </>
  )
}

export default MyOrder
