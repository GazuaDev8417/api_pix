const GNRequests = require("../api/gerencianet")


const clientCob = async(req, res)=>{
    var statusCode = 400
    try{

        const reqGNAlready = GNRequests()
        const txid = req.params.id
      

        const reqGN = await reqGNAlready

        const consultCob = await reqGN.get(`/v2/cob/${txid}`)
        const result = consultCob.data
        

        res.status(200).send(result)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = clientCob