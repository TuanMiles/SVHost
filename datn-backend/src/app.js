import * as dotenv from 'dotenv';
import { errHandler, notFound } from './middlewares/errhandle.js';
import Coins from './models/coin.js';
import PassportRoutes from './routes/passport.routes.js';
import { Server as SocketIo } from 'socket.io';
import User from './models/user.model.js';
import compression from 'compression';
import { connectDb } from './configs/index.js';
import cookie from 'cookie';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import http from 'http';
import https from 'https';
import jwt from 'jsonwebtoken';
import middleSwaggers from './docs/index.js';
import morgan from 'morgan';
import passport from 'passport';
import passportMiddleware from './middlewares/passport.middlewares.js';
import path from 'path';
import rootRoutes from './routes/index.js';
import session from 'express-session';
import socket from './configs/socket.js';
import Orders from './models/order.model.js';
import Users from './models/user.model.js';
import fs from 'fs';
import { feedBack } from './controllers/feedback.controller.js';
import cron from 'node-cron';
import Order from './models/order.model.js';
import dateOrder from './models/dateOrder.model.js';
// import Order from './models/order.model.js';

//lấy  jwt

dotenv.config();

/* config */

//Setup dirname

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//file name html
//

const app = express();

app.get('/', (req, res) => {
  const cookies = cookie.parse(req.headers.cookie || '');

  const refreshTokenCookie = cookies.refreshToken;
  if (refreshTokenCookie) {
    try {
      const decoded = jwt.verify(refreshTokenCookie, process.env.SECRET_REFRESH);
    } catch (err) {
      console.error('Invalid token:', err.message);
    }

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Refresh Token: ' + refreshTokenCookie);
  } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Refresh Token not found');
  }
});

app.use(morgan('common'));
app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

app.use(
  session({
    secret: 'secretcode',
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: 'auto',
    },
  })
);
app.use(helmet());
app.use(compression());
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  return done(null, user._id);
});

passport.deserializeUser((id, done) => {
  (async () => {
    const user = await User.findById(id).populate([
      { path: 'address', select: '-__v -_id -userId' },
    ]);
    return done(null, user);
  })();
});

/* OAuth2 */
passport.use(passportMiddleware.GoogleAuth);

/* routes */
app.use('/api-docs', middleSwaggers);
app.use('/api', rootRoutes);
app.use('/auth', PassportRoutes);
//
app.get('/home', (req, res) => {
  res.sendFile(__dirname + '/voucher.html');
});

app.get('/api/new_voucher', async (req, res) => {
  const { coin, name } = req.query;
  const check = await Coins.findOne({ name });
  if (check) return res.json({ msg: 'Mã đã tồn tại' });
  else {
    await Coins({
      name: name,
      money: coin,
    }).save();
  }
});
app.get('/api/find_voucher', async (req, res) => {
  const { name } = req.query;
  const check = await Coins.findOne({ name });
  if (!check) return res.json({ msg: 'Mã không tồn tại' });
  else {
    return res.json({ msg: `số dư: ${check.money}` });
  }
});
app.get('/api/edit_voucher', async (req, res) => {
  const { name, coin } = req.query;
  const check = await Coins.findOne({ name });
  if (!check) return res.json({ msg: 'Mã không tồn tại' });
  else {
    const lt = check.money * 1 + coin * 1;
    await Coins.updateOne({ _id: check._id }, { $set: { money: lt } });
    return res.json({ msg: `Update thành công số dư: ${lt}` });
  }
});
app.get('/api/cancelOrder/', async (req, res) => {
  const { phoneCheck } = req.query;

  const data = await Orders.find({ status: 'canceled_by_user' });
  var newJson = {};
  for (const value of data) {
    var phone = value.inforOrderShipping.phone;
    if (newJson[phone] == undefined) {
      newJson = { ...newJson, ...{ [phone]: { count: 1 } } };
      if (value.user != undefined && value.user)
        newJson[phone] = { ...newJson[phone], ...{ user: value.user } };
    } else {
      newJson[phone].count = newJson[phone].count + 1;
      if (newJson[phone].user != undefined && newJson[phone].count > 5) {
        const update = await Users.updateOne(
          { _id: newJson[phone].user },
          { $set: { status: 'inactive' } }
        );
      }
    }
  }
  if (phoneCheck) {
    const chc = 5;
    if (newJson[phoneCheck] <= chc) {
      return res.json({ phoneCheck, count: newJson[phoneCheck], status: true });
    } else return res.json({ status: false, msg: 'sdt khong hop le' });
  } else res.json(newJson);
});
app.post('/api/createFeedback/:id', feedBack.createFeedback);
app.get('/api/getAllFeedback', feedBack.getAllFeedBack);
app.get('/api/getidFeedback/:id', feedBack.getIdFeedBack);
app.get('/api/userGetFeedBack', feedBack.userGetFeedBack);
app.post('/api/updateFeedBack/:id', feedBack.updateFeedBack);

app.get('/api/check-date-room/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { startDate, endDate } = req.query;
    const dataRoom = await dateOrder.find({ idRoom: id });
    if (!dataRoom) {
      return res.status(200).json({
        status: true,
        message: 'active',
      });
    }else{
      
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

app.get('/api/updateUserloyalCustomers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { c } = req.query;
    const data = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          loyalCustomers: c,
        },
      },
      {
        new: true,
      }
    );
    return res.json('success');
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// cron.schedule(
//   '0 0 * * *',
//   async () => {
//     // Chạy vào lúc 00:00 hàng ngày
//     try {
//       const today = new Date();
//       const sevenDaysLater = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
//       const orders = await Order.find({ scheduledAt: sevenDaysLater.toISOString() });
//       if (orders.length === 0) {
//         // Tạo đơn hàng mới
//         const order = new Order({ userId: 'userId', scheduledAt: sevenDaysLater });
//         await order.save();
//         console.log('Đã tạo đơn hàng mới sau 7 ngày.');
//       } else {
//         console.log('Đã có đơn hàng được tạo trước đó.');
//       }
//     } catch (error) {
//       console.error('Lỗi khi tạo đơn hàng:', error);
//     }
//   },
//   {
//     scheduled: true,
//     timezone: 'Asia/Ho_Chi_Minh', // Đặt múi giờ cho cron job
//   }
// );
// thống kê
app.post('/api/create-cronJob/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { frequency } = req.body;
    let scheduledAt;
    switch (frequency) {
      case 'day':
        scheduledAt = new Date();
        break;
      case 'week':
        scheduledAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        scheduledAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        break;
      default:
        return res.status(400).json({ message: 'Chưa chọn tần suất đặt lịch.' });
    }
    const order = new Order({ userId: id, scheduledAt });
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.use(notFound);
app.use(errHandler);

/* connectDb */
connectDb();

/* listen */
const port = process.env.PORT || 5000;

//Chat
let server;

// if (process.env.NODE_ENV === 'production') {
// Sử dụng HTTPS trong production
// const options = {
// key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
// cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
// };
// server = https.createServer(options, app);
// } else {
// Sử dụng HTTP trong development
server = http.createServer(app);
// }
// const server = http.createServer(app);
const io = new SocketIo(server);
server.listen(port, async () => {
  try {
    socket(io);
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.log(error);
  }
});
