const con = require('../connections/connection')
const uuid = require('uuid')

const insertCart = async(req, res)=>{
    var statusCode = 400
    try{

        const { nome, preco, provider } = req.body

        if(!nome || !preco){
            statusCode = 401
            throw new Error('Preencha os campos')
        }


        await con('pixManager_cart').insert({
            id: uuid.v4(),
            nome,
            preco,
            provider
        })


        res.status(200).send(`${nome} adicionado ao carrinho`)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = insertCart