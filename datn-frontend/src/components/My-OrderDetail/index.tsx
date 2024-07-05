import { useParams, useNavigate } from 'react-router-dom'
import { Steps } from 'antd'
import { useGetOrderByidQuery } from '../../store/slices/order'
import Loader from '../Loader'
import { Divider } from 'antd'
import { AiFillCreditCard, AiOutlineArrowLeft } from 'react-icons/ai'
import { RiMoneyDollarCircleFill } from 'react-icons/ri'
import { formatCurrency } from '../../utils/formatCurrency'
import './index.scss'
import { ITopping } from '../../interfaces/topping.type'
import formatDate from '../../utils/formatDate'

const MyOrderDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: orderData, isError } = useGetOrderByidQuery(id as string)

  const totalPrice = orderData?.order?.items.reduce(
    (accumulator, item) =>
      accumulator +
      item.price * item?.quantity +
      item?.toppings.reduce((acc: number, topping: ITopping) => acc + topping.price, 0),
    0
  )

  const items = [
    {
      index: 0,
      name: 'pending',
      title: 'Chờ Xác Nhận'
    },
    {
      index: 1,
      name: 'confirmed',
      title: 'Đã Xác nhận'
    },
    {
      index: 2,
      name: 'done',
      title: 'Hoàn Thành'
    }
  ]
  const currentStatus = items.find((item) => item.name === orderData?.order?.status)
  if (isError) {
    navigate(-1)
  }

  return (
    <>
      <Loader />
      <div className='max-h-screen overflow-y-auto hidden-scroll-bar relative'>
        <div className='py-5 flex items-center justify-between sticky top-0 bg-white z-[8]'>
          <div className='flex items-center gap-x-2 cursor-pointer select-none' onClick={() => navigate(-1)}>
            <AiOutlineArrowLeft className='text-lg' />
            <span className='uppercase' onClick={() => navigate(-1)}>
              Trở lại
            </span>
          </div>
          <div className='uppercase flex items-center gap-x-3 text-sm'>
            <span>Mã đơn hàng: {orderData?.order?._id}</span>
            <span>|</span>

            {orderData?.order?.status === 'canceled' ? (
              <span className='text-[#EE4D2D]'>Đơn hàng đã được hủy</span>
            ) : (
              <span className='text-[#EE4D2D]'>Đơn hàng {currentStatus?.title}</span>
            )}
          </div>
        </div>
        <Divider />
        <div className='order-status-step'>
          <div className='mb-10'>
            <h2 className='mb-5 text-xl text-[#866312]'>Trạng thái đơn hàng</h2>
            {orderData?.order?.status === 'canceled' ? (
              <div className='flex flex-col justify-center items-center bg-[#fffcf5] py-6 '>
                <span className='text-[20px] text-[#ee4d2d]'>Đã hủy đơn hàng</span>
                <span className='text-sm'>Lý do: {orderData?.order?.reasonCancelOrder}</span>
              </div>
            ) : (
              <Steps labelPlacement='vertical' current={currentStatus?.index} items={items} />
            )}
          </div>
        </div>
        <div className='address my-10'>
          <h2 className='text-xl mb-4 text-[#866312]'>Thông tin khách hàng</h2>
          <div className='bg_image'></div>
          <div className='py-5'>
            <div className='info flex flex-col'>
              <span className='mb-2'>Tên khách hàng: {orderData?.order?.inforOrderShipping?.name}</span>
              <span className='text-[12px] text-[#0000008a]'>SĐT: {orderData?.order?.inforOrderShipping?.phone}</span>
              {/* <span className='text-[12px] text-[#0000008a]'>
                Địa chỉ: {orderData?.order?.inforOrderShipping?.address}
              </span> */}
              {orderData?.order?.inforOrderShipping?.noteShipping?.trim() && (
                <span className='text-[12px] text-[#0000008a]'>
                  Ghi chú: {orderData?.order?.inforOrderShipping?.noteShipping}
                </span>
              )}
              <span className='text-[12px] text-[#0000008a]'>
                Thời gian đặt phòng: {orderData?.order?.createdAt && formatDate(orderData?.order?.createdAt)}
              </span>
            </div>
          </div>
          <div className='bg_image'></div>
        </div>
        <div className='content'>
          <h2 className='mb-4 text-xl text-[#866312]'>Thông tin phòng đã đặt</h2>
          <div className='list-items'>
            {orderData &&
              orderData?.order?.items.length > 0 &&
              orderData?.order?.items?.map((item, index) => (
                <div key={index} className='item flex items-center gap-x-3 mb-10 shadow-md p-2 rounded'>
                  <div className='left flex gap-x-3 flex-1'>
                    <div className='min-w-max'>
                      <img src={item?.image} alt='' className='w-[100px] h-[100px] object-cover' />
                    </div>
                    <div>
                      <h4 className='title mb-2 text-[#866312] text-sm'>{item?.product.name}</h4>
                      <div className='flex flex-col gap-y-1'>
                        <span className='text-[#866312] text-sm'>Size: {item?.size?.name}</span>
                        {item && item?.toppings.length > 0 && (
                          <span className='text-sm text-[#866312]'>
                            dịch vụ :{' '}
                            {item?.toppings?.map((topping: ITopping) =>
                              item.toppings[item.toppings.length - 1].name === topping.name
                                ? `${topping.name}(${formatCurrency(topping.price)}).`
                                : `${topping.name}(${formatCurrency(topping.price)}), `
                            )}
                          </span>
                        )}

                        <span className='quantity text-[12px]'>x{item?.quantity}</span>
                      </div>
                    </div>
                  </div>
                  <div className='right'>
                    <div className='price flex flex-col items-end'>
                      <span className='text-[#866312] ml-2'>
                        {formatCurrency(item?.price)} x {item?.quantity} ={' '}
                        {formatCurrency(item?.price * item?.quantity)}
                      </span>
                      {item.toppings?.map((topping: ITopping) => (
                        <span key={topping._id} className='text-[#866312] ml-2'>
                          {formatCurrency(topping.price)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

            {/* <div className='item flex items-center gap-x-3  shadow-md px-2 rounded'>
              <div className='left flex gap-x-3 flex-1'>
                <div>
                  <img
                    src='https://down-vn.img.susercontent.com/file/fef0347319ef4d5092b026d3ebaf66dd_tn'
                    alt=''
                    className='w-[100px] h-[100px] object-cover'
                  />
                </div>
                <div>
                  <h4 className='title mb-2 text-[#866312] text-sm'>
                    Kinh Cường lực iphone 10D full màn iphone 6s/6plus/6splus/7/7plus/8/8plus/plus/X/Xr/
                    Xsmax/11/11promax/ 12/13/pro/promax
                  </h4>
                  <span className='quantity '>x2</span>
                </div>
              </div>
              <div className='right'>
                <div className='price '>
                  <span className='text-[#866312] ml-2'>2000d</span>
                </div>
              </div>
            </div> */}
          </div>
          <Divider />
          <div className='payment-info'>
            <div className='flex justify-end  items-center py-3 text-right border-b border-b-[#ccc]'>
              <div className='text-[12px] pr-2'>Tổng tiền hàng</div>
              <div className='w-[200px] text-[#866312] border-l border-l-[#ccc]'>
                {totalPrice && formatCurrency(totalPrice)}
              </div>
            </div>
            <div className='flex justify-end  items-center py-3 text-right border-b border-b-[#ccc]'>
              <div className='text-[12px] pr-2'>Thời gian lưu trú</div>
              <div className='w-[200px] text-[#866312] border-l border-l-[#ccc]'>
                {orderData &&
                  orderData?.order?.items?.map((preResult, index) => (
                    <div key={index}>
                      <p>{Number(preResult?.timBooking / preResult?.product?.timBooking)} Ngày</p>
                    </div>
                  ))}
                {/*  */}
              </div>
            </div>
            <div className='flex justify-end  items-center py-3 text-right border-b border-b-[#ccc]'>
              <div className='text-[12px] pr-2'>Loại phòng</div>
              <div className='w-[200px] text-[#866312] border-l border-l-[#ccc]'>
                {orderData &&
                  orderData?.order?.items?.map((preResult, index) => (
                    <div key={index}>
                      <p>{preResult?.kindOfRoom[0].name}</p>
                    </div>
                  ))}
                {/*  */}
              </div>
            </div>

            {/* <div className='flex justify-end  items-center py-3 text-right border-b border-b-[#ccc]'>
              <div className='text-[12px] pr-2'>Mã giảm giá</div>
              <div className='w-[200px] text-[#866312] border-l border-l-[#ccc]'>20000đ</div>
            </div> */}
            <div className='flex justify-end  items-center py-3 text-right border-b border-b-[#ccc]'>
              <div className='text-[12px] pr-2'>Thành tiền</div>
              <div className='w-[200px] text-2xl text-[#866312] border-l border-l-[#ccc]'>
                {orderData?.order?.total && formatCurrency(orderData?.order?.total)}
              </div>
            </div>
          </div>
          <div className='payment-method flex justify-end  items-center py-3 text-right'>
            <div className='flex items-center pr-2 gap-x-1'>
              {orderData?.order?.paymentMethodId === 'cod' ? (
                <RiMoneyDollarCircleFill className='text-[#866312] text-2xl' />
              ) : (
                <AiFillCreditCard className='text-[#866312]' />
              )}

              <span className='text-[12px]'>Phương thức thanh toán</span>
            </div>
            <div className='w-[200px] border-l border-l-[#ccc] text-sm text-[#EE4D2D]'>
              {orderData?.order?.paymentMethodId === 'cod' ? 'Thanh toán tiền mặt' : 'Thanh toán qua VNPay'}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyOrderDetail
