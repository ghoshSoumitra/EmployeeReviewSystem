
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    review: {
      type: String,
      required: true,
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    completed: {
      type: Boolean,
      default: false,
    },
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    }
  }, {
    timestamps: true,
  });
  


const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;