const express = require("express");
const router = express.Router();
const { validateProduct } = require("../middlewares/productValidator");
const productController = require("../controllers/ecom_products");

const { isLoggedIn } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product Management
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Read Products
 *     description: >
 *       - Sem ID, return Product list.
 *       - Com ID, return unique Product  (404 if not found).
 *     tags:
 *       - Products
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: false
 *         description: Product Id for search
 *     responses:
 *       '200':
 *         description: Product List or a distinct Product
 *       '404':
 *         description: Product not found
 *       '500':
 *         description: SErver Error
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Add new Product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Product title
 *               description:
 *                 type: string
 *                 description: Product description
 *               price:
 *                 type: integer
 *                 description: Product cost/amount
 *               stock:
 *                 type: integer
 *                 description: Available item count
 *               image:
 *                 type: string
 *                 description: Product image URL
 *               category:
 *                 type: string
 *                 description: Product classification type
 *               rating:
 *                 type: number
 *                 format: float
 *                 description: Average customer rating
 *             required:
 *               - title
 *               - description
 *               - price
 *               - stock
 *               - image
 *               - category
 *               - rating
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
 * /products/{id}:
 *   put:
 *     summary: Update a Product
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Product title
 *               description:
 *                 type: string
 *                 description: Product description
 *               price:
 *                 type: integer
 *                 description: Product cost/amount
 *               stock:
 *                 type: integer
 *                 description: Available item count
 *               image:
 *                 type: string
 *                 description: Product image URL
 *               category:
 *                 type: string
 *                 description: Product classification type
 *               rating:
 *                 type: number
 *                 format: float
 *                 description: Average customer rating
 *             required:
 *               - title
 *               - description
 *               - price
 *               - stock
 *               - image
 *               - category
 *               - rating
 *             example:
 *               title: "Wireless Bluetooth Headphones"
 *               description: "High-quality wireless headphones with noise cancellation and 20h battery life."
 *               price: "89.99"
 *               stock: "150"
 *               image: "https://example.com/images/headphones.jpg"
 *               category: "electronics"
 *               rating: 5
 *     responses:
 *       '200':
 *         description: Product updated successfully
 *       '400':
 *         description: Invalid request body or ID format
 *       '404':
 *         description: Product not found
 *       '500':
 *         description: Server error
 */

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a Product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID for delete
 *     responses:
 *       200:
 *         description: Product deleted
 *       404:
 *         description: Record not found
 *       '500':
 *         description: Server error
 */

router.get("/", productController.getProducts); //get - read
router.post("/", isLoggedIn, validateProduct, productController.createProduct); //post - create
router.put(
  "/:id",
  isLoggedIn,
  validateProduct,
  productController.updateProduct
); //put - update
router.delete("/:id", isLoggedIn, productController.deleteProduct); //delete

module.exports = router;
