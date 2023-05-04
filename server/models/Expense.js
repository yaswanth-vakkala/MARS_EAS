import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  empName: String,
  empId: String,
  projName: String,
  projId: String,
  billProof: String,
  status: { type: String, default: 'InProcess' },
  amount: Number,
  description: String,
  user_id: mongoose.Types.ObjectId,
  date: { type: Date, default: new Date() },
  createdAt: { type: Date, default: Date.now },
});

export default new mongoose.model('Expense', expenseSchema);
