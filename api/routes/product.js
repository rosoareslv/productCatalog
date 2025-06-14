const express = require("express")
const router = express.Router()

/** 
 * @openapi
 * /product/save:
 *   post:
 *     summary: Salva produto no banco
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Produto cadastrado com sucesso.
 *       500:
 *          description: Erro interno ao cadastrar produto
 */
router.post("/save", (req, res) => {
    console.log(req.client)

})

/** 
 * @openapi
 * /product/update:
 *   patch:
 *     summary: Atualiza produto no banco
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso.
 *       500:
 *          description: Erro interno ao atualixar produto
 */
router.patch("/update", (req, res) => {
    console.log(req.client)

})

/** 
 * @openapi
 * /product/:id:
 *   get:
 *     summary: Retorna informações específicas do produto
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Produto retornado com sucesso.
 *       500:
 *          description: Erro interno ao retornar produto.
 */
//Só pode ser associado com uma categoria por vez
router.get("/:id", (req, res) => {

})

/** 
 * @openapi
 * /product/:id:
 *   delete:
 *     summary: Deleta produto no banco de dados
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Produto excluído com sucesso.
 *       500:
 *          description: Erro interno ao excluir produto
 */
//Só pode ser associado com uma categoria por vez
router.delete("/:id", (req, res) => {

})

/** 
 * @openapi
 * /product/list:
 *   get:
 *     summary: Retorna todos os produtos cadastrados
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Produtos retornados com sucesso.
 *       500:
 *          description: Erro interno ao retornar produtos.
 */
router.get("/list", (req, res) => {
    console.log(req.client)

})


/** 
 * @openapi
 * /product/associate:
 *   patch:
 *     summary: Associa um produto a uma categoria
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Produto associado a categoria.
 *       500:
 *         description: Erro interno ao associar produto com categoria.
 */
router.patch("/associate", (req, res) => {

})



module.exports = router