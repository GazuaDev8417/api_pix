const GNRequests = require('../api/gerencianet')


const consultSaldo = async(req, res)=>{
    var statusCode = 400
    try{

        const reqGNAlready = GNRequests()
        const reqGN = await reqGNAlready

        
        const getBalance = await reqGN.get('/v2/gn/saldo')
        const balance = getBalance.data


        res.status(200).send(balance)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = consultSaldo