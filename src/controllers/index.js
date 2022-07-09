const admin = require('./admin-controllers')
const auth = require('./auth-controllers')
const user = require('./user-controllers')
const transaction = require('./transaction-controllers')
const product = require('./product-controllers')
const category = require('./category-controllers')
const cart = require('./cart-controllers')

module.exports = {
    admin, 
    auth, 
    user, 
    transaction,
    product,
    category,
    cart
}