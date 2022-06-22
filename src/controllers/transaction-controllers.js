const database = require("../config").promise()

module.exports.getTransactions = async(req,res) =>{
    try{
        const GET_TRANSACTIONS = `SELECT * FROM transactions`;
        let [TRANSACTIONS] = await database.execute(GET_TRANSACTIONS)

        res.status(200).send(TRANSACTIONS)
    }
    catch(error){
        console.log('error : ',error);
        res.status(500).send('Internal service error')
    }
}