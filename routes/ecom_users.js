const express = require("express");
const router = express.Router();
const userController = require("../controllers/ecom_users");
const { validateUser } = require("../middlewares/userValidator");

const { isLoggedIn } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User Management
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Read Users
 *     description: >
 *       - Sem ID, return User list.
 *       - Com ID, return unique User  (404 if not found).
 *     tags:
 *       - Users
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: false
 *         description: User Id for search
 *     responses:
 *       '200':
 *         description: User List or a distinct User
 *       '404':
 *         description: User not found
 *       '500':
 *         description: SErver Error
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Add new User
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: User's given name
 *               lastName:
 *                 type: string
 *                 description: User's family name
 *               email:
 *                 type: string
 *                 description: User email address
 *               role:
 *                 type: string
 *                 description: User access level
 *               address:
 *                 type: string
 *                 description: User's home address
 *             required:
 *               - email
 *               - role
 *     responses:
 *       '201':
 *         description: Created successfully
 *       '400':
 *         description: Invalid input
 *       '500':
 *         description: Server error
 */
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a User
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: User's given name
 *               lastName:
 *                 type: string
 *                 description: User's family name
 *               email:
 *                 type: string
 *                 description: User email address
 *               role:
 *                 type: string
 *                 description: User access level
 *               address:
 *                 type: string
 *                 description: User's home address
 *             required:
 *               - email
 *               - role
 *             example:
 *               firstName: "John"
 *               lastName: "Smith"
 *               email: "John.Smith example.com"
 *               role: "admin"
 *               address: "12s 12n unit 10"
 *     responses:
 *       '200':
 *         description: User updated successfully
 *       '400':
 *         description: Invalid request body or ID format
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Server error
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a User
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID for delete
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: Record not found
 *       '500':
 *         description: Server error
 */

router.get("/", userController.getUsers); //get - read

router.post("/", isLoggedIn, validateUser, userController.createUser); //post - create
router.put("/:id", isLoggedIn, validateUser, userController.updateUser); //put - update
router.delete("/:id", isLoggedIn, userController.deleteUser); //delete

module.exports = router;
