const con = require('../connections/connection')



const delCob = async(req, res)=>{
    var statusCode = 400
    try{

        const [cob] = await con('pixManager_userCobs').where({
            txid: req.params.id
        })

        if(!cob){
            statusCode = 404
            throw new Error('Cobrança não encontrado')
        }

        await con('pixManager_userCobs').del().where({
            txid: cob.txid
        })


        res.status(200).send(`Cobrança excluído(a)`)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = delCob