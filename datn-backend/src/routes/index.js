import AuthRouter from './auth.router.js';
import UserRoutes from './user.routers.js';
import addressRouter from './address.routes.js';
import analyticRoutes from './analytic.routes.js';
import cartRouter from './cart.routes.js';
import categoryBlogRoutes from './category-blog.routes.js';
import categoryRoutes from './category.routes.js';
import express from 'express';
import newBlogRouter from './newsBlogs.routes.js';
import orderRoutes from './order.routes.js';
import productRoutes from './product.routes.js';
import sizeRoutes from './size.routes.js';
import toppingRoutes from './topping.routes.js';
import uploadBanner from './banner.routes.js';
import uploadRouter from './uploadfiles.routes.js';
import voucherRoutes from './voucher.routes.js';
import stripeRoutes from './stripe.routes.js';
import notificationRoutes from './notification.routes.js';
import vnpayRoutes from './vnpay.rotues.js';

const router = express.Router();

const rootRoutes = [
  categoryRoutes,
  UserRoutes,
  AuthRouter,
  sizeRoutes,
  toppingRoutes,
  productRoutes,
  uploadRouter,
  voucherRoutes,
  orderRoutes,
  uploadBanner,
  analyticRoutes,
  cartRouter,
  newBlogRouter,
  addressRouter,
  categoryBlogRoutes,
  stripeRoutes,
  notificationRoutes,
  vnpayRoutes,
];

rootRoutes.map((route) => {
  router.use(route);
});

export default rootRoutes;
