const router = require('express').Router()

const {transaction} = require('../controllers');

router.get("/", transaction.getTransactions)

module.exports = router