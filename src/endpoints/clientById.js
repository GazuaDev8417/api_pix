const con = require('../connections/connection')



const clientById = async(req, res)=>{
    var statusCode = 400
    try{

        const [client] = await con('pixManager_clientLogin').where({
            id: req.params.id
        })

        if(!client){
            statusCode = 404
            throw new Error('Usuário não encontrado')
        }

        
        res.status(200).send(client)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = clientById