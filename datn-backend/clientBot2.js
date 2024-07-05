import express from 'express';
import http from 'http';
import { Server as SocketIo } from 'socket.io';
import mongoose from 'mongoose';
import User from './src/models/user.model.js';
//
import { json } from 'express';
import session from 'express-session';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import chalk from 'chalk';
//phần Setup dirname

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//
const app = express();
const server = http.createServer(app);
const io = new SocketIo(server);
//độ giống nhau
function Similar(substring, parentString) {
  const substringLength = substring.length;
  const parentLength = parentString.length;
  const windowSize = Math.min(substringLength, parentLength);
  let maxSimilarity = 0;
  for (let i = 0; i <= parentLength - windowSize; i++) {
    const window = parentString.slice(i, i + windowSize);
    let similarity = 0;
    for (let j = 0; j < windowSize; j++) {
      if (substring[j] === window[j]) {
        similarity++;
      }
    }
    maxSimilarity = Math.max(maxSimilarity, similarity);
  }
  const similarityPercentage = (maxSimilarity / substringLength) * 100;
  return similarityPercentage;
}
//

const Message = mongoose.model('Message', {
  text: String,
  username: String,
  reciever: String,
  seen: String,
  timestamp: { type: Date, default: Date.now },
});
//
mongoose.connect(
  'mongodb+srv://hungdang02042003:jVp9aHU2eqE747nE@du-an-framework2-milk-t.ntg5d7s.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.get('/session', async (req, res) => {
  const cookies = cookie.parse(req.headers.cookie || '');
  const refreshTokenCookie = cookies.refreshToken;
  if (refreshTokenCookie) {
    const decoded = jwt.verify(refreshTokenCookie, 'ReFreshSeCret');
    JWTusername = decoded.username;
    res.json(decoded);
  }
});

var JWTusername = '';
var JWTrole = '';

app.get('/hotro', (req, res) => {
  const cookies = cookie.parse(req.headers.cookie || '');
  const refreshTokenCookie = cookies.refreshToken;
  if (refreshTokenCookie) {
    try {
      const decoded = jwt.verify(refreshTokenCookie, 'ReFreshSeCret');
      const JWTusername = decoded.username;
      JWTrole = decoded.role.name;
      res.sendFile(__dirname + '/livechat3.html');
    } catch (err) {
      console.error('Invalid token:', err.message);
    }
  } else res.json({ status: false });
});

//Thông tin lịch sử mua hàng
const Orders = new mongoose.model(
  'Orders',
  new mongoose.Schema({
    status: String,
    createdAt: Date,
    user: String,
    items: Array,
    total: Number,
    inforOrderShipping: {
      name: String,
    },
  })
);

