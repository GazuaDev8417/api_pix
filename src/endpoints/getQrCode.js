const GNRequests = require('../api/gerencianet')



const getQrCode = async(req, res)=>{
    var statusCode = 400
    try{

        const reqGNAlready = GNRequests()
        const { valor } = req.body
        

        if(!valor){
            statusCode = 401
            throw new Error('Defina o valor à pagar')
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
        const qrCodeResponse = await reqGN.get(`v2/loc/${cobResponse.data.loc.id}/qrcode`)
        const qrCode = qrCodeResponse.data


        res.status(200).send(qrCode)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}


module.exports = getQrCode