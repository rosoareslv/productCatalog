const jwt = require("jsonwebtoken")
const fs = require("fs");

const privateKey = fs.readFileSync("./keys/id_rsa").toString()


function createToken(username) {
    return jwt.sign({ username: username }, privateKey, { algorithm: 'RS256', expiresIn: '24h' });

}

function checkToken(req, res, next) {
    try {
        let token = req.headers["authorization"]
        if (!token) {
            return res.status(500).json({ "message": "Token não fornecido" })
        }
        let obj = jwt.verify(token.replace("Bearer ", ""), privateKey)
        req.requestorUsername = obj.username
        next()
    } catch (error) {
        if (error.message == "invalid signature") {
            return res.status(500).json({ "message": "Token inválido" })
        }
        return res.status(500).json({ "message": "Erro interno na verificação do token" })
    }

}

module.exports = { createToken, checkToken }