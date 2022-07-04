const router = require('express').Router()

const {transaction} = require('../controllers');

router.get("/", transaction.getTransactions)
router.get("/user/:userid", transaction.getTransactionsByUserId)
router.get("/approve/:id", transaction.approveTransaction)
router.get("/reject/:id", transaction.rejectTransaction)

module.exports = router