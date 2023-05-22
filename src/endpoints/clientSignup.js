const con = require('../connections/connection')
const uuid = require('uuid')
const Authentication = require('../services/Authentication')



const clientSignup = async(req, res)=>{
    var statusCode = 400
    try{

        const { name, email, password } = req.body

        if(!name || !email || !password){
            statusCode = 401
            throw new Error('Preencha os campos')
        }


        const [user] = await con('pixManager_clientLogin').where({
            email
        })

        if(user){
            statusCode = 403
            throw new Error('Email já cadastrado')
        }

        
        await con('pixManager_clientLogin').insert({
            id: uuid.v4(),
            name,
            email,
            password: new Authentication().hash(password)
        })


        res.status(201).send(`Cliente ${name} cadastrado`)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = clientSignup