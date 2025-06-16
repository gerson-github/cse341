const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/ecom_reviews");

const { isLoggedIn } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Review Management
 */

/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Read Reviews
 *     description: >
 *       - Sem ID, return Review list.
 *       - Com ID, return unique Review  (404 if not found).
 *     tags:
 *       - Reviews
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: false
 *         description: Review Id for search
 *     responses:
 *       '200':
 *         description: Review List or a distinct Review
 *       '404':
 *         description: Review not found
 *       '500':
 *         description: SErver Error
 */

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Add new Review
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of reviewer
 *               productId:
 *                 type: string
 *                 description: ID of product
 *               rating:
 *                 type: integer
 *                 description: User's star rating
 *               comment:
 *                 type: string
 *                 description: User's text feedback
 *             required:
 *               - userId
 *               - productId
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
 * /reviews/{id}:
 *   put:
 *     summary: Update a Review
 *     tags:
 *       - Reviews
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Review ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of reviewer
 *               productId:
 *                 type: string
 *                 description: ID of product
 *               rating:
 *                 type: integer
 *                 description: User's star rating
 *               comment:
 *                 type: string
 *                 description: User's text feedback
 *             required:
 *               - userId
 *               - productId
 *             example:
 *               userId: "u12345"
 *               productId: "p98765"
 *               rating: 5
 *               comment: "Excellent product! Highly recommend."
 *     responses:
 *       '200':
 *         description: Review updated successfully
 *       '400':
 *         description: Invalid request body or ID format
 *       '404':
 *         description: Review not found
 *       '500':
 *         description: Server error
 */

/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     summary: Delete a Review
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Review ID for delete
 *     responses:
 *       200:
 *         description: Review deleted
 *       404:
 *         description: Record not found
 *       '500':
 *         description: Server error
 */

router.get("/", reviewController.getReviews); //get - read
router.post("/", isLoggedIn, reviewController.createReview); //post - create
router.put("/:id", isLoggedIn, reviewController.updateReview); //put - update
router.delete("/:id", isLoggedIn, reviewController.deleteReview); //delete

module.exports = router;
