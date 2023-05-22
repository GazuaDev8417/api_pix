const con = require('../connections/connection')



const uploadClientImage = async(req, res)=>{
    var statusCode = 400
        try{
            
            const { name, data } = req.files.foto
            const [user] = await con('pixManager_clientLogin').where({
                id: req.params.id
            })
            
            if(!user){
                statusCode = 404
                throw new Error('Usuário não encontrado')
            }
            
            
            await con('pixManager_clientLogin').update({
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
                imageName: name,
                imageData: data
        }).where({
            id: user.id
        })        
        
        
        res.status(200).send('Imagem enviada com sucesso')
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = uploadClientImage


