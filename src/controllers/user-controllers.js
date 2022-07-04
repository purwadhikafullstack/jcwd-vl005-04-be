const database = require("../config").promise()
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')

module.exports.getUsers = async(req,res) =>{
    const limit = Number(req.query._limit) || 5
    const page = Number(req.query._page) || 1
    const offset = (page - 1) * limit
    try{
        const GET_USERS = `SELECT * FROM users LIMIT ${database.escape(offset)}, ${database.escape(limit)}`;
        let [USERS] = await database.execute(GET_USERS)

        const GET_TOTAL = `SELECT COUNT(*) AS total FROM users`;
        let [TOTAL] = await database.execute(GET_TOTAL)
        const data = {
            user : USERS,
            total : TOTAL[0].total
        }

        res.status(200).send(data)
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