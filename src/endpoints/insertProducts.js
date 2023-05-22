const con = require('../connections/connection')
const uuid = require('uuid')


const insertProducts = async(req, res)=>{
    var statusCode = 400
    try{

    
        const { nome, preco } = req.body 

        if(!nome || !preco){
            statusCode = 401
            throw new Error('Preencha os campos')
        }


        await con('pixManager_products').insert({
            id: uuid.v4(),
            nome,
            preco
        })


        res.status(200).send(`${nome} adicionado`)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = insertProducts