const router = require('express').Router()
const { auth } = require('../controllers');

router.post("/email/forgot-password", auth.emailForgotPassword)
router.post("/reset-password-token-validate", auth.resetPasswordTokenValidate)
router.post("/reset-password", auth.resetPassword)
router.post("/register", auth.register)
router.post("/email-verify/resend", auth.emailVerifyResend)
router.post("/email-verify", auth.emailVerify)
router.post("/login", auth.login)

module.exports = router