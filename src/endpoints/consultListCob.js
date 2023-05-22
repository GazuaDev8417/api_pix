const con = require('../connections/connection')
const GNRequests = require('../api/gerencianet')


const consultListCob = async(req, res)=>{
    var statusCode = 400
    try{

        const reqGNAlready = GNRequests()
        const inicio = new Date('2023-01-01').toLocaleDateString('pt-BR', { timeZone: 'UTC'})
        const fim = new Date().toLocaleDateString('pt-BR', { timeZone: 'UTC' })
        
        
        const initDate = inicio.split('/')
        const endDate = fim.split('/')
        
        const convertInit = `${initDate[2]}-${initDate[1]}-${initDate[0]}`
        const convertEnd = `${endDate[2]}-${endDate[1]}-${endDate[0]}`

        
        const inicioHr = '00:00:00'
        const fimHr = '23:59:59'
        
        
        const reqGN = await reqGNAlready
        const listCob = await reqGN.get(`/v2/cob?inicio=${convertInit}T${inicioHr}Z&fim=${convertEnd}T${fimHr}Z`)
        const listaGN = listCob.data.cobs
        
            
        // const { userId } = req.body
        // const [user] = await con('pixManager_userLogin').where({
        //     id: userId
        // })

        // if(!user){
        //     statusCode = 404
        //     throw new Error('Usuário não encontrado')
        // }        
        

        // const result = await con('pixManager_userCobs').where({
        //     provider: user.id
        // })


        // if(result.length === 0){
        //     statusCode = 400
        //     throw new Error('Não houve cobranças durante esse período')
        // }

        
        // listaGN.map(cob=>{
        //     return result.map(async res=>{
        //         if(cob.txid === res.txid)
        //         await con('pixManager_userCobs').update({
        //             valor: res.valor,
        //             criacao: res.criacao,
        //             provider: res.provider,
        //             status: cob.status
        //         }).where({
        //             provider: user.id
        //         })                      
        //     })
        // })


        // const novaLista = await con('pixManager_userCobs').where({
        //     provider: user.id
        // })

                
        
        res.status(200).send(listaGN)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }

}

module.exports = consultListCob