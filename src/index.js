const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')


const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(fileUpload())




//CHAMADA PARA O ARQUIVO E FUNCÃO DE NOTIFICAÇÕES
const sendNotifications = require('./endpoints/sendNotifications')
app.post('/notification/:id', sendNotifications)

const sendMultipleNotifications = require('./endpoints/sendMultipleNotifications')
app.post('/notifications', sendMultipleNotifications)

const updatePushToken = require('./endpoints/updatePushToken')
app.patch('/pushtoken/:id', updatePushToken)

const updateClientPushtoken = require('./endpoints/updateClientPushToken')
app.patch('/client/pushtoken/:id', updateClientPushtoken)


//CHAMADA PARA O ARQUIVO E FUNCÃO DE NOTIFICAÇÕES
// const sendNotifications = require('./endpoints/sendNotifications')
// app.post('/notification/:id', sendNotifications)

// const sendMultipleNotifications = require('./endpoints/sendMultipleNotifications')
// app.post('/notifications', sendMultipleNotifications)

// const updatePushToken = require('./endpoints/updatePushToken')
// app.patch('/pushtoken/:id', updatePushToken)

// const updateClientPushtoken = require('./endpoints/updateClientPushToken')
// app.patch('/client/pushtoken/:id', updateClientPushtoken)


//CHAMADA PARA O ARQUIVO DE ENDPOINT                        
const consultSaldo = require('./endpoints/consultSaldo')
const getClients = require('./endpoints/getClients')
const products = require('./endpoints/products')
const productById = require('./endpoints/productById')
const cartItems = require('./endpoints/cartItems')
const userById = require('./endpoints/userById')
const clientById = require('./endpoints/clientById')


const clientUserListCob = require('./endpoints/clientUserListCob')
const showUserImage = require('./endpoints/showUserImage')
const showClientImage = require('./endpoints/showClientImage')

const clientPixEnv = require('./endpoints/clientPixEnv')
const clientPixRcb = require('./endpoints/clientPixRcb')


const uploadClientImage = require('./endpoints/uploadClientImage')
const uploadImage = require('./endpoints/uploadImage')
const consultCob = require('./endpoints/consultCob')
const clientCob = require('./endpoints/clientCob')
const consultListCob = require('./endpoints/consultListCob')
const clientListCob = require('./endpoints/clientListCob')
const consultPixRcb = require('./endpoints/consultPixRcb')
const consulPixEnv = require('./endpoints/constulPixEnv')
const gerarCob = require('./endpoints/gerarCob')
const insertProducts = require('./endpoints/insertProducts')
const insertCart = require('./endpoints/insertCart')
const clientSignup = require('./endpoints/clientSignup')
const clientLogin = require('./endpoints/clientLogin')
const userSignup = require('./endpoints/userSingup')
const userLogin = require('./endpoints/userLogin')

const editCob = require('./endpoints/editCob')
const editClientCob = require('./endpoints/editClientCob')

const getQrCode = require('./endpoints/getQrCode')

const delProduct = require('./endpoints/delProduct')
const delCartItem = require('./endpoints/delCartItem') 
const delCob = require('./endpoints/delCob')



//CHAMADA DA FUNÇÃO DO ENDPOINT

app.get('/balance', consultSaldo)
app.get('/clients', getClients)
app.get('/products', products)
app.get('/clients', getClients)
app.get('/cart/:id', cartItems)
app.get('/products/:id', productById)
app.get('/user/:id', userById)
app.get('/client/:id', clientById)
app.get('/client/cob/:id', clientCob)
app.get('/client/userlistCob', clientUserListCob)
app.get('/user/image/:id', showUserImage)
app.get('/client/image/:id', showClientImage)
app.get('/pix/:id', clientPixEnv)
app.get('/pixrcb/:id', clientPixRcb)
app.get('/consultcob/:txid', consultCob)
app.get('/listcob', consultListCob)

app.post('/client/image/:id', uploadClientImage)
app.post('/user/image/:id', uploadImage)
app.post('/client/signup', clientSignup)
app.post('/client/login', clientLogin)
app.post('/signup', userSignup)
app.post('/login', userLogin)
app.post('/listpix', consultPixRcb)
app.post('/pixsent', consulPixEnv)
app.post('/client/listcob', clientListCob)
app.post('/client/listcob', clientListCob)
app.post('/cob', gerarCob)
app.post('/qrcode', getQrCode)
app.post('/products', insertProducts)
app.post('/cart', insertCart)

app.patch('/editcob', editCob)
app.patch('/client/editcob/:txid', editClientCob)

app.delete('/products/:id', delProduct)
app.delete('/cart/:id', delCartItem)
app.delete('/cob/:id', delCob)



app.listen(process.env.PORT || 3003, ()=>{
    console.log('Server running')
})