import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

categorySchema.plugin(mongoosePaginate);

const Category = mongoose.model('Category', categorySchema);

export default Category;
