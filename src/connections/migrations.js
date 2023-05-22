const con = require('./connection')


con.raw(`CREATE TABLE IF NOT EXISTS pixManager_products(id VARCHAR(255) PRIMARY KEY NOT NULL,
    nome VARCHAR(50) NOT NULL, preco FLOAT NOT NULL)
`).then(()=>{
    console.log('Table was created successfully')
}).catch(error=>{
    console.log('Failed to create table: ', error)
}).finally(()=>{
    console.log('Thanks a lot')
})