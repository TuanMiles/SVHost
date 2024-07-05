import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const cartSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    items: [
      {
        image: {
          type: String,
          required: true,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          require: true,
        },
        timBooking: {
          type: Number,
          require: true,
        },
        kindOfRoom: [],
        size: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Size',
        },
        toppings: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Topping',
          },
        ],
        total: {
          type: Number,
          required: true,
        },
      },
    ],
    // products: [
    //   {
    //     productId: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "Product",
    //       required: true,
    //     },
    //     quantity: {
    //       type: Number,
    //       required: true,
    //     },
    //     price: {
    //       type: Number,
    //       require: true,
    //     },
    //     toppingOrder: [
    //       {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Topping',
    //       },
    //     ],
    //   },
    // ],

    // totalAfterDiscount: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

cartSchema.plugin(mongoosePaginate);

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
