const jwt = require("jsonwebtoken")
const fs = require("fs")

const privateKey = fs.readFileSync("./keys/id_rsa").toString()

function createToken(username) {
    return jwt.sign({ username: username }, privateKey, { algorithm: 'RS256', expiresIn: '24h' });
}

function checkToken() {

}

module.exports = { createToken, checkToken }