const database = require('../config').promise()
const moment = require("moment");
const { mainPath, filePath } = require('../helpers');

module.exports.shipperData = async (req, res) => {
    try {
        let [shippers] = await database.execute(`SELECT id, name, "desc", price FROM shipper`)

        return res.status(200).send(shippers)
    } catch (error) {
        console.log('error: ', error)
        return res.status(500).send('Internal Service Error')
    }
}

module.exports.userAddresses = async (req, res) => {
    if (!req.query.user_id) {
        return res.status(400).send('User ID required')
    }
    try {
        let [addresses] = await database.execute(`SELECT id, user_id,address,sub_district,district,city,postal_code FROM user_addresses where user_id = ?`, [req.query.user_id])

        return res.status(200).send(addresses)
    } catch (error) {
        console.log('error: ', error)
        return res.status(500).send('Internal Service Error')
    }
}

module.exports.pendingPaymentList = async (req, res) => {
    if (!req.query.user_id) {
        return res.status(400).send('User ID required')
    }
    try {
        let [list] = await database.execute(`SELECT id, user_id, inv_number, status, created_at, payment_proof_path, total_payment, address_id, shipper_id
        FROM transactions WHERE user_id=?`, [req.query.user_id])

        return res.status(200).send(list)
    } catch (error) {
        console.log('error: ', error)
        return res.status(500).send('Internal Service Error')
    }
}

module.exports.userAddressCreate = async (req, res) => {
    try {
        await database.execute(`INSERT INTO user_addresses
        (user_id, address, sub_district, district, city, postal_code)
        VALUES(?,?,?,?,?,?);
        `, [
            req.body.user_id,
            req.body.address,
            req.body.sub_district,
            req.body.district,
            req.body.city,
            req.body.postal_code,
        ])

        return res.status(200).send("success")
    } catch (error) {
        console.log('error: ', error)
        return res.status(500).send('Internal Service Error')
    }
}

module.exports.order = async (req, res) => {
    // product_ids
    const qProductIDs = []
    for (let i = 0; i < req.body.products.length; i++) {
        const p = req.body.products[i];
        qProductIDs.push("?")
    }
    const qProductIDsStr = qProductIDs.join(",")
    const invNumber = moment().format("YYYYMMDDhhmmss")
    try {
        const [dbRes] = await database.execute(`INSERT INTO transactions
        (user_id, inv_number, status, created_at, total_payment, address_id, shipper_id)
        VALUES(?,?,?,?,?,?,?);
        `, [
            req.body.user_id,
            invNumber,
            "pending",
            moment().format("YYYY-MM-DD hh:mm:ss"),
            req.body.total_payment,
            req.body.address_id,
            req.body.shipper_id,
        ])
        const transactionID = dbRes.insertId

        const product_ids = []
        for (let i = 0; i < req.body.products.length; i++) {
            const p = req.body.products[i];
            product_ids.push(p.product_id)

            await database.execute(`INSERT INTO transaction_items
            (transaction_id, product_id, volume, price, created_at)
            VALUES(?,?,?,?,?);
            `, [
                transactionID,
                p.product_id,
                p.volume,
                p.price,
                moment().format("YYYY-MM-DD hh:mm:ss"),
            ])
        }
        await database.execute(`DELETE FROM user_cart WHERE user_id=? AND product_id in(${qProductIDsStr})`, [
            req.body.user_id,
            ...product_ids,
        ])

        return res.status(200).send({ "transaction_id": transactionID })
    } catch (error) {
        console.log('error: ', error)
        return res.status(500).send('Internal Service Error')
    }
}

module.exports.uploadPayment = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const proofFile = req.files.file
    const suffix = `/payment/payment_proof_${proofFile.md5}.jpg`
    const proofPath = `${mainPath}${suffix}`
    const proofURL = `${filePath}${suffix}`
    proofFile.mv(proofPath, async function (err) {
        if (err) {
            return res.status(500).send(err);
        }

        try {
            await database.execute(`UPDATE transactions SET payment_proof_path=?, status=? WHERE id=?;`, [
                proofURL,
                "in_review",
                req.body.transaction_id,
            ])

            return res.status(200).send("success")
        } catch (error) {
            console.log('error: ', error)
            return res.status(500).send('Internal Service Error')
        }
    });



}