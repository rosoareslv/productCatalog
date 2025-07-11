const express = require("express")
const Product = require("../models/product")
const router = express.Router()


router.post("/save", (req, res) => {
    try {
        //validar campos passados

        //pegar pelo token o username, e atribui o ownerId o id do user na base
        //salvar produto
        //retornar produto salvo
        let body = req.body
        let headers = req.headers
        console.log(headers)
        let product = new Product(body)


    } catch (error) {

    }


})


router.patch("/update", (req, res) => {
    console.log(req.client)

})


router.get("/:id", (req, res) => {

})


router.delete("/:id", (req, res) => {

})


router.get("/list", (req, res) => {
    console.log(req.client)

})

//Só pode ser associado com uma categoria por vez
router.patch("/associate", (req, res) => {

})


module.exports = router