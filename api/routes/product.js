const express = require("express")
const Product = require("../models/product")
const Category = require("../models/category")
const { updateProduct, registerProduct, linkCategory } = require("../helper/validators")
const router = express.Router()


router.post("/save", async (req, res, next) => {
    try {
        let productValidation = registerProduct.validate(req.body)
        if (productValidation.error != undefined) {
            return res.status(400).json({ message: "Erro na validação", success: false, error: productValidation.error.message })
        }
        let body = req.body
        body.ownerId = req.requestorUUID
        let product = new Product(body)
        await product.save()
        return res.status(200).json({
            message: "Produto criado com sucesso!",
            success: true,
            product: product
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.get("/list", async (req, res) => {
    try {
        let products = await Product.find({ ownerId: req.requestorUUID })
        if (products.length == 0) {
            return res.status(404).json({ message: `Usuário ${req.requestorUsername} sem produtos cadastrados`, success: false })
        }
        return res.status(200).json({ total: products.length, success: true, products: products })
    } catch (error) {
        next(error)
    }
})

//TODO: Criar rota de categoria e testar este endpoint
router.post("/associate", async (req, res, next) => {
    try {
        let associateValidation = linkCategory.validate(req.body)
        if (associateValidation.error != undefined) {
            return res.status(400).json({ message: "Erro na validação", success: false, error: associateValidation.error.message })
        }
        console.log("ola zap")
        let category = await Category.findOne({ title: req.body.category, ownerId: req.requestorUUID })
        if (category == null) {
            return res.status(404).json({ message: `Categoria ${req.body.category} não identificado para o user ${req.requestorUUID}`, success: false })
        }
        let product = await Product.findOne({ _id: req.body.productId, ownerId: req.requestorUUID })
        if (product == null) {
            return res.status(404).json({ message: `Product ${req.body.productId} não identificado para o user ${req.requestorUUID}`, success: false })
        }
        product = await Product.findOneAndUpdate({ _id: req.body.productId, ownerId: req.requestorUUID }, { category: req.body.category }, { returnDocument: "after" })
        return res.status(200).json({ message: `Produto ${req.body.productId} linkado a categoria ${req.body.category}`, product: product, success: true })
    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.patch("/:id", async (req, res, next) => {
    try {
        let productValidation = updateProduct.validate(req.body)
        if (productValidation.error != undefined) {
            return res.status(400).json({ message: "Erro na validação", success: false, error: productValidation.error.message })
        }
        req.body.lastUpdateDate = Date.now()
        let product = await Product.findOneAndUpdate({ _id: req.params["id"], ownerId: req.requestorUUID }, req.body, { returnDocument: "after", runValidators: true })
        if (product == null) {
            return res.status(404).json({ message: `Produto ${req.params["id"]} não identificado para o user ${req.requestorUUID}`, success: false })
        }
        return res.status(200).json({ message: `Produto ${req.params["id"]} atualizado`, product: product, success: true })
    } catch (error) {
        next(error)
    }
})


router.get("/:id", async (req, res, next) => {
    try {
        let product = await Product.findOne({ _id: req.params["id"], ownerId: req.requestorUUID })
        if (product == null) {
            return res.status(404).json({ "message": `Produto ${req.params["id"]} não identificado para o user ${req.requestorUUID}`, success: false })
        }
        return res.status(200).json(product)
    } catch (error) {
        next(error)
    }

})


router.delete("/:id", async (req, res) => {
    try {
        let product = await Product.findOneAndDelete({ _id: req.params["id"], ownerId: req.requestorUUID })
        if (product == null) {
            return res.status(404).json({ "message": `Produto ${req.params["id"]} não identificado para o user ${req.requestorUUID}` })
        }
        return res.status(200).json({ message: "Produto deletado com sucesso", product: product })
    } catch (error) {
        next(error)
    }
})


module.exports = router