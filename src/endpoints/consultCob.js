const GNRequests = require("../api/gerencianet")
// const con = require('../connections/connection')


const consultCob = async(req, res)=>{
    var statusCode = 400
    try{

        const reqGNAlready = GNRequests()
        // const { txid } = req.body


        // if(!txid){
        //     statusCode = 401
        //     throw new Error('Necessário o txid da cobrança')
        // }


        // const [cob] = await con('pixManager_userCobs').where({
        //     txid
        // })
       

        const reqGN = await reqGNAlready

        const consultCob = await reqGN.get(`/v2/cob/${req.params.txid}`)
        const result = consultCob.data
        

        res.status(200).send(result)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = consultCob