const con = require('../connections/connection')



const updatePushToken = async(req, res)=>{
    var statusCode = 400
    try{

        const { expoPushToken } = req.body
        const [user] = await con('pixManager_userLogin').where({
            id: req.params.id
        })
        
        if(!user){
            statusCode = 404
            throw new Error('Usuário não encontrado')
        }


        await con('pixManager_userLogin').update({
            name: user.name,
            email: user.email,
            password: user.password,
            imageName: user.imageName,
            imageData: user.imageData,
            expoPushToken
        }).where({
            id: user.id
        })


        res.status(200).send('Push token do usuário atualizado')
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = updatePushToken