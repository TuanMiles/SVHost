const socketIo = require('socket.io');
const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const server = http.createServer(app);
const cors = require('cors');
const io = socketIo(server);
const { ObjectId } = require('mongodb');
const { NlpManager } = require('node-nlp');
const multer = require('multer');
const xlsx = require('xlsx');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const axios = require('axios');
const fs = require('fs');
app.use(
  cors({
    origin: 'http://localhost:5173', // or '*' for a less secure option that allows all origins
  })
);
// const manager = require('./langchain.js');
const { all } = require('axios');
var manager = require('./langchain.js');
//train model
// manager.train().then(async () => {
//   manager.save();
//   //router

//   // bot chat o port 3000
//   app.get('/bot', async (req, res) => {
//     let response = await manager.process('vi', req.query.message);
//     res.json(response);

//     //success

//     // res.send(response.answer || 'Xin lỗi , thông tin không có sẵn , vui lòng chuyển sang câu hỏi khác');
//   });
//   // console.log( await manager.process('vi',"hello"));
//   // app.listen(3000);//
// });

//connect serrver
mongoose.connect('mongodb://localhost:27017/be_du_an_tot_nghiep', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//schema
const products = mongoose.model(
  'products',
  new mongoose.Schema({
    name: String,
    description: String,
    sale: Number,
    images: [
      {
        url: String,
      },
    ],
    description: String,
    sizes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Size',
      },
    ],
  })
);

const checkouts = mongoose.model(
  'orders',
  new mongoose.Schema({
    name: String,
    description: String,
    sale: Number,
    images: [
      {
        url: String,
      },
    ],
    description: String,
    createdAt: String,
  })
);
const topping = mongoose.model(
  'toppings',
  new mongoose.Schema({
    name: String,
    price: Number,
  })
);
const FastOrder = mongoose.model(
  'FastOrder',
  new mongoose.Schema({
    text: String,
  })
);
const trained = mongoose.model(
  'trained',
  mongoose.Schema({
    data: String,
  })
);
const size = mongoose.model(
  'Size',
  mongoose.Schema({
    data: String,
  })
);

