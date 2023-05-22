const bcrypt = require('bcryptjs')


class Authentication {
    hash = (txt)=>{
        const rounds = 12
        const salt = bcrypt.genSaltSync(rounds)
        const cypher = bcrypt.hashSync(txt, salt)

        return cypher
    }

    compare = (txt, hash)=>{
        return bcrypt.compareSync(txt, hash)
    }
}

module.exports = Authentication