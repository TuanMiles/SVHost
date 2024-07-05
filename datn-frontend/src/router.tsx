import { GuardAccount, GuardSign } from './guardRoute'
import { MyAddress, MyInfor, MyOrder, MyOrderDetail, MyVoucher } from './components'

import AccountLayout from './layouts/AccountLayout/accountLayout'
import Achievement from './components/Achievement/Achievement'
// import BrandStory from './components/Blogs/BrandStory/BrandStory'
// import Events from './components/Blogs/Events/Events'
import BlogDetail from './components/Blogs/BlogDetail/BlogDetail'
import Bot from './Bot'
import ChangePassword from './components/ChangePassword/ChangePassword'
import Checkout from './pages/Checkout/Checkout'
import ClientLayout from './layouts/client'
import ForgotPassword from './pages/Forgot-password/ForgotPassword'
import HomePage from './pages/Home/HomePage'
import Introduce from './components/Introduce/Introduce'
import LayoutBlog from './components/Blogs/Layout/LayoutBlog'
import News from './components/Blogs/News/News'
import NotFound from './pages/Not-Found/NotFound'
import PaymentResult from './pages/PaymentResult/PaymentResult'
import ProductsPage from './pages/Products/Products'
import ResetForgotPassword from './pages/Forgot-password/ResetForgotPassword'
import Signin from './pages/Sign-in/Signin'
import Signup from './pages/Sign-up/Signup'
import { createBrowserRouter } from 'react-router-dom'
import FeedBack from './pages/FeedBack'
import GetPoint from './pages/GetPoint'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/signin',
    element: <GuardSign JSX={Signin} />
  },
  {
    path: '/signup',
    element: <GuardSign JSX={Signup} />
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />
  },
  {
    path: '/reset-forgot-password/:token',
    element: <ResetForgotPassword />
  },
  {
    path: '/products',
    element: <ClientLayout />,
    children: [
      {
        index: true,
        element: <ProductsPage />
      },
      {
        path: 'checkout',
        element: <Checkout />
      },
      {
        path: 'checkout/payment-result',
        element: <PaymentResult />
      }
    ]
  },

  {
    path: 'about',
    element: <Introduce />
  },
  {
    path: 'achievement',
    element: <Achievement />
  },
  {
    path: 'blogs',
    element: <LayoutBlog />,
    children: [
      // {
      //   index: true,
      //   path: 'tin-tuc-khuyen-mai',
      //   element: <News />
      // },
      // {
      //   path: 'cau-chuyen-thuong-hieu',
      //   element: <BrandStory />
      // },
      // {
      //   path: 'su-kien',
      //   element: <Events />
      // },
      {
        path: ':id',
        element: <BlogDetail />
      },
      {
        path: 'category/:id',
        element: <News />
      }
    ]
  },
  {
    path: '/account-layout',
    element: <GuardAccount JSX={AccountLayout} />,
    children: [
      { index: true, element: <MyInfor /> },
      { path: 'my-order', element: <MyOrder /> },
      { path: 'my-order/:id', element: <MyOrderDetail /> },
      { path: 'my-voucher', element: <MyVoucher /> },
      { path: 'my-address', element: <MyAddress /> },
      { path: 'change-password', element: <ChangePassword /> },
      { path: 'getPoint', element: <GetPoint /> },
    ]
  },

  {
    path: '*',
    element: <NotFound />
  },
  {
    path: 'not-found',
    element: <NotFound />
  },
  {
    path: '/bot',
    element: <Bot />
  }
  
])

export default routes
