import { Outlet, useNavigate } from 'react-router-dom'
import { items, rootSubmenuKeys } from './components'

import { Header } from '../../components'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import { useLogoutMutation } from '../../api/Auth'
import { useState } from 'react'
import Loader from '../../components/Loader'
import { ClientSocket } from '../../socket'
import { useAppDispatch } from '../../store/hooks'
import { resetAllCart } from '../../store/slices/cart.slice'

const AccountLayout = () => {
  const [logout] = useLogoutMutation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const onLogout = () => {
    Swal.fire({
      icon: 'question',
      title: 'Bạn thực sự muốn đăng xuất?',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
          .unwrap()
          .then(() => {
            navigate('/', { replace: true, relative: 'path' })
            ClientSocket.Disconnect()
            dispatch(resetAllCart())
            toast.success('Đăng xuất thành công')
          })
          .catch(() => toast.error('Đăng xuất thất bại'))
      }
    })
  }
  const [openKeys, setOpenKeys] = useState(['sub2'])

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey ?? '') === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }
  return (
    <>
      <Loader />
      <Header />
      <div className='container mx-auto p-[20px] grid grid-cols-[1fr,3fr]'>
        <div className='list-sidebar w-[250px] max-w-[250px] mr-[20px] flex-shrink-0'>
          <Menu mode='inline' openKeys={openKeys} onOpenChange={onOpenChange} items={items({ onLogout })} />
        </div>
        <Outlet />
        {/* <div className="my-account grow ">
        <div className="account flex flex-col">
          <div className="bg-top-account"></div>

          <div className="account-content relative -top-5 bg-[#fff] mx-4 rounded-md">
            <div className="account-avatar absolute -top-[60px] left-[calc(50%-60px)] h-[120px] w-[120px] bg-[#fff] rounded-full border-[5px] border-white">
              <div className="avatar ">
                <div>
                  <img className="" src="/logo_icon.png" />
                </div>
                <div className="image-upload">
                  <label className="btn-change-photo" htmlFor="file-input"></label>
                  <input className="hidden" id="file-input" type="file" />
                </div>
              </div>
            </div>

            <div className="profile mt-[90px] px-[20px] text-sm">
              <form action="">
                <div className="flex flex-wrap">
                  <div className="item-profile w-[50%] my-3 ">
                    <label className="block py-2 text-[#959393] ">Mã thành viên</label>
                    <input
                      className="g-gray-50 focus:outline-none w-full text-sm text-gray-900 border border-gray-300 rounded-lg"
                      type="text"
                    />
                  </div>
                  <div className="item-profile w-[50%] my-3 ">
                    <label className="block py-2 text-[#959393]">Điểm</label>
                    <input
                      className="g-gray-50 focus:outline-none w-full text-sm text-gray-900 border border-gray-300 rounded-lg"
                      type="text"
                    />
                  </div>
                  <div className="item-profile w-[50%] my-3">
                    <label className="block py-2 text-[#959393]">Họ và tên</label>
                    <input
                      className="g-gray-50 focus:outline-none w-full text-sm text-gray-900 border border-gray-300 rounded-lg"
                      type="text"
                    />
                  </div>
                  <div className="item-profile w-[50%] my-3">
                    <label className="block py-2 text-[#959393]">Sinh nhật</label>
                    <input
                      className="g-gray-50 focus:outline-none w-full text-sm text-gray-900 border border-gray-300 rounded-lg"
                      type="text"
                    />
                  </div>
                  <div className="item-profile w-[50%] my-3">
                    <label className="block py-2 text-[#959393]">Số điện thoại</label>
                    <input
                      className="g-gray-50 focus:outline-none w-full text-sm text-gray-900 border border-gray-300 rounded-lg"
                      type="text"
                    />
                  </div>
                  <div className="item-profile w-[50%] my-3">
                    <label className="block py-2 text-[#959393]">Email</label>
                    <input
                      className="g-gray-50 focus:outline-none w-full text-sm text-gray-900 border border-gray-300 rounded-lg"
                      type="text"
                    />
                  </div>
                  <div className="item-profile w-[50%] my-3">
                    <label className="block py-2 text-[#959393]">Giới tính</label>
                    <input
                      className="g-gray-50 focus:outline-none w-full text-sm text-gray-900 border border-gray-300 rounded-lg"
                      type="text"
                    />
                  </div>
                  <div className="item-profile w-[50%] my-3">
                    <label className="block py-2 text-[#959393]">Địa chỉ mặc định</label>
                    <input
                      className="g-gray-50 focus:outline-none w-full text-sm text-gray-900 border border-gray-300 rounded-lg"
                      type="text"
                    />
                  </div>
                </div>
                <div className='my-5 text-center'>
                  <button
                    className="btn bg-[#d8b979] text-white rounded-xl w-[calc(50%-30px)] uppercase cursor-pointer h-[36px]"
                    type="submit"
                  >
                    Lưu thay đổi
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div> */}
      </div>
    </>
  )
}

export default AccountLayout
