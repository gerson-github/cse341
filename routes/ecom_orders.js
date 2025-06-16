const express = require("express");
const router = express.Router();

const orderController = require("../controllers/ecom_orders");

const { isLoggedIn } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order Management
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Read Orders
 *     description: >
 *       - Sem ID, return Order list.
 *       - Com ID, return unique Order  (404 if not found).
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: false
 *         description: Order Id for search
 *     responses:
 *       '200':
 *         description: Order List or a distinct Order
 *       '404':
 *         description: Order not found
 *       '500':
 *         description: SErver Error
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Add new Order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: User Code
 *               items:
 *                 type: string
 *                 description: Item description
 *               totalPrice:
 *                 type: integer
 *                 description: Total
 *               status:
 *                 type: string
 *                 description:  (e.g., "Paid", "Pending")
 *               paymentInfo:
 *                 type: string
 *                 description: Info about payment method (e.g., credit card, PayPal)
 *             required:
 *               - userId
 *               - items
 *               - totalPrice
 *               - status
 *               - paymentInfo
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
 * /orders/{id}:
 *   put:
 *     summary: Update a Order
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Order ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: User Code
 *               items:
 *                 type: string
 *                 description: Item description
 *               totalPrice:
 *                 type: integer
 *                 description: Total
 *               status:
 *                 type: string
 *                 description:  (e.g., "Paid", "Pending")
 *               paymentInfo:
 *                 type: string
 *                 description: Info about payment method (e.g., credit card, PayPal)
 *             required:
 *               - userId
 *               - items
 *               - totalPrice
 *               - status
 *               - paymentInfo
 *             example:
 *               userId: "10"
 *               items: "Notebook"
 *               totalPrice: 45
 *               status: "active"
 *               paymentInfo: "Debit"
 *     responses:
 *       '200':
 *         description: order updated successfully
 *       '400':
 *         description: Invalid request body or ID format
 *       '404':
 *         description: Order not found
 *       '500':
 *         description: Server error
 */

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete a Order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID for delete
 *     responses:
 *       200:
 *         description: Order deleted
 *       404:
 *         description: Record not found
 *       '500':
 *         description: Server error
 */

router.get("/", orderController.getOrders); //get - read
router.post("/", isLoggedIn, orderController.createOrder); //post - create
router.put("/:id", isLoggedIn, orderController.updateOrder); //put - update
router.delete("/:id", isLoggedIn, orderController.deleteOrder); //delete

module.exports = router;
