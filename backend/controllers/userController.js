const Transaction = require('../models/txnModel')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {name, email, password, balance} = req.body

  try {
    const user = await User.signup(name, email, password, balance)

    // create a token
    const token = createToken(user._id)

    const type = 'Deposit'
    const message = 'Initial deposit'
    const user_id = user._id  
    const txn = await Transaction.create({type, amount: balance, message, user_id})
  
    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = { signupUser, loginUser }