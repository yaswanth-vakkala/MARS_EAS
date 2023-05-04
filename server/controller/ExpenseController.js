import Expense from '../models/Expense.js';

export const index = async (req, res) => {
  // const result = await Expense.find();
  // res.status(200).json({ data: result });
  const transactions = await Expense.find({ user_id: req.user._id }).sort({
    createdAt: -1,
  });
  res.status(200).json({ data: transactions });

  // const demo = await Expense.aggregate([
  //   {
  //     $match: { user_id: req.user._id },
  //   },
  //   {
  //     $group: {
  //       _id: { $month: '$date' },
  //       transactions: {
  //         $push: {
  //           amount: '$amount',
  //           description: '$description',
  //           date: '$date',
  //           type: '$type',
  //           _id: '$_id',
  //         },
  //       },
  //       totalExpenses: { $sum: '$amount' },
  //     },
  //   },
  //   { $sort: { _id: 1 } },
  // ]);
  // res.json({ data: demo });
};

export const create = async (req, res) => {
  const {
    amount,
    description,
    date,
    empName,
    empId,
    projName,
    projId,
    billProof,
    status,
  } = req.body;
  const expense = new Expense({
    amount,
    description,
    date,
    empName,
    empId,
    projName,
    projId,
    billProof,
    status,
    user_id: req.user._id,
  });
  await expense.save();
  res.json({ message: 'Success' });
};

export const destroy = async (req, res) => {
  await Expense.deleteOne({ _id: req.params.id });
  res.json({ message: 'success' });
};

export const update = async (req, res) => {
  await Expense.updateOne({ _id: req.params.id }, { $set: req.body });
  res.json({ message: 'success' });
};
