const express = require("express")
const router = express.Router()

router.post('/save', () => {

})

router.patch("/update", (req, res) => {
    console.log(req.client)

})

router.delete("/:id", (req, res) => {

})


router.get("/list", () => {

})

module.exports = router