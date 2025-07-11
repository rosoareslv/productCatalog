const express = require("express")
const Product = require("../models/product")
const { trusted } = require("mongoose")
const router = express.Router()


router.post("/save", async (req, res, next) => {
    try {
        let body = req.body
        body.ownerId = req.requestorUUID
        let product = new Product(body)
        await product.save()
        return res.status(200).json({
            "message": "Produto criado com sucesso!",
            "product": product
        })
    } catch (error) {
        next(error)
    }
})

router.patch("/:id", async (req, res, next) => {
    try {
        if (req.body.ownerId != undefined) {
            delete req.body.ownerId
        }
        if (req.body._id != undefined) {
            delete req.body._id
        }
        let product = await Product.findOneAndUpdate({ _id: req.params["id"], ownerId: req.requestorUUID }, req.body, { returnDocument: "after", runValidators: true })
        if (product == null) {
            return res.status(404).json({ "message": `Produto ${req.params["id"]} não identificado` })
        }
        return res.status(200).json({ "message": `Produto ${req.params["id"]} atualizado`, "product": product })
    } catch (error) {
        next(error)
    }
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