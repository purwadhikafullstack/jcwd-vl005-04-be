const router = require('express').Router()

const { cart } = require('../controllers')

router.get('/:id', cart.getCart)

router.post('/insert', cart.addToCart)
router.post('/update', cart.updateCartItem)

router.delete('/delete/:user_id/:product_id', cart.deleteCartItem)

module.exports = router