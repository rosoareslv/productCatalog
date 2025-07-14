const express = require("express")
const User = require("../models/user")
const hash = require("../helper/hash")
const token = require("../helper/token")
const { loginUser, registerUser } = require("../helper/validators")
const router = express.Router()

router.post('/register', async (req, res, next) => {
    try {
        let registerValidation = registerUser.validate(req.body)
        if(registerValidation.error != undefined) {
            return res.status(400).json({ message: "Erro na validação", success: false, error: registerValidation.error.message }) 
        }
        let username = await User.findOne({ username: req.body.username})
        if (username != null) {
            return res.status(403).json({ message: "Username indisponível", success: false, username: req.body.username }) 
        }
        req.body.password = await hash.generateHash(req.body.password)
        await new User(req.body).save()
        return res.status(200).json({ message: "Usuário criado com sucesso!", success: true, username: req.body.username })
    } catch (error) {
        next(error)
    }
})


router.post('/login', async (req, res, next) => {
    try {
        let loginValidation = loginUser.validate(req.body)
        if (loginValidation.error != undefined) {
            return res.status(400).json({ message: "Erro na validação", success: false, error: loginValidation.error.message }) 
        }
        let user_db = await User.findOne({ "username": req.body.username })
        let is_user = await hash.checkPassword(req.body.password, user_db.password)
        if (!is_user) {
            return res.status(401).json({ message: "Não autorizado", success: false, })
        }
        let user_token = token.createToken(req.body.username)
        return res.status(200).json({
            message: "Usuário autenticado com sucesso",
            username: req.body.username,
            success: true,
            token: user_token
        })
    } catch (error) {
        next(error)
    }
})

module.exports = router