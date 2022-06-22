const router = require('express').Router()

const {admin} = require('../controllers');

router.get('/', admin.getAdmins);
router.get('/:id', admin.getAdminById);
router.post('/add', admin.addNewAdmin);
router.post('/login', admin.login);
router.post('/forget-password', admin.sendForgetEmail);
router.post('/reset-password', admin.resetPassword);

module.exports = router