const Products = mongoose.model(
  'products',
  new mongoose.Schema({
    name: String,
    sale: Number,
  })
);
app.get('/Service/history', async (req, res) => {
  const OrderHistory = await Orders.find();
  res.json(OrderHistory);
});
app.get('/Service/bot_history', async (req, res) => {
  //thông tin từ cookie
  const cookies = cookie.parse(req.headers.cookie || '');
  const refreshTokenCookie = cookies.refreshToken;
  if (refreshTokenCookie) {
    const decoded = jwt.verify(refreshTokenCookie, 'ReFreshSeCret');
    //thông tin user
    const JWT_id = decoded.id;
    // const OrderHistory = JSON.stringify(await Orders.find());
    //
    const OrderHistory = await Orders.find();

    //
    var ns = OrderHistory;
    var MinTimeH = ns[0]['createdAt'].toISOString().substring(11, 13) * 1;
    var MaxTimeH = ns[0]['createdAt'].toISOString().substring(11, 13) * 1;

    //ngày
    var AvDay = 0;
    var FirstDay = ns[0]['createdAt'].toISOString().substring(5, 7) * 1;
    //tiền
    var total = ns[0]['total'];
    //lặp lại
    var ReOrder = {};
    //mua thêm
    var toppings = '';
    let productL = '';
    var ProductsList = await Products.find();
    //Hiệu suất
    var FullMoney = 0;
    var myAllM = 0;

    ns.forEach((val) => {
      FullMoney += val.total;
      if (val.user == JWT_id) {
        myAllM += val.total;

        if (MinTimeH < val['createdAt'].toISOString().substring(11, 13) * 1)
          MinTimeH = val['createdAt'].toISOString().substring(11, 13) * 1;
        if (MaxTimeH > val['createdAt'].toISOString().substring(11, 13) * 1)
          MinTimeH = val['createdAt'].toISOString().substring(11, 13) * 1;
        AvDay = (-FirstDay + val['createdAt'].toISOString().substring(5, 7) * 1) / 2;
        // console.log(val['createdAt'].toISOString());

        total = (total + val['total']) / 2;
        //Lặp lại mua hàng
        val.items.forEach((vas) => {
          ProductsList.forEach((p) => {
            if (vas.product == p.id) {
              productL += !productL.includes(p.name) ? p.name + ',' : '';
            }
          });
          vas.toppings.forEach((vau) => {
            if (!toppings.includes(vau.name)) toppings += vau.name + ',';
          });
        });
      }
    });
    //ưu tiên sản phẩm
    // Similar
    var SmList = [];
    var MnList = [];
    var Pstring = toppings + productL;
    ProductsList.forEach((p) => {
      //setting
      // ok
      if (Similar(p.name, Pstring) > 0)
        SmList.unshift({
          id: p.id,
          name: p.name,
          priority: Similar(p.name, Pstring).toFixed(3) + '%',
        });
      // 50%
      if (p.sale <= total * 1.5 && p.sale <= total * 0.5)
        var phantram = ((p.sale - total) / total) * 100;
      phantram = phantram < 100 ? phantram * -1 : phantram;
      phantram = (100 - phantram).toFixed(3);
      MnList.unshift({ id: p.id, name: p.name, priority: phantram + '%' });
      //
    });
    //outline phân tích nhán 1
    AvDay = AvDay <= 0 ? '' : AvDay;
    var jsons = {
      user_id: JWT_id,
      'Tần suất mua sắm': 'Từ ' + MinTimeH + 'h đến ' + MaxTimeH + 'h mỗi ' + AvDay + ' ngày',
      'Tổng tiền tiêu': myAllM,
      'trung bình số tiền tiêu trong 1 lần': total,
      More: {
        'Thường xuyên mua kèm': toppings,
        'sản phẩm mua': productL,
      },
      'Đề xuất sản phẩm liên quan ': SmList,
      'Đề xuất theo giá tiền': MnList,
      'Hiệu suất mua sắm thành viên': (myAllM / FullMoney) * 100 + '%',
    };
    // res.json(response.data)
    res.json(jsons);

    //   res.json({N:1})
  }
});

app.get('/admin/chat', async (req, res) => {
  // const user=req.query.username;
  // if(user)await Message.updateMany({ username: user }, { $set: { seen: 'yes' } });
  res.sendFile(__dirname + '/adminchat.html');
});
app.get('/clientChat', async (req, res) => {
  const chats = await Message.find().sort({ timestamp: 'asc' });
  res.json(chats);
});
app.get('/UniUser', async (req, res) => {
  const uniqueUsernames = await Message.aggregate([
    {
      $match: {
        seen: 'no',
      },
    },
    {
      $group: {
        _id: '$username',
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        username: '$_id',
        count: 1,
      },
    },
  ]);
  res.json(uniqueUsernames);
});

io.on('connection', async (socket) => {
  // const chats =  await Message.find({username:JWTusername}).sort({ timestamp: 'asc'  });
  socket.on('UpdateChatSeen', async (username) => {
    await Message.updateMany({ username: username.username }, { $set: { seen: 'yes' } });
  });
  socket.on('chatMsg', async (message) => {
    const newMessage = new Message({
      text: message.text,
      username: JWTusername,
      reciever: 'toAdmin',
      seen: 'no',
    });
    await newMessage.save();
    io.emit('chatMsg', { text: message.text, username: message.username, to: 'toAdmin' });

    io.emit('AdminMsg', { text: message.text, username: JWTusername, to: 'to' + JWTusername });
    //
    io.emit('UpdateUserListMsg', { username: message.username });
  });
  socket.on('AdminMsg', async (message) => {
    const newMessage = new Message({
      text: message.text,
      username: JWTusername,
      reciever: 'to' + message.username,
      seen: 'no',
    });
    await newMessage.save();
    io.emit('chatMsg', { text: message.text, username: JWTusername, to: ('to', message.username) });
    io.emit('AdminMsg', { text: message.text, username: JWTusername, to: 'toAdmin' });
  });
});

server.listen(4001, (req, res) => {
  console.log(chalk.bgCyanBright(chalk.yellow('Bot 2 start success !')));
});
