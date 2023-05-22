const con = require('../connections/connection')



const products = async(req, res)=>{
    var statusCode = 400
    try{

        const result = await con('pixManager_products')


        res.status(200).send(result)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = products