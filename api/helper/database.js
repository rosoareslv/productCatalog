const mongoose = require('mongoose')
const User = require('../models/user')


async function connect() {
    try {
        const client = await mongoose.connect(`mongodb://master:123qwe@database:27017/catalogDB`)
        console.log("Connection to database successfull")
        return client
    } catch (error) {
        console.log("Err", error)
    }

}

async function getUserUUID(req, res, next) {
    try {
        let user_db = await User.findOne({ "username": req.requestorUsername })
        req.requestorUUID = user_db._id
        next()
    } catch (error) {
        return res.status(500).json({ "message": "Erro interno na verificação do usuário" })
    }

}
module.exports = { connect, getUserUUID }
