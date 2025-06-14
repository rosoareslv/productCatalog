const express = require("express")
const router = express.Router()

router.post("/save", (req, res) => {
    console.log(req.client)

})

router.patch("/update", (req, res) => {
    console.log(req.client)

})

//Só pode ser associado com uma categoria por vez
router.delete("/:id", (req, res) => {

})

router.get("/list", (req, res) => {
    console.log(req.client)

})


//associar produto com categoria
router.patch("/associate", (req, res) => {

})



module.exports = router