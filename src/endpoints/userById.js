const con = require('../connections/connection')



const userById = async(req, res)=>{
    var statusCode = 400
    try{

        const [user] = await con('pixManager_userLogin').where({
            id: req.params.id
        })

        if(!user){
            statusCode = 404
            throw new Error('Usuário não encontrado')
        }

        
        res.status(200).send(user)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = userById