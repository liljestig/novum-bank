const Transaction = require('../models/txnModel')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

// account balance
const acctBalance = async (req, res) => {
  const user_id = req.user._id

  try {
    const user = await User.findById(user_id)
    const balance = user.balance

    res.status(200).json({balance: balance})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// account deposit
const acctDeposit = async (req, res) => {
  const type = 'Deposit'
  const message = 'Online banking'
  const {amount} = req.body
  const user_id = req.user._id

  try {
    const txn = await Transaction.create({type, amount, message, user_id})
    const user = await User.updateOne({ _id: user_id }, {
      $inc: { balance: amount }
    }, {new: true})
  
    res.status(200).json({txn, user})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// account withdraw
const acctWithdraw = async (req, res) => {
  const type = 'Withdraw'
  const message = 'Online banking'
  const {amount} = req.body
  const user_id = req.user._id

  try {
    const txn = await Transaction.create({type, amount, message, user_id})
    const user = await User.updateOne({ _id: user_id }, {
      $inc: { balance: -amount }
    }, {new: true})
  
    res.status(200).json({txn, user})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// account transfer
const acctTransfer = async (req, res) => {
  const type = 'Transfer'

  const {email, amount, message} = req.body
  console.log('Email:', email)
  console.log('Amount:', amount)
  console.log('Message:', message)

  const recUser = await User.findOne({ email })
  if (!recUser) {
    return res.status(400).json({error: 'No such account'})
  }
  
  const user_id = req.user._id
  console.log('User ID:', user_id)

  const sendMessage = 'Transfer to ' + email
  console.log('Sender message:', sendMessage)

  const recUserId = recUser._id
  console.log('Receiver User ID:', recUserId)

  try {
    const sendTxn = await Transaction.create({type, amount, message: sendMessage, user_id})
    const sendUser = await User.updateOne({ _id: user_id }, {
      $inc: { balance: -amount }
    }, {new: true})
    const recTxn = await Transaction.create({type, amount, message, user_id: recUserId})
    const recUser = await User.updateOne({ email }, {
      $inc: { balance: amount }
    }, {new: true})

    res.status(200).json({sendTxn, sendUser, recTxn, recUser})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = {
  acctBalance,
  acctDeposit,
  acctWithdraw,
  acctTransfer
}