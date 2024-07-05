import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
    },
    username: {
      type: String,
    },
    avatar: {
      type: String,
    },
    account: {
      type: String,
    },
    // email: {
    //   type: String,
    //   // required: true,
    // },
    password: {
      type: String,
      // required: true,
    },
    address: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
      },
    ],
    phone: {
      type: String,
    },
    order: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],
    role: {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: 'Role',
      type: String,
      enum: ['admin', 'staff', 'customer', 'shipper'],
      default: 'customer',
    },
    grade: { type: Number, default: 0 },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },
    refreshToken: {
      type: String,
    },
    status: {
      type: String,
      enum: ['active', 'inActive'],
      default: 'active',
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    point: { type: Number, default: 0 },
    loyalCustomers: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

userSchema.plugin(mongoosePaginate);

const User = mongoose.model('User', userSchema);

export default User;
