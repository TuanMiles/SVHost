import {
  FaEnvelope,
  FaFacebookSquare,
  FaGooglePlus,
  FaInstagram,
  FaMapMarker,
  FaPhone,
  FaTwitter,
  FaYoutube
} from 'react-icons/fa'

import { Link } from 'react-router-dom'
import svhostbanner from '../../assets/svhostbanner.png';
import styles from './Footer-HomePage.module.scss'

const FooterHomePage = () => {
  return (
    <footer className={`${styles.bg_footer} `}
    style={{ backgroundImage: `url(${svhostbanner})` }}>
      <div className='max-w-[1140px] w-full mx-auto pt-[55px] relative z-10'>
        <div className='main sm:p-0 flex flex-wrap px-5'>
          <div className='w-1/2 pr-5pnpm sm:p-0 sm:w-[24%]'>
            <img className='max-h-max object-contain' src='/logo_icon.png' alt='' />
          </div>

          <div className='col-1 p-0 sm:pl-[30px] w-1/2 sm:w-[40%]'>
            <div className='title text-white mb-[30px] uppercase'>
              <h2 className='text-lg font-bold'>CÔNG TY TNHH 1TV SVHost</h2>
            </div>
            <div className='row flex sm:items-center mb-[10px]'>
              <FaMapMarker className='text-[ef233c] text-4xl sm:text-sm mr-[10px]' />
              <span className='text-sm text-white'>Đường Tạ Quang Bửu, Linh Trung, Thành phố Hồ Chí Minh</span>
            </div>
            <div className='row flex items-center mb-[10px]'>
              <FaPhone className='text-[ef233c] text-sm mr-[10px]' />
              <span className='text-sm text-white'>1900.63.69.36</span>
            </div>
            <div className='row flex items-center mb-[10px]'>
              <FaEnvelope className='text-[ef233c]  sm:text-sm mr-[10px]' />
              <span className='text-sm text-white'>maianhtuan3765@gmail.com</span>
            </div>
            <div className='row flex items-center mb-[10px]'>
              <span className='text-sm text-white'>Số ĐKKD: 0106341306. Ngày cấp: 16/03/2017.</span>
            </div>
            <div className='row flex items-center mb-[10px]'>
              <span className='text-sm text-white'>Nơi cấp: Sở kế hoạch và Đầu tư Thành phố Hồ Chí Minh.</span>
            </div>
            <div className='row gap-y-3  flex flex-wrap items-center mb-5'>
              <Link to='/'>
                <FaFacebookSquare className='text-[ef233c] text-lg mr-5' />
              </Link>
              <Link to='/'>
                <FaInstagram className='text-[ef233c] text-lg mr-5' />
              </Link>
              <Link to='/'>
                <FaYoutube className='text-[ef233c] text-lg mr-5' />
              </Link>
              <Link to='/'>
                <FaTwitter className='text-[ef233c] text-lg mr-5' />
              </Link>
              <Link to='/'>
                <FaGooglePlus className='text-[ef233c] text-lg mr-5' />
              </Link>
            </div>
            <div className='row flex flex-wrap justify-between w-[65%]'>
              <Link to='/' className='w-[48%] inline-block mb-2'>
                <img className='w-full' src='/gg-play.png' alt='' />
              </Link>
              <Link to='/' className='w-[48%] inline-block mb-2'>
                <img className='w-full' src='/app-store.png' alt='' />
              </Link>
              <Link to='/' className='w-[48%] inline-block mb-2'>
                <img className='w-full' src='/bo-cong-thuong.png' alt='' />
              </Link>
            </div>
          </div>

          <div className='col-3 pl-[30px] w-1/2 sm:w-auto'>
            <div className='title title text-white mb-[30px] text-lg uppercase'>
              <h2 className='font-bold'>Chính sách</h2>
            </div>
            <div className='content'>
              <ul>
                <li className='mb-2 text-sm'>
                  <Link to='/'>Chính sách thành viên</Link>
                </li>
                <li className='mb-2 text-sm'>
                  <Link to='/'>Hình thức thanh toán</Link>
                </li>
                <li className='mb-2 text-sm'>
                  <Link to='/'>Vận chuyển giao nhận</Link>
                </li>
                <li className='mb-2 text-sm'>
                  <Link to='/'>Đổi trả và hoàn tiền</Link>
                </li>
                <li className='mb-2 text-sm'>
                  <Link to='/'>Bảo vệ thông tin cá nhân</Link>
                </li>
                <li className='mb-2 text-sm'>
                  <Link to='/'>Bảo trì, bảo hành</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='footer-bottom border-t-white sm:flex-row flex flex-col justify-between border border-transparent'>
          <div className='font-[700] text-center my-5 mx-1'>
            Thương hiệu nhà trọ hiện đại tiên phong sử dụng nguồn lực Việt Nam
          </div>
          <div className='mx-1 my-5 text-sm text-center'>Copyrights © 2023 by dovt. All rights reserved.</div>
        </div>
      </div>
      <div className={`${styles.footer_cover}`}></div>
    </footer>
  )
}

export default FooterHomePage
