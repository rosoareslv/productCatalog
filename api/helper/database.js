const mongoose = require('mongoose')


async function connect() {
    try {
        const client = await mongoose.connect(`mongodb://master:123qwe@database:27017/catalogDB`)
        console.log("Connection to database successfull")
        return client
    } catch (error) {
        console.log("Err", error)
    }

}

module.exports = { connect }
