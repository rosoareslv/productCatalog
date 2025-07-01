const jwt = require("jsonwebtoken")
const fs = require("fs");
const { decode } = require("punycode");

const privateKey = fs.readFileSync("./keys/id_rsa").toString()


function createToken(username) {
    return jwt.sign({ username: username }, privateKey, { algorithm: 'RS256', expiresIn: '24h' });

}

function checkToken(token) {
    try {
        let decoded = jwt.verify(token, privateKey);
        console.log(decoded)
    } catch (error) {
        console.log(error)
    }
}

module.exports = { createToken, checkToken }