const express = require("express")
const router = express.Router()

/** 
 * @openapi
 * /category/save:
 *   post:
 *     summary: Salva categoria no banco
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Categoria cadastrado com sucesso.
 *       500:
 *          description: Erro interno ao cadastrar categoria
 */
router.post('/save', () => {

})

/** 
 * @openapi
 * /category/update:
 *   patch:
 *     summary: Atualiza registro de categoria no banco
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Categoria atualizado com sucesso.
 *       500:
 *          description: Erro interno ao atualizar categoria
 */
router.patch("/update", (req, res) => {
    console.log(req.client)

})

/** 
 * @openapi
 * /category/:id:
 *   get:
 *     summary: Retorna informações específicas da categoria
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Categoria retornada com sucesso.
 *       500:
 *          description: Erro interno ao retornar categoria
 */
router.get("/:id", (req, res) => {

})

/** 
 * @openapi
 * /category/:id:
 *   delete:
 *     summary: Deletar categoria do banco de dados
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Categoria excluída com sucesso.
 *       500:
 *          description: Erro interno ao excluir categoria
 */
router.delete("/:id", (req, res) => {

})

/** 
 * @openapi
 * /category/list:
 *   get:
 *     summary: Retornar todas as categorias cadastradas
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Categorias retornadas com sucesso.
 *       500:
 *          description: Erro interno ao retornar categorias.
 */
router.get("/list", () => {

})

module.exports = router