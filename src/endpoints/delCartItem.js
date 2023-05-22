const con = require('../connections/connection')



const delCartItem = async(req, res)=>{
    var statusCode = 400
    try{

        const [product] = await con('pixManager_cart').where({
            id: req.params.id
        })

        if(!product){
            statusCode = 404
            throw new Error('Produto não encontrado')
        }


        await con('pixManager_cart').del().where({
            id: req.params.id
        })

        
        res.status(200).send(`${product} deletado`)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = delCartItem