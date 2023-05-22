const con = require('../connections/connection')



const cartItems = async(req, res)=>{
    var statusCode = 400
    try{

        const result = await con('pixManager_cart').where({
            provider: req.params.id
        })


        res.status(200).send(result)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = cartItems