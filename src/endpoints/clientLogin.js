const con = require('../connections/connection')
const Authentication = require('../services/Authentication')



const clientLogin = async(req, res)=>{
    var statusCode = 400
    try{

        const { email, password } = req.body

        if(!email || !password){
            statusCode = 401
            throw new Error('Preencha os campos')
        }


        const [user] = await con('pixManager_clientLogin').where({
            email
        })

        if(!user){
            statusCode = 404
            throw new Error('Cliente não encontrado')
        }


        const compare = new Authentication().compare(password, user.password)

        if(!compare){
            statusCode = 404
            throw new Error('Cliente não encontrado')
        }


        res.status(201).send(user.id)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = clientLogin