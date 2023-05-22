const GNRequests = require('../api/gerencianet')
const con = require('../connections/connection')
const uuid = require('uuid')


const gerarCob = async(req, res)=>{
    var statusCode = 400
    try{

        const reqGNAlready = GNRequests()
        const { valor, msg } = req.body
        

        if(!valor){
            statusCode = 401
            throw new Error('Preencha os campos')
        }


        const dataCob = {
            calendario: {
                "expiracao": 3600
            },
            valor: {
                "original": valor
            },
            chave: 'a2e6724d-3772-4c92-94e0-1622cf3efa01',
            "solicitacaoPagador": "Informe o número ou identificador do pedido."
        }
        
        
        const reqGN = await reqGNAlready

        const cobResponse = await reqGN.post('/v2/cob', dataCob)
        const result = cobResponse.data

        
        res.status(200).send({ result, msg })
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = gerarCob