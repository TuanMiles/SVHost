import Topping from '../models/timeBooking.models';
export const timeBooking = {
  createTimeBooking: async (req, res, next) => {
    try {
      const topping = await Topping.create(req.body);
      if (!topping) {
        return res.status(400).json({ message: 'fail', err: 'Thêm mới topping thất bại' });
      }
      return res.status(200).json({ message: 'success', data: topping });
    } catch (error) {
      next(error);
    }
  },
  getAllTimeBooking: async (req, res, next) => {
    try {
      const topping = await Topping.find({}).sort({ createdAt: -1 });
      if (!topping) {
        return res.status(404).json({ message: 'fail', err: 'Không tìm thấy Topping' });
      }
      return res.status(200).json({ message: 'success', data: topping });
    } catch (error) {
      next(error);
    }
  },

  getTimeBooking: async (req, res, next) => {
    try {
      const topping = await Topping.findById(req.params.id);

      if (!topping) {
        return res.status(404).json({ message: 'fail', err: 'Không tìm thấy Topping' });
      }
      return res.status(200).json({ message: 'success', data: topping });
    } catch (error) {
      next(error);
    }
  },

  updateTimeBooking: async (req, res, next) => {
    try {
      const topping = await Topping.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!topping) {
        return res.status(404).json({ message: 'fail', err: 'Không tìm thấy Topping' });
      }
      return res.status(200).json({ message: 'success', data: topping });
    } catch (error) {
      next(error);
    }
  },

  deleteTimeBooking: async (req, res, next) => {
    try {
      const topping = await Topping.findByIdAndRemove(req.params.id);
      if (!topping) {
        return res.status(404).json({ message: 'fail', err: 'Không tìm thấy Topping' });
      }
      return res.status(200).json({ message: 'success', data: topping });
    } catch (error) {
      next(error);
    }
  },
};
