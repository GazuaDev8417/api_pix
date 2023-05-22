const con = require('../connections/connection')




const getClients = async(req, res)=>{
    var statusCode = 400
    try{


        const clients = await con('pixManager_clientLogin')

        res.status(200).send(clients)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = getClients