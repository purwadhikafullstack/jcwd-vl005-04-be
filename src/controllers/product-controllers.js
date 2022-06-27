const database = require('../config').promise()

module.exports.getProducts = async (req, res) => {
    try {
        const GET_PRODUCTS = 'SELECT products.*, product_types.name AS type, product_units.abbreviation AS unit FROM products INNER JOIN product_types ON product_types.id = products.product_type_id INNER JOIN product_units ON product_units.id = products.product_unit_id;' 
        const [ PRODUCTS ] = await database.execute(GET_PRODUCTS)

        console.log(PRODUCTS)

        return res.status(200).send(PRODUCTS)
    } catch (error) {
        console.log('error: ', error)
        return res.status(500).send('Internal Service Error')
    }
}

module.exports.getProductById = async (req, res) => {
    const id = req.params.id

    try {
        const GET_PRODUCT_BY_ID = `SELECT * FROM products WHERE id = ${database.escape(id)}`
        const [ PRODUCT ] = await database.execute(GET_PRODUCT_BY_ID)

        console.log(PRODUCT)

        return res.status(200).send(PRODUCT)
    } catch (error) {
        console.log('error: ', error)
        return res.status(500).send('Internal Service Error')
    }
}

module.exports.createProduct = async (req, res) => {
    const {name, product_type_id, bottle_stock, bottle_volume, total_quantity, price_per_unit, product_unit_id} = req.body

    try {
        const INSERT_PRODUCT = `INSERT INTO products (name, product_type_id, bottle_stock, bottle_volume, total_quantity, price_per_unit, product_unit_id)
            VALUES ('${name}', ${product_type_id}, ${bottle_stock}, ${bottle_volume}, ${total_quantity}, ${price_per_unit}, ${product_unit_id});`
        const PRODUCT = await database.execute(INSERT_PRODUCT)

        return res.status(200).send(PRODUCT)
    } catch (error) {
        console.log(error)
        return res.status(500).send('Internal Service Error')
    }

}

module.exports.updateProduct = async (req, res) => {

}

module.exports.deleteProduct = async (req, res) => {
    const id = req.params.id

    try {
        const DELETE_PRODUCT = `DELETE FROM products WHERE id = ${database.escape(id)}`
        const [ PRODUCT ] = await database.execute(DELETE_PRODUCT)

        console.log(PRODUCT)

        return res.status(200).send(PRODUCT)
    } catch (error) {
        console.log(error)
        return res.status(500).send('Internal Service Error')
    }
}

module.exports.getProductTypes = async (req, res) => {
    try {
        const GET_PRODUCT_TYPES = 'SELECT * FROM product_types;'
        const [ TYPES ] = await database.execute(GET_PRODUCT_TYPES)

        console.log(TYPES)

        return res.status(200).send(TYPES)
    } catch (error) {
        console.log(error)
        return res.status(500).send('Internal Service Error')
    }
}

module.exports.getProductUnits = async (req, res) => {
    try {
        const GET_PRODUCT_UNITS = 'SELECT * FROM product_units;'
        const [ UNITS ] = await database.execute(GET_PRODUCT_UNITS)

        console.log(UNITS)

        return res.status(200).send(UNITS)
    } catch (error) {
        console.log(error)
        return res.status(500).send('Internal Service Error')
    }
}