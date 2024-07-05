import { Link } from 'react-router-dom'
import { SupportBot } from '../../features'
import styles from './Button-Delivery.module.scss'
import { useState } from 'react'

const ButtonDelivery = () => {
  const [open, setOpen] = useState(false)

  const showDrawer = () => {
    setOpen(!open)
  }

  return (
    <div className='fixed right-2 bottom-4 flex flex-col items-center gap-4'>
      {/* <div className=''>
        <button onClick={showDrawer}>
          <img
            src='https://cdn.dribbble.com/users/464600/screenshots/2863054/bot-emotions-principle.gif'
            className={`${styles.btn_delivery_img} object-cover h-full w-full rounded-full`}
            alt=''
          />
        </button>
        {open && <SupportBot showDrawer={showDrawer} />}
      </div> */}
      <Link to='/products' className='bg-white !rounded-[50%]'>
        <img  src='logo_icon.png' className={`${styles.btn_delivery_img}`} alt='' />
      </Link>
    </div>
  )
}

export default ButtonDelivery
