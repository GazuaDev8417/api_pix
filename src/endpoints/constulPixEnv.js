const GNRequests = require('../api/gerencianet')


const consulPixEnv = async(req, res)=>{
    var statusCode = 400
    try{

        const reqGNAlready = GNRequests()
        const { inicio, fim } = req.body

        if(!inicio || !fim){
            statusCode = 401
            throw new Error('Preencha os campos')
        }

        const inicioHr = '00:00:00'
        const fimHr = '23:59:59'


        if(new Date(inicio).getTime() > new Date(fim).getTime()){
            statusCode = 403
            throw new Error('A data de ínicio de ser menor que o fim')
        }


        const initDate = inicio.split('/')
        const endDate = fim.split('/')

        const convertInit = `${initDate[2]}-${initDate[1]}-${initDate[0]}`
        const convertEnd = `${endDate[2]}-${endDate[1]}-${endDate[0]}`


        const reqGN = await reqGNAlready

        const listPix = await reqGN.get(`/v2/gn/pix/enviados?inicio=${convertInit}T${inicioHr}Z&fim=${convertEnd}T${fimHr}Z`)
        const result = listPix.data

        if(result.pix.length === 0){
            statusCode = 403
            throw new Error('Não houve envio de pix nesse período')
        }
        

        res.status(200).send(result)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = consulPixEnv