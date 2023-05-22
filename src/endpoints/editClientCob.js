const GNRequests = require('../api/gerencianet')


const editClientCob = async(req, res)=>{
    var statusCode = 400
    try{

        const reqGNAlready = GNRequests()
        const{ valor } = req.body

        if(!valor){
            statusCode = 401
            throw new Error('Coloque um para realizar a alteração')
        }


        const dataCob = {
            valor: {
                "original": valor
            }
        }

        const reqGN = await reqGNAlready

        const consultCob = await reqGN.get(`/v2/cob/${req.params.txid}`)
        
        if(consultCob.data.status === 'CONCLUIDA'){
            statusCode = 403
            throw new Error('Cobranças com status "CONCLUIDA" não podem ser alteradas')
        }


        await reqGN.patch(`/v2/cob/${req.params.txid}`, dataCob)  


        res.status(200).send(`Cobrança revisada. Novo valor: R$ ${valor}`)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = editClientCob