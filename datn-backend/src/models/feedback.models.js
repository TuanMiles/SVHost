import mongoose from 'mongoose';

const feedBackSchema = new mongoose.Schema(
  {
    idPro: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    start: {
      type: String,
      default: '',
    },
    feedBackForAdmin: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

const feedBacks = mongoose.model('feedBack', feedBackSchema);
export default feedBacks;
