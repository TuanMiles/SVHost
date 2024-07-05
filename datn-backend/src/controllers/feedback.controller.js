import feedBacks from '../models/feedback.models.js';
import User from '../models/user.model.js';

export const feedBack = {
  createFeedback: async (req, res) => {
    const { id } = req.params;
    const { idUser } = req.query;
    const { message, start } = req.body;
    try {
      const data = new feedBacks({
        idPro: id,
        message: message,
        start: start,
        idUser: idUser,
      }).save();
      return res.json(data);
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  },
  getAllFeedBack: async (req, res) => {
    try {
      const data = await feedBacks.find({}).populate([
        { path: 'idPro', select: 'name _id' },
        {
          path: 'idUser',
          select: 'username _id',
        },
      ]);
      return res.json(data);
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  },
  getIdFeedBack: async (req, res) => {
    const { id } = req.params;
    try {
      const data = await feedBacks.findById(id).populate([
        { path: 'idPro', select: 'name _id' },
        {
          path: 'idUser',
          select: 'username _id',
        },
      ]);
      return res.json(data);
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  },
  userGetFeedBack: async (req, res) => {
    try {
      const { idUser, idPro } = req.query;
      const data = await feedBacks.findOne({
        idUser: idUser,
        idPro: idPro,
      });
      return res.json(data);
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  },
  updateFeedBack: async (req, res) => {
    const { id } = req.params;
    const { message } = req.body;
    try {
      const data = await feedBacks.findByIdAndUpdate(
        id,
        {
          $set: {
            feedBackForAdmin: message,
          },
        },
        {
          new: true,
        }
      );
      return res.json(data);
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  },
};
