const router = require('express').Router()

const { product } = require('../controllers')

router.get('/', product.getProducts)
router.get('/item/:id', product.getProductById)

router.post('/create', product.createProduct)
router.post('/update/:id', product.updateProduct)

router.delete('/delete/:id', product.deleteProduct)

router.get('/units', product.getProductUnits)
router.get('/types', product.getProductTypes)

module.exports = router