const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()

const database = require('./config')

const app = express()

function urlRequestLogger (req, res, next) {
    console.log(`${req.method} : ${req.url}`)
    next()
}

// config middleware
app.use(express.json())
app.use(cors({ exposedHeaders : 'UID' })) //yg dikasih liat apa aja
app.use(urlRequestLogger)
app.use(express.static('public'))

// test database connection
database.connect((error) => {
    if (error) {
        console.log('error : ', error)
    }
    console.log(`database is connected, threadId : ${database.threadId}.`)
})

// define main route
app.get('/', (req, res) => res.status(200).send('<h1>Welcome to My RESTAPIs</h1>'))

// setup routes
const routers = require('./routers')
app.use('/api/transaction', routers.transaction_routers)
app.use('/api/users', routers.user_routers)
app.use('/api/admin', routers.admin_routers)
app.use('/api/products', routers.product_routers)
app.use('/api/categories', routers.category_routers)

// binding to local port
const PORT = 5000
app.listen(PORT, () => console.log(`API is running at port : ${PORT}.`))