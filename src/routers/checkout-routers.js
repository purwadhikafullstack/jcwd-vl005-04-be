const router = require('express').Router()

const { checkout } = require('../controllers')

router.get('/shippers', checkout.shipperData)
router.get('/pending-payment', checkout.pendingPaymentList)
router.post('/upload-payment', checkout.uploadPayment)
router.get('/user-addresses', checkout.userAddresses)
router.post('/user-addresses', checkout.userAddressCreate)
router.post('/order', checkout.order)

module.exports = router