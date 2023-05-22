const con = require('../connections/connection')



const showUserImage = async(req, res)=>{
    var statusCode = 400
    try{
        
        const [image] = await con('pixManager_userLogin').where({
            id: req.params.id
        })
        
        if(!image.imageName && !image.imageData){
            statusCode = 404
            throw new Error('Imagem não encontrada')
        }
        
        
        const imageDataBuffer = Buffer.from(image.imageData, 'base64')
        res.setHeader('Content-Type', 'image/jpeg')
        const result = imageDataBuffer.toString('base64')
        
        
        res.status(200).send(result)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}


module.exports = showUserImage