app.get('/products', async (req, res) => {
  try {
    const documents = await products.find({ is_active: true, is_deleted: false }).populate('sizes');
    if (documents) res.json(documents);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});
app.get('/size', async (req, res) => {
  try {
    const documents = await size.find({});
    if (documents) res.json(documents);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});
app.get('/checkouts', async (req, res) => {
  try {
    const documents = await checkouts.find({});
    res.json(documents);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});
app.get('/toppings', async (req, res) => {
  try {
    const documents = await topping.find({});
    res.json(documents);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('ChatMessage', async (message) => {
    let response = await manager.process('vi', message);
    io.emit('ChatMessage', message);
    io.emit(
      'ChatMessage',
      "<str style='color:green'>" +
        (response.answer ||
          'Xin lỗi ,shop chưa hiểu câu hỏi của bạn ,  bạn vui lòng hãy chat cụ thể hơn ạ 🥹  !') +
        '</str>'
    );
  });
  socket.on('Order', async (message) => {
    io.emit('ChatMessage', message);
    //
    new FastOrder({
      text: 'message',
    }).save();
    io.emit('ChatMessage', 'Đặt hàng thành công ! Shop cảm ơn bạn đã đặt hàng nè  ');
  });
  socket.on('update', async () => {
    manager = new NlpManager({ languages: ['vi'] }); //
    a = require('./langchain.js');
    manager.import(a.export());
    // manager.train();
    // manager.save();
  });
});

app.get('/update', async (req, res) => {
  const manager = require('./langchain.js');
  await manager.train();
  await manager.save();
  res.send('ok');
});
app.get('/ask', async (req, res) => {
  const { query, id } = req.query;

  // const allData = await trained.findOne({});

  // if (allData) await manager.import(allData.data);

  // const { NlpManager } = require('node-nlp');
  // const manager = new NlpManager({ languages: ['vi'] }); //
  // const jsonData = fs.readFileSync('./model.txt', 'utf8');
  // manager.import(jsonData);
  // let response = await manager.process('vi', req.query.message);
  // res.json(response);

  if (query) {
    let response = await manager.process('vi', query);

    if (response.intent == 'None') {
      return res.json({
        answer: `Xin lôi toi khong hieu y của bạn`,
      });
    }
    if (response.intent.includes('AskProduct')) {
      const str = response.intent;
      const number = str.match(/\d+/)[0];
      var llsd = await axios.get('http://localhost:3333/products');
      llsd = llsd.data;
      var ob = llsd[number];
      return res.json({
        answer: `gia hien tai cua ${ob.name} size ${ob.sizes[0].name} la ${ob.sizes[0].price} va sale ${ob.sale}`,
      });
    }
    if (response.intent == 'dtt') {
      const pp = await axios.get('http://localhost:8000/api/analyst');
      const aaa = pp.data;
      const nn = aaa['TopSell']['sản phẩm bán nhiều nhất'].name;
      const cc = aaa['TopSell']['sản phẩm bán nhiều nhất'].count;

      return res.json({
        answer: `Sản phẩm bán chạy nhất tháng này là ${nn} và đã bán được ${cc} lượt`,
      });
    }
    if (response.intent == 'bought_num' && (!id || id == '')) {
      return res.json({ answer: 'Bạn cần phải đăng nhập để xem mục này !' });
    }
    // lastest_buy
    else if (response.intent == 'lastest_buy') {
      const _id = new mongoose.Types.ObjectId(id);
      const documents = await checkouts.find({ user: _id });
      console.log(documents[0], 'Lần cuối tôi mua hàng ở đây là khi nào thế');
      if (documents[0]?.createdAt == undefined) {
        return res.json({
          answer: `Không có đơn hàng nào gần đây !`,
        });
      }
      return res.json({
        answer: `lần cuối bạn mua hàng là ${documents[0]?.createdAt} `,
      });
    } else if (response.intent == 'bought_num') {
      const _id = new mongoose.Types.ObjectId(id);
      // mongoose.Types.ObjectId(id);
      const documents = await checkouts.find({ user: _id });
      return res.json({
        answer: `bạn đã mua ${documents.length} đơn hàng`,
      });
    }
    return res.json({ answer: response.answer });
  }
});

app.get('/admin', async (req, res) => {
  res.sendFile(__dirname + '/add.html');
});
const pre_training = mongoose.model(
  'pre_training',
  mongoose.Schema({
    class: String,
    answer: String,
    question: String,
  })
);
app.get('/api/loadAll', async (req, res) => {
  const p = await pre_training.find({});
  var json = {};
  var onClass = [];
  for (const x of p) {
    onClass.push(x.class);
    if (json[x.class] !== undefined) {
      json[x.class]['answer'].push(x.answer);
      json[x.class]['question'].push(x.question);
    } else {
      json = {
        ...json,
        ...{
          [x.class]: {
            answer: [x.answer],
            question: [x.question],
          },
        },
      };
    }
  }
  const { c } = req.query;
  if (c) return res.json(onClass);
  res.json(json);
});
app.get('/api/add', async (req, res) => {
  const { answer, classs, question } = req.query;
  await pre_training({
    class: classs,
    answer: answer,
    question: question,
  }).save();

  res.json({ status: true });
});
app.get('/api/delete', async (req, res) => {
  const { question } = req.query;
  await pre_training.deleteOne({ question: question });
  res.json({ status: true });
});
app.get('/api/train', async (req, res) => {
  // const { NlpManager } = require('node-nlp');
  // const manager = new NlpManager({ languages: ['vi'] }); //
  const manager = require('./langchain.js');
  const p = await pre_training.find({});

  for (const v of p) {
    manager.addDocument('vi', `${v.question}`, `${v.class}`);
    manager.addAnswer('vi', `${v.class}`, `${v.answer}`);
    manager.train();
    manager.save();
  }

  const ex = manager.export();
  fs.writeFileSync('./model.txt', ex);
  // await trained.deleteMany({});
  // await trained({
  //   data: ex,
  // }).save();
  res.json({ status: true });
});

app.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    res.status(400).send('cần upload file');
    return;
  }

  // Đọc dữ liệu từ tệp .xlsx
  const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });

  // Chuyển đổi dữ liệu sang định dạng JSON
  const result = {};
  workbook.SheetNames.forEach((sheetName) => {
    const sheet = workbook.Sheets[sheetName];
    result[sheetName] = xlsx.utils.sheet_to_json(sheet);
  });
  const allData = await trained.findOne({});
  manager.import(allData.data);
  for (const v of result.Sheet1) {
    manager.addDocument('vi', `${v.question}`, `${v.class}`);
    manager.addAnswer('vi', `${v.class}`, `${v.answer}`);
    manager.train();
    manager.save();
  }
  const ex = manager.export();
  await trained.deleteMany({});
  await trained({
    data: ex,
  }).save();
  res.json(result);
});
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://fe-du-an-tot-nghiep-hrdg4lmqx-dangtienhung.vercel.app/',
    ],
    credentials: true,
  })
);

server.listen(3333, () => {
  console.log('Server đang lắng nghe trên cổng 3333');
});
