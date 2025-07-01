const express = require("express")
const User = require("../models/user")
const hash = require("../helper/hash")
const token = require("../helper/token")
const router = express.Router()


router.post('/register', async (req, res) => {
    try {
        let body = req.body
        let user = new User(body)
        user.password = await hash.generateHash(body.password)
        await user.save()
        return res.status(200).json({ "message": "Usuário criado com sucesso!" })
    } catch (error) {
        if (error.name == "ValidationError") {
            return res.status(422).json({ "message": "Validação mal sucedida, verifique os campos passados." })
        } else if (error.name == "MongoServerError") {
            if (error.code == 11000) {
                return res.status(422).json({ "message": "username já escolhido!" })
            }
        }
        return res.status(500).json({ "message": "Erro interno no servidor" })
    }
})


//verificar se ja possui token ativo
router.post('/login', async (req, res) => {
    try {
        let { username, password } = req.body
        let user_db = await User.findOne({ "username": username })
        let is_user = await hash.checkPassword(password, user_db.password)
        if (!is_user) {
            return res.status(401).json({ "message": "Não autorizado" })
        }
        let user_token = token.createToken({"username": username})
        return res.status(200).json({ 
            "message": "Usuário autenticado com sucesso",
            "username" : username,
            "token": user_token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ "message": "Erro interno no servidor" })
    }


})

module.exports = router