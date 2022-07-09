const router = require('express').Router()

const {transaction} = require('../controllers');

router.get("/", transaction.getTransactions)
router.get("/user/:userid", transaction.getTransactionsByUserId)
router.post("/approve/:id", transaction.approveTransaction)
router.post("/reject/:id", transaction.rejectTransaction)

module.exports = router