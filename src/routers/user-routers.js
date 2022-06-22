const router = require('express').Router()

const {user} = require('../controllers');

router.get("/", user.getUsers)
router.get("/block/:id", user.blockUser)
router.get("/unblock/:id", user.unblockUser)

module.exports = router