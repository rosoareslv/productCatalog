const jwt = require("jsonwebtoken")
const fs = require("fs")

const privateKey = fs.readFileSync("./keys/id_rsa").toString()

function createToken() {
    //TODO gerar token com expiracao definida
    return jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' });
}

function checkToken() {

}

module.exports = { createToken, checkToken }