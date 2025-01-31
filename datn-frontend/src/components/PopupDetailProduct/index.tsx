import { FaAngleDown, FaTimes } from 'react-icons/fa'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { useEffect, useState } from 'react'

import { CartItem } from '../../store/slices/types/cart.type'
import { IProduct } from '../../interfaces/products.type'
import { addToCart } from '../../store/slices/cart.slice'
import { formatCurrency } from '../../utils/formatCurrency'
import styles from './PopupDetailProduct.module.scss'
import { useCreateCartDBMutation } from '../../api/cartDB'
import { v4 as uuidv4 } from 'uuid'
import { DatePicker } from 'antd'
import { RangePickerProps } from 'antd/es/date-picker'
import moment from 'moment'
import dayjs from 'dayjs'

type PopupDetailProductProps = {
  showPopup: boolean
  togglePopup: () => void
  product: any
  dateBooked: any
}

const PopupDetailProduct = ({ showPopup, togglePopup, product, dateBooked }: PopupDetailProductProps) => {
  console.log(product, 'product')
  const dispatch = useAppDispatch()
  /* set state trạng thái */
  const [price, setPrice] = useState<number>(0)
  const [quantity, setQuantity] = useState<number>(1)
  const [totalToppingPrice, setTotalToppingPrice] = useState<number>(0)
  const [addCartDbFn] = useCreateCartDBMutation()
  const [sizes, setSizes] = useState<{ name: string; price: number }[]>([])
  const [dateCheck, setDateCheck] = useState(0)
  // const [nameRadioInput, setNameRadioInput] = useState<string>(product.sizes[0].name);
  const [nameRadioInput, setNameRadioInput] = useState<{
    name: string
    price: number
    _id?: string
  }>()
  const [dateChecking, setDateChecking] = useState<any>({
    startDate: '',
    endDate:''
  })
  const [checkedToppings, setCheckedToppings] = useState<{ name: string; price: number; _id: string }[]>([])
  const [checkedkindOfRoom, setCheckedkindOfRoom] = useState<{ name: string; price: number }[]>([])
  const [timBooking, setTimBooking] = useState<number>(0)

  const { user } = useAppSelector((state) => state.persistedReducer.auth)
  /* xử lý sự kiện check box phân topping */
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const toppingPrice = Number(event.target.value)
    const toppingName = event.target.name
    const _idTopping = event.target.getAttribute('data-items') as string

    const data = { name: toppingName, price: toppingPrice, _id: _idTopping }
    const dataRoomBook = { name: toppingName, price: toppingPrice }

    if (event.target.checked) {
      setTotalToppingPrice((prev) => prev + toppingPrice)
      setPrice((prev) => prev + toppingPrice)
      setCheckedToppings((prev) => [...prev, data])
    } else {
      setTotalToppingPrice((prev) => prev - toppingPrice)
      setPrice((prev) => prev - toppingPrice)
      setCheckedToppings((prev) => {
        return prev.filter((topping) => topping.name !== toppingName)
      })
    }
  }
  const handleCheckboxChangeRoom = (event: React.ChangeEvent<HTMLInputElement>) => {
    const toppingPrice = Number(event.target.value)
    const priceOk = localStorage.getItem('pricec')
    const toppingName = event.target.name
    if (!priceOk) {
      localStorage.setItem('pricec', event.target.value)
    }

    const newPrice = Number(priceOk) || 0
    console.log(newPrice, 'price')
    const dataRoomBook = { name: toppingName, price: toppingPrice }
    if (event.target.checked) {
      setTotalToppingPrice((prev) => prev + toppingPrice)
      setPrice((prev) => prev + toppingPrice - newPrice)
      console.log(price, 'total topping price')
      setCheckedkindOfRoom((prev) => [dataRoomBook])
      localStorage.setItem('pricec', event.target.value)
    } else {
      console.log('2')
      setTotalToppingPrice((prev) => prev - toppingPrice)
      setPrice((prev) => prev - toppingPrice)
      localStorage.removeItem('pricec')
      setCheckedkindOfRoom((prev) => {
        return prev.filter((topping) => topping.name !== toppingName)
      })
    }
  }
  // const handleGetInfoPrd = (data: any) => {

  // }

  useEffect(() => {
    if (product.sizes) {
      setPrice(product?.sizes[0]?.price ?? 0)
      setNameRadioInput(product?.sizes[0] ?? { name: '', price: 0 })
      setSizes([...product.sizes])
    }
    setQuantity(1)
    setTotalToppingPrice(0)
    setCheckedToppings([])
    // setNameRadioInput(product.sizes[0].name);

    //reset checkbox when popup close
    // const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    // checkboxes.forEach((item: any) => (item.checked = false));
  }, [product])

  const handleAddToCart = () => {
    togglePopup()
    const data = {
      name: product.name,
      size: nameRadioInput,
      toppings: checkedToppings,
      timBooking: Number(timBooking * product.timBooking),
      kindOfRoom: checkedkindOfRoom,
      quantity,
      image: product.images[0]?.url ?? '',
      price: (product.sale ? nameRadioInput && nameRadioInput?.price - product.sale : nameRadioInput?.price) as number,
      total: product.sale ? (price - product.sale) * quantity : price,
      product: product._id,
      sale: product?.sale ? product.sale : 0,
      startDate: dateChecking.startDate,
      endDate: dateChecking.endDate
    }
    if (user._id !== '' && user.accessToken !== '') {
      const { sale, name, ...rest } = data
      addCartDbFn({
        name: name,
        items: [
          {
            ...rest,
            image: rest.image,
            size: data.size?._id as string,
            toppings: data.toppings.map((item) => item?._id as string)
          }
        ]
      })
    } else {
      dispatch(addToCart(data as CartItem))
    }
  }
  const bookedDates = dateBooked.map((booking: any) => {
    return {
      startDate: dayjs(booking.startDate),
      endDate: dayjs(booking.endDate)
    }
  })
  console.log('bookedDates', dateBooked)
  const disabledDate = (current) => {
    if (!current) {
      return false
    }
    // Check if current date is within any of the date ranges
    return dateBooked.some((range) => {
      const start = dayjs(range.startDate).startOf('day')
      const end = dayjs(range.endDate).endOf('day')
      return (
        (current.isAfter(start) && current.isBefore(end)) || current.isSame(start, 'day') || current.isSame(end, 'day')
      )
    })
  }

  const onDateChange: RangePickerProps['onChange'] = (dates, dateStrings) => {
    if (dates && dates[0] && dates[1]) {

      const startDate = dayjs(dateStrings[0])
      const endDate = dayjs(dateStrings[1])
      setDateChecking({
        startDate: dateStrings[0],
        endDate: dateStrings[1]
      })
         console.log(dateStrings[0],dateStrings[0])
      const duration = endDate.diff(startDate, 'day') + 1 // +1 để bao gồm cả ngày cuối cùng
      console.log(duration, 'number of days')
      setDateCheck(duration)
      const newValue = duration
      const previousValue = timBooking
      setTimBooking(newValue)
      const priceChange = Number(newValue) - Number(previousValue)
      setPrice((prevPrice) => prevPrice + priceChange * product.timBooking)
    }
  }

  if (!product) return null

  return (
    <div
      className={`transition-opacity ease-in-out duration-[400ms] z-[11] ${
        showPopup ? 'opacity-1 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className='popup w-[90vw] h-[100vw] md:w-[750px] md:h-[600px] fixed top-[5%] left-[5vw] md:top-[calc(50%-500px)] lg:top-[calc(50%-250px)] md:left-[calc(50%-325px)] shadow-[0px_2px_10px_0px_rgba(0,0,0,0.06)] rounded-[3px] pt-[10px] pb-[10px] flex justify-center z-[5] bg-[#fbfbfb]'>
        <div
          onClick={() => {
            togglePopup()
            setDateCheck(0)
          }}
          className='close-btn absolute top-2 right-2 cursor-pointer z-[6]'
        >
          <FaTimes className='text-2xl font-[900] transition-all hover:scale-[1.2]' />
        </div>

        <div className='content w-full overflow-hidden'>
          <div className='flex flex-col h-full rounded-md'>
            <div className='info flex px-5 pb-3'>
              <div className='left flex-1 md:flex-none w-[150px] h-[150px] md:w-[180px] md:h-[180px]'>
                <img
                  className='w-full h-full rounded-md max-w-[150px] max-h-[150px] md:max-w-[180px] md:max-h-[180px]'
                  src={product?.images[0]?.url}
                  alt='product image'
                />
              </div>
              <div className='right md:flex-none flex-1 ml-4'>
                <div className='title mr-4'>
                  <h4 className='line-clamp-2 text-lg font-semibold'>{product.name}</h4>
                </div>
                <div className='price flex items-end mt-4'>
                  <span className='new-price pr-[10px] text-[#8a733f] font-semibold text-sm'>
                    {product.sale > 0
                      ? formatCurrency(
                          product.sale &&
                            // ? price * ((100 - product.sale) / 100) * quantity
                            (price - product.sale) * quantity
                        )
                      : formatCurrency(price * quantity)}
                  </span>
                  {product.sale ? (
                    <span className='old-price text-xs line-through'>{formatCurrency(price * quantity)}</span>
                  ) : (
                    ''
                  )}
                  {/* {product.sale ? <span className='old-price text-xs line-through'>{formatCurrency(price)}</span> : ''} */}
                </div>
                <div className='quantity md:items-center gap-y-2 md:flex-row flex flex-col items-start mt-5'>
                  <div className='change-quantity flex opacity-0'>
                    <div
                      onClick={() => (quantity === 1 ? setQuantity(1) : setQuantity((prev) => prev - 1))}
                      className='decrease text-white bg-[#799dd9] w-5 h-5 rounded-[50%] leading-[19px] text-[26px] font-semibold  text-center cursor-pointer select-none '
                    >
                      -
                    </div>
                    <div className='amount select-none px-[10px] text-sm'>{quantity}</div>
                    <div
                      onClick={() => setQuantity((prev) => prev + 1)}
                      className='increase text-white bg-[#799dd9] w-5 h-5 rounded-[50%] leading-[20px] text-[26px] font-semibold  text-center cursor-pointer select-none'
                    >
                      +
                    </div>
                  </div>
                  <button
                    // onClick={() => {
                    //   handleAddToCart()
                    // }}
                    className='cursor-auto btn-price bg-[#d8b979] text-white px-5 h-8 rounded-[32px] leading-[32px] md:ml-[30px] text-sm'
                  >
                    +
                    {product.sale > 0
                      ? formatCurrency(
                          product.sale &&
                            // ? price * ((100 - product.sale) / 100) * quantity
                            (price - product.sale) * quantity
                        )
                      : formatCurrency(price * quantity)}
                  </button>
                  <button
                    onClick={() => {
                      handleAddToCart()
                    }}
                    className='btn-price bg-[#d8b979] text-white px-5 h-8 rounded-[32px] leading-[32px] md:ml-[10px] text-sm'
                  >
                    Thêm vào giỏ
                  </button>
                </div>
              </div>
            </div>
            <div className={`customize h-1/2 overflow-y-scroll p-5 grow mb-5 ${styles.popup_body}`}>
              <div className='custom-size mb-2'>
                <div className='title flex items-center justify-between px-5 mb-2'>
                  <div className='left text-base font-semibold'>Chọn size</div>
                  <div className='right'>
                    <FaAngleDown />
                  </div>
                </div>
                <div className='custom-content flex px-5 bg-white flex-wrap shadow-[0px_0px_12px_0px_rgba(0,0,0,.05)] rounded'>
                  {product &&
                    product.sizes &&
                    sizes.map((item) => {
                      return (
                        <label
                          onChange={() => {
                            setPrice(item.price + totalToppingPrice)
                            setNameRadioInput(item)
                          }}
                          key={uuidv4()}
                          className={`${styles.container_radio} block w-full group`}
                        >
                          <span className='block'>Size {item.name}</span>
                          <input
                            className='absolute opacity-0'
                            defaultChecked={nameRadioInput?.price === item.price ? true : false}
                            type='radio'
                            name='size'
                            value={item.price}
                          />
                          <span className={`${styles.checkmark_radio} group-hover:bg-[#ccc]`}></span>
                        </label>
                      )
                    })}
                </div>
              </div>

              <div className='custom-topping'>
                <div className='title flex items-center justify-between px-5 mb-2'>
                  <div className='left text-base font-semibold'>Chọn dịch vụ</div>
                  <div className='right'>
                    <FaAngleDown />
                  </div>
                </div>
                <div className='custom-content flex px-5 bg-white flex-wrap shadow-[0px_0px_12px_0_rgba(0,0,0,.05)] rounded'>
                  {product &&
                    product.toppings.map((item: any) => {
                      return (
                        <div key={item._id} className='topping-wrap flex items-center justify-between w-full'>
                          <label className={`${styles.container_checkbox} group block w-full`}>
                            <span className='text-sm capitalize'>{item.name}</span>
                            <input
                              onChange={(e) => handleCheckboxChange(e)}
                              className='absolute w-0 h-0 opacity-0'
                              type='checkbox'
                              name={item.name}
                              value={item.price}
                              data-items={item._id}
                              checked={checkedToppings.find((topping) => topping.name === item.name) ? true : false}
                            />
                            <span className={`${styles.checkmark_checkbox} group-hover:bg-[#ccc]`}></span>
                          </label>

                          <span className='topping-price text-sm'>{formatCurrency(item.price)}</span>
                        </div>
                      )
                    })}
                </div>
              </div>
              <div className='custom-topping'>
                <div className='title flex items-center justify-between px-5 mb-2'>
                  <div className='left text-base font-semibold'>Chọn loại phòng</div>
                  <div className='right'>
                    <FaAngleDown />
                  </div>
                </div>
                <div className='custom-content flex px-5 bg-white flex-wrap shadow-[0px_0px_12px_0_rgba(0,0,0,.05)] rounded'>
                  {product &&
                    product.kindOfRoom.map((item: any, index: number) => {
                      return (
                        <div key={index} className='topping-wrap flex items-center justify-between w-full'>
                          <label className={`${styles.container_checkbox} group block w-full`}>
                            <span className='text-sm capitalize'>{item.name}</span>
                            <input
                              onChange={(e) => handleCheckboxChangeRoom(e)}
                              className='absolute w-0 h-0 opacity-0'
                              type='checkbox'
                              name={item.name}
                              value={item.price}
                              data-items={item._id}
                              checked={checkedkindOfRoom.find((topping) => topping.name === item.name) ? true : false}
                            />
                            <span className={`${styles.checkmark_checkbox} group-hover:bg-[#ccc]`}></span>
                          </label>

                          <span className='topping-price text-sm'>{formatCurrency(item.price)}</span>
                        </div>
                      )
                    })}
                </div>
              </div>
              {/*  */}
              <div className='custom-topping  mt-4'>
                <div className='title flex items-center justify-between px-5 mb-2'>
                  <div className='left text-base font-semibold'>Giá phòng theo ngày</div>
                  <div className='right'>
                    <FaAngleDown />
                  </div>
                </div>
                <div className='custom-content flex px-5 flex-wrap shadow-[0px_0px_12px_0_rgba(0,0,0,.05)] rounded-md border border-[#ccc]'>
                  {/* <input
                    className='w-full rounded-md border border-[#ccc]'
                    type='text'
                    name='timBooking'
                    value={product.timBooking}
                    disabled={true}
                  /> */}
                  {product.timBooking?.toLocaleString() || 0} VND
                </div>
                <div className='left text-base font-semibold px-5 '>
                  <p>Thời gian lưu trú</p>
                  {/* <input
                    className='w-full rounded-md px-5  border border-[#ccc]'
                    type='number'
                    name='timBooking'
                    placeholder='nhập thời gian lưu trú cho thú cưng'
                    onChange={(event: any) => {
                      const newValue = event.target.value
                      const previousValue = timBooking
                      setTimBooking(newValue)
                      const priceChange = Number(newValue) - Number(previousValue)
                      setPrice((prevPrice) => prevPrice + priceChange * product.timBooking)
                    }}
                  /> */}
                  {dateCheck != 0 && <div>Số ngày {dateCheck}</div>}
                  <DatePicker.RangePicker className='mt-2' onChange={onDateChange} disabledDate={disabledDate} />
                </div>
              </div>
              {/*  */}
            </div>
          </div>
        </div>
      </div>
      <div onClick={togglePopup} className={`${styles.overlay}`}></div>
    </div>
  )
}

export default PopupDetailProduct
