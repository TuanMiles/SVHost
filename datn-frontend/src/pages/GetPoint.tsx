import React, { useEffect, useState } from 'react'
import { RootState, useAppSelector } from '../store'
import axios from 'axios'

const GetPoint = () => {
    const { user } = useAppSelector((state: RootState) => state.persistedReducer.auth)
  const [checkUser, setCheckUser] = useState('')
  useEffect(() => {
    const handleFetchUser = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8000/api/users/${user._id}`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`
          }
        })
        setCheckUser(data.user.point)
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }

    handleFetchUser()
  }, [user])
  return (
    <div>
      <div className='item-profile w-[50%] my-3'>
        <label className='block py-2 text-[#959393]'> Số điểm hiện có của bạn là </label>
        <input
          className='w-full g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none'
          type='text'
          value={checkUser}
          readOnly
        />
      </div>
    </div>
  )
}

export default GetPoint
