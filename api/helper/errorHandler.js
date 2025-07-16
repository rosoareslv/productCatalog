
function errorHandler(err,req,res, next) {
    if (err.message.startsWith("Cast to ObjectId failed")) {
        return res.status(400).json({ "message": "Parâmetro Id inválido" })
    }
    return res.status(500).json({ "message": "Erro interno no servidor" })
}

module.exports = { errorHandler }