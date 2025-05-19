const express = require("express");
const router = express.Router();
// const Contacts = require("../models/contacts");
const contactController = require("../controllers/contacts");

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: Contact Management
 */

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Recupera contatos
 *     description: >
 *       - Sem `?id`, retorna todos os contatos.
 *       - Com `?id={contactId}`, retorna um único contato (404 se não achar).
 *     tags:
 *       - Contacts
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: false
 *         description: ID do contato a buscar
 *     responses:
 *       '200':
 *         description: Lista de contatos ou único contato
 *       '404':
 *         description: Contato não encontrado
 *       '500':
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Cria um novo contato
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *     responses:
 *       201:
 *         description: Contato criado com sucesso
 */

/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Atualiza um contato existente
 *     tags:
 *       - Contacts
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do contato a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: Primeiro nome do contato
 *               lastName:
 *                 type: string
 *                 description: Sobrenome do contato
 *               email:
 *                 type: string
 *                 format: email
 *                 description: E-mail do contato
 *               favoriteColor:
 *                 type: string
 *                 description: Cor favorita
 *               birthday:
 *                 type: string
 *                 format: date
 *                 description: Data de nascimento (YYYY-MM-DD)
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Timestamp de criação
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *             example:
 *               firstName: "gerson - BYU"
 *               lastName: "teste"
 *               email: "teste.doe@example.com"
 *               favoriteColor: "Blue"
 *               birthday: "1990-05-15"
 *               date: "2025-05-16T21:18:25.870Z"
 *     responses:
 *       '200':
 *         description: Contato atualizado com sucesso
 *       '400':
 *         description: Requisição inválida
 *       '404':
 *         description: Contato não encontrado
 *       '500':
 *         description: Erro interno do servidor
 */


/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Remove um contato
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do contato
 *     responses:
 *       200:
 *         description: Contato deletado com sucesso
 *       404:
 *         description: Contato não encontrado
 */

console.log('----------------------------ROUTE !!!! ROUTE ROUTE ROUTE ROUTE ROUTE ROUTE ROUTE ROUTE--------------------------------------------')

router.get("/", contactController.getContacts); //get - read
router.post("/", contactController.createContact); //post - create
router.put("/:id", contactController.updateContact); //put - update
router.delete("/:id", contactController.deleteContact); //delete

module.exports = router;
