const database = require('../config').promise()

const table_name = 'product_categories'

module.exports.getCategories = async (req, res) => {
    const active = req.query._active || 0
    try {
        let GET_CATEGORIES = `SELECT * FROM ${table_name}`

        if(active) GET_CATEGORIES += ` WHERE is_active = ${database.escape(active)}`

        let [ CATEGORIES ] = await database.execute(GET_CATEGORIES)

        console.log(CATEGORIES)

        return res.status(200).send(CATEGORIES)
    } catch (error) {
        console.log('error: ', error)
        return res.status(500).send('Internal Service Error')
    }
}

module.exports.deleteCategory = async (req, res) => {
    const id = req.params.id

    try {
        const DELETE_CATEGORY = `UPDATE ${table_name} SET is_active = 0 WHERE id = ${database.escape(id)};`
        let [ CATEGORY ] = await database.execute(DELETE_CATEGORY)

        console.log(CATEGORY)

        return res.status(200).send(CATEGORY)
    } catch (error) {
        console.log('error: ', error)
        return res.status(500).send('Internal Service Error')
    }
}

module.exports.restoreCategory = async (req, res) => {
    const id = req.body.id

    try {
        const RESTORE_CATEGORY = `UPDATE ${table_name} SET is_active = 1 WHERE id = ${database.escape(id)};`
        let [ CATEGORY ] = await database.execute(RESTORE_CATEGORY)

        console.log(CATEGORY)

        return res.status(200).send(CATEGORY)
    } catch (error) {
        console.log('error: ', error)
        return res.status(500).send('Internal Service Error')
    }
}

module.exports.createCategory = async (req, res) => {
    const { name } = req.body

    try {
        const CREATE_CATEGORY = `INSERT INTO ${table_name} (name) VALUE ("${name}");`
        let [ CATEGORY ] = await database.execute(CREATE_CATEGORY)

        console.log(CATEGORY)

        return res.status(200).send(CATEGORY)
    } catch (error) {
        console.log('error: ', error)
        return res.status(500).send('Internal Service Error')
    }
}

module.exports.updateCategory = async (req, res) => {
    const { id, name } = req.body
    
    try {
        const UPDATE_CATEGORY = `UPDATE ${table_name} SET name = "${name}" WHERE id = ${database.escape(id)}`
        let CATEGORY = await database.execute(UPDATE_CATEGORY)

        console.log(CATEGORY)

        return res.status(200).send(CATEGORY)
    } catch (error) {
        console.log('error: ', error)
        return res.status(500).send('Internal Service Error')
    }
}