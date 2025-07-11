const express = require("express")
const Product = require("../models/product")
const router = express.Router()


router.post("/save", async (req, res) => {
    try {
        let body = req.body
        body.ownerId = req.requestorUUID
        let product = new Product(body)
        console.log(product)
        await product.save()
        return res.status(200).json({
            "message": "Produto criado com sucesso!",
            "product": product
        })
    } catch (error) {
        console.log(error)
        if (error.name == "ValidationError") {
            return res.status(422).json({ "message": "Validação mal sucedida, verifique os campos passados." })
        }
        return res.status(500).json({ "message": "Erro interno no servidor" })
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