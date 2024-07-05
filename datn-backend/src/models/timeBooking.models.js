import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const TimeBookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      require: true,
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  },
  { timestamps: true, versionKey: false }
);

TimeBookingSchema.plugin(mongoosePaginate);

const TimeBooking = mongoose.model('TimeBooking', TimeBookingSchema);

export default TimeBooking;
