const GNRequests = require('../api/gerencianet')


const clientPixEnv = async(req, res)=>{
    var statusCode = 400
    try{

        const reqGNAlready = GNRequests()


        const reqGN = await reqGNAlready

        const listPix = await reqGN.get(`/v2/gn/pix/enviados/${req.params.id}`)
        const result = listPix.data
        

        res.status(200).send(result)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = clientPixEnv