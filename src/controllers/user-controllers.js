const database = require("../config").promise()
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')

module.exports.getUsers = async(req,res) =>{
    try{
        const GET_USERS = `SELECT * FROM users`;
        let [USERS] = await database.execute(GET_USERS)

        res.status(200).send(USERS)
    }
    catch(error){
        console.log('error : ',error);
        res.status(500).send('Internal service error')
    }
}

module.exports.blockUser = async(req,res) =>{
    const id = req.params.id
    try{
        const BLOCK_USER = `UPDATE users SET is_active = 0 WHERE id = ?`
        await database.execute(BLOCK_USER, [id])

        res.status(200).send("User has been blocked")
    }
    catch(error){
        console.log('error : ',error);
        res.status(500).send('Internal service error')
    }
}

module.exports.unblockUser = async(req,res) =>{
    const id = req.params.id
    try{
        const UNBLOCK_USER = `UPDATE users SET is_active = 1 WHERE id = ?`
        await database.execute(UNBLOCK_USER, [id])

        res.status(200).send("User has been unblocked")
    }
    catch(error){
        console.log('error : ',error);
        res.status(500).send('Internal service error')
    }
}