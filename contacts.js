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
 *     summary: Read contacts
 *     description: >
 *       - Sem ID, return contact list.
 *       - Com ID, return unique contact  (404 if not found).
 *     tags:
 *       - Contacts
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: false
 *         description: Contact Id for search
 *     responses:
 *       '200':
 *         description: Contact List or a distinct contact 
 *       '404':
 *         description: Contact not found
 *       '500':
 *         description: SErver Error
 */

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Add new Contact 
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
 *         description: Created successfuly
 */

/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Update a contact 
 *     tags:
 *       - Contacts
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Contact ID for update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: First Name
 *               lastName:
 *                 type: string
 *                 description: Last Name
 *               email:
 *                 type: string
 *                 format: email
 *                 description: E-mail 
 *               favoriteColor:
 *                 type: string
 *                 description: Favorite Color
 *               birthday:
 *                 type: string
 *                 format: date
 *                 description: BDT (YYYY-MM-DD)
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Date created 
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
 *         description: Record updated
 *       '400':
 *         description: Request Invalid
 *       '404':
 *         description: Record not found
 *       '500':
 *         description: Server Error
 */


/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a Contact
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Contact ID for delete
 *     responses:
 *       200:
 *         description: Contact deleted
 *       404:
 *         description: Record not found
 */


router.get("/", contactController.getContacts); //get - read
router.post("/", contactController.createContact); //post - create
router.put("/:id", contactController.updateContact); //put - update
router.delete("/:id", contactController.deleteContact); //delete

module.exports = router;
