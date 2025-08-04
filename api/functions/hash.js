const bcrypt = require('bcryptjs')

const SALT_NUMBER = 10

async function generateHash(password) {
    let salt = await bcrypt.genSalt(SALT_NUMBER)
    let hash = await bcrypt.hash(password, salt)
    return hash
}

async function checkPassword(password, hash) {
    return await bcrypt.compare(password, hash)
}

module.exports = { generateHash, checkPassword }