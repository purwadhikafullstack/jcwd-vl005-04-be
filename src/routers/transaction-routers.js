const router = require('express').Router()

const {transaction} = require('../controllers');

router.get("/", transaction.getTransactions)
router.get("/detail/:id", transaction.getTransactionDetailByInvoiceId)
router.get("/user/:userid", transaction.getTransactionsByUserId)
router.post("/approve/:id", transaction.approveTransaction)
router.post("/reject/:id", transaction.rejectTransaction)
router.get("/invoice/:id", transaction.getTransactionByInvoiceId)

module.exports = router