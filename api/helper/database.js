const mongoose = require('mongoose')


async function connect() {
    try {
        const client = await mongoose.connect(`mongodb://dbko_db:27017/${process.env.MONGO_INITDB_DATABASE}`)
        console.log("Connection to database successfull")
        return client
    } catch (error) {
        console.log("Err", error)
    }

}

module.exports = { connect }
