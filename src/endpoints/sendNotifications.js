const { Expo } = require('expo-server-sdk')
const { config } = require('dotenv')
const con = require('../connections/connection')


config()


const sendNotifications = async(req, res)=>{
    var statusCode = 400
    try{

        const expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN })
        const [client] = await con('pixManager_clientLogin').where({
            id: req.params.id
        })

        if(!client){
            statusCode = 401
            throw new Error('Cliente não encontrado')
        }

        
        const { title, body } = req.body

        if(!title || !body){
            statusCode = 401
            throw new Error('A notificação está sem o corpo da mensagem')
        }

        const message = {
            to: client.expoPushToken,
            title,
            body
        }
        
        
        const result = await expo.sendPushNotificationsAsync([message])

        res.status(200).send(result)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
    

}

module.exports = sendNotifications