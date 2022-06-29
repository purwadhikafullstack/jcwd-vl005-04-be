const router = require('express').Router()

const { category } = require('../controllers')

router.get('/', category.getCategories)

router.delete('/delete/:id', category.deleteCategory)

router.post('/restore', category.restoreCategory)
router.post('/create', category.createCategory)
router.post('/update', category.updateCategory)

module.exports = router