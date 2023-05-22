const GNRequests = require('../api/gerencianet')
const con = require('../connections/connection')


const editCob = async(req, res)=>{
    var statusCode = 400
    try{

        const reqGNAlready = GNRequests()
        const{ valor, txid } = req.body

        if(!valor){
            statusCode = 401
            throw new Error('Preencha os campos')
        }


        const dataCob = {
            valor: {
                "original": valor
            }
        }

        const reqGN = await reqGNAlready

        const consultCob = await reqGN.get(`/v2/cob/${txid}`)
        
        if(consultCob.data.status === 'CONCLUIDA'){
            statusCode = 403
            throw new Error('Cobranças com status "CONCLUIDA" não podem ser alteradas')
        }


        await reqGN.patch(`/v2/cob/${txid}`, dataCob)            
        
        
        await con('pixManager_userCobs').update({
            valor
        }).where({
            txid
        })


        res.status(200).send(`Cobrança revisada. Novo valor: R$ ${valor}`)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = editCob