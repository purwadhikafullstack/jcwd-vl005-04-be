const admin = require('./admin-controllers')
const user = require('./user-controllers')
const transaction = require('./transaction-controllers')
const product = require('./product-controllers')

module.exports = {
    admin, 
    user, 
    transaction,
    product
}