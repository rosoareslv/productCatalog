
export function errorHandler(err, req, res, next) {
    console.log(err);
    if (err.message.startsWith("Cast to ObjectId failed")) {
        return res.status(400).json({ message: "Parâmetro Id inválido" });
    }
    return res.status(500).json({ message: "Erro interno no servidor" });
}


export function invalidEndpoint(req, res, next) {
    res.status(404).json("endpoint não existente");
}