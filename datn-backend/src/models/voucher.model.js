import moment from 'moment';
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

moment().format();

const voucherSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    title: { type: String, required: true, unique: true },
    discount: { type: Number, require: true },
    sale: { type: Number, require: true },
    startDate: { type: Date, default: Date.now },
    // endDate sẽ hết hạn sau 7 ngày kể từ ngày tạo
    endDate: { type: Date, require: true },
    isActive: { type: Boolean, default: true },
    desc: {
      type: String, required: true
    }
    ,
    user_used: [
      {
        type: String,
      },
    ],

  },
  { timestamps: true, versionKey: false }
);
voucherSchema.plugin(mongoosePaginate);

/* kiểm tra xem voucher nào còn hoạt động và còn hiệu lực không */
// voucherSchema.methods.isActive = function () {
//   const currentDate = new Date();
//   return this.isActive && this.startDate <= currentDate && this.endDate >= currentDate;
// };

const Voucher = mongoose.model('Voucher', voucherSchema);

export default Voucher;
