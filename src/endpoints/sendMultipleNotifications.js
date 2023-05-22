const con = require('../connections/connection')
const { Expo } = require('expo-server-sdk')
const { config } = require('dotenv')


config()



const sendMultipleNotifications = async(req, res)=>{
    var statusCode = 400
    try{

        const expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN })
        const { title, body } = req.body

        if(!title || !body){
            statusCode = 401
            throw new Error('Notificação sem corpo da mensagem')
        }


        const users = await con('pixManager_userLogin')

        const messages = users.map(token=>{
            const content = {
                to: token.expoPushToken,
                title,
                body
            }

            return content
        })

        
        const result = await expo.sendPushNotificationsAsync(messages)

        res.status(200).send(result)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = sendMultipleNotifications