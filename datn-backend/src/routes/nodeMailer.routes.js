
import express from 'express';
import { sendEmailOrder } from '../controllers/nodeMailer.controllers.js';
const MailerRouter = express.Router();
MailerRouter.get('/mailer', async()=>{
  const data = {
    to: "thanhdo9xi@gmail.com",
    text: 'Hi!',
    subject: 'cảm ơn bạn đã đặt hàng tại Trà sữa Connect',
    html: '',
  };
  await sendEmailOrder(data);
});
export default MailerRouter;