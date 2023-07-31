const express = require('express')
const {
  acctBalance,
  acctDeposit,
  acctWithdraw,
  acctTransfer
} = require('../controllers/acctController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all account routes
router.use(requireAuth)

// balance route
router.get('/balance', acctBalance)

// deposit route
router.patch('/deposit', acctDeposit)

// withdraw route
router.patch('/withdraw', acctWithdraw)

// transfer route
router.patch('/transfer', acctTransfer)

module.exports = router