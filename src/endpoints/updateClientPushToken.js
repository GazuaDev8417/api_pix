const con = require('../connections/connection')



const updateClientPushToken = async(req, res)=>{
    var statusCode = 400
    try{

        const { expoPushToken } = req.body
        const [client] = await con('pixManager_clientLogin').where({
            id: req.params.id
        })
    
        if(!client){
            statusCode = 404
            throw new Error('Cliente não encontrado')
        }


        await con('pixManager_clientLogin').update({
            name: client.name,
            email: client.email,
            password: client.password,
            imageName: client.imageName,
            imageData: client.imageData,
            expoPushToken
        }).where({
            id: client.id
        })
        
        
        res.status(200).send('Push token do cliente atualizado')
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = updateClientPushToken