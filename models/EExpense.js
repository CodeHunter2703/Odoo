const mongoose = require('mongoose');

const EExpenseSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  receipt_base64: { // Changed from receiptPath to store the text string
    type: String,
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  },
});

module.exports = mongoose.model('EExpense', EExpenseSchema);