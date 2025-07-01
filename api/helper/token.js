const jwt = require("jsonwebtoken")
const fs = require("fs");
const { decode } = require("punycode");

const privateKey = fs.readFileSync("./keys/id_rsa").toString()

function createToken(data) {
    return jwt.sign(data, privateKey, { algorithm: 'RS256', expiresIn: "24h" });
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