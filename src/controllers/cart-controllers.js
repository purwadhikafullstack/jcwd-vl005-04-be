const database = require('../config').promise()

module.exports.addToCart = async (req, res) => {
    try {
        const { product_id, price, user_id, created_at } = req.body

        const ADD_TO_CART = `INSERT INTO user_cart SELECT ${database.escape(user_id)}, ${database.escape(product_id)}, 1, ${database.escape(price)}, ${database.escape(created_at)} FROM products WHERE products.id = ${database.escape(product_id)}`

        let [ CART ] = await database.execute(ADD_TO_CART)

        console.log(CART)

        return res.status(200).send(CART)
    } catch (error) {
        console.log('error: ', error)
        return res.status(500).send('Internal Service Error')
    }
}

module.exports.getCart = async (req, res) => {
    try {
        const user_id = req.params.id
        console.log(user_id)

        const GET_CART = `SELECT user_cart.product_id, user_cart.volume, user_cart.price, user_cart.created_at, products.name, product_units.abbreviation
            FROM user_cart
                INNER JOIN products ON products.id = user_cart.product_id
                INNER JOIN product_units ON products.product_unit_id = product_units.id
            WHERE user_cart.user_id = ${database.escape(user_id)};`
        let [ CART ] = await database.execute(GET_CART)

        console.log(CART)

        return res.status(200).send(CART)
    } catch (error) {
        console.log('error: ', error)
        return res.status(500).send('Internal Service Error')
    }
}

module.exports.updateCartItem = async (req, res) => {
    try {
        const { product_id, user_id, volume } = req.body
        const UPDATE_CART_ITEM = `UPDATE user_cart SET volume = ${database.escape(volume)}
            WHERE user_id = ${database.escape(user_id)} AND product_id = ${database.escape(product_id)};`
        
        let [ CART ] = await database.execute(UPDATE_CART_ITEM)
        
        console.log(CART)

        return res.status(200).send(CART)
    } catch (error) {
        console.log('error: ', error)
        return res.status(500).send('Internal Service Error')
    }
}

module.exports.deleteCartItem = async (req, res) => {
    try {
        const { user_id, product_id } = req.params
        const DELETE_CART_ITEM = `DELETE FROM user_cart WHERE user_id = ${database.escape(user_id)} AND product_id = ${database.escape(product_id)}`

        let [ CART ] = await database.execute(DELETE_CART_ITEM)

        console.log(CART)

        return res.status(200).send(CART)
    } catch (error) {
        console.log('error: ', error)
        return res.status(500).send('Internal Service Error')
    }
}