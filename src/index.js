const express = require('express')
const dotenv = require('dotenv')
const http = require('http')
const cors = require('cors')

const fileUpload = require('express-fileupload');

dotenv.config()

const socketIo = require('socket.io') ;

const database = require('./config')
const app = express()

function urlRequestLogger (req, res, next) {
    console.log(`${req.method} : ${req.url}`)
    next()
}

const server = http.createServer(app)
const io = socketIo(server,{ 
    cors: {
      origin: 'http://localhost:3000'
    }
}) //in case server and client run on different urls
io.on('connection',(socket)=>{
  console.log('client connected: ',socket.id)
  socket.join('clock-room')

  socket.on('finishTransaction',()=>{
    console.log("beli")

    socket.emit('confirmasiCheckOutBerhasil',"Transaction ID # successfully created.")
  })

  socket.on('disconnect',(reason)=>{
    console.log(reason)
  })
})
setInterval(()=>{
     io.to('clock-room').emit('time', new Date())
    //  io.emit("hello", "world");
},1000)

const PORT2 = 5001
server.listen(PORT2, err=> {
  if(err) console.log(err)
  console.log('Server running on Port', PORT2)
})

// config middleware
app.use(express.json())
app.use(cors({ exposedHeaders : 'UID' })) //yg dikasih liat apa aja
app.use(urlRequestLogger)
app.use(express.static('public'))
app.use('/files', express.static(require("path").join(__dirname, 'storages')))

// test database connection
database.connect((error) => {
    if (error) {
        console.log('error : ', error)
    }
    console.log(`database is connected, threadId : ${database.threadId}.`)
})

// define main route
app.get('/', (req, res) => res.status(200).send('<h1>Welcome to My RESTAPIs</h1>'))

app.use(fileUpload());

// setup routes
const routers = require('./routers')
app.use('/api/transaction', routers.transaction_routers)
app.use('/api/users', routers.user_routers)
app.use('/api/admin', routers.admin_routers)
app.use('/api/products', routers.product_routers)
app.use('/api/categories', routers.category_routers)
app.use('/api/cart', routers.cart_routers)
app.use('/api/auth', routers.auth_routers)
app.use('/api/checkout', routers.checkout_routers)

// binding to local port
const PORT = 5000
app.listen(PORT, () => console.log(`API is running at port : ${PORT}.`))

