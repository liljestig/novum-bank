const express = require('express')
const {
  createTxn,
  getTxns,
  getTxn,
  deleteTxn,
  updateTxn
} = require('../controllers/txnController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all transaction routes
router.use(requireAuth)

// GET all transactions
router.get('/', getTxns)

// GET a single transaction
router.get('/:id', getTxn)

// POST a new transaction
router.post('/', createTxn)

// DELETE a transaction
router.delete('/:id', deleteTxn)

// UPDATE a transaction
router.patch('/:id', updateTxn)

module.exports = router