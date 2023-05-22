const knex = require('knex')
const dotenv = require('dotenv')


dotenv.config()


const con = knex({
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_SCHEMA

    }
})

module.exports = con