const Transaction = require('../models/txnModel')
const mongoose = require('mongoose')

// get all transactions
const getTxns = async (req, res) => {
  const user_id = req.user._id

  const txns = await Transaction.find({user_id}).sort({createdAt: -1})

  res.status(200).json(txns)
}

// get a single transaction
const getTxn = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such transaction'})
  }

  const txn = await Transaction.findById(id)

  if (!txn) {
    return res.status(404).json({error: 'No such transaction'})
  }
  
  res.status(200).json(txn)
}

// create new transaction
const createTxn = async (req, res) => {
  const {type, amount, message} = req.body

  let emptyFields = []

  if(!type) {
    emptyFields.push('type')
  }
  if(!amount) {
    emptyFields.push('amount')
  }
  if(!message) {
    emptyFields.push('message')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const transaction = await Transaction.create({type, amount, message, user_id})
    res.status(200).json(transaction)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a transaction
const deleteTxn = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such transaction'})
  }

  const txn = await Transaction.findOneAndDelete({_id: id})

  if (!txn) {
    return res.status(400).json({error: 'No such transaction'})
  }

  res.status(200).json(txn)
}

// update a transaction
const updateTxn = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such transaction'})
  }

  const txn = await Transaction.findOneAndUpdate({_id: id}, {
    ...req.body
  }, {new: true})

  if (!txn) {
    return res.status(400).json({error: 'No such transaction'})
  }

  res.status(200).json(txn)
}

module.exports = {
  getTxns,
  getTxn,
  createTxn,
  deleteTxn,
  updateTxn
}