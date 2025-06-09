const express = require("express");
const router = express.Router();
// const Courses = require("../models/Courses");
const courseController = require("../controllers/courses");

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: Course Management
 */

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Read Courses
 *     description: >
 *       - Sem ID, return Course list.
 *       - Com ID, return unique Course  (404 if not found).
 *     tags:
 *       - Courses
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: false
 *         description: Course Id for search
 *     responses:
 *       '200':
 *         description: Course List or a distinct Course
 *       '404':
 *         description: Course not found
 *       '500':
 *         description: SErver Error
 */

/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Add new Course
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Course title
 *               description:
 *                 type: string
 *                 description: Course description
 *               durationHours:
 *                 type: integer
 *                 description: Duration in hours
 *               instructor:
 *                 type: string
 *                 description: Instructor name
 *               level:
 *                 type: string
 *                 description: Course level
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Course price
 *             required:
 *               - title
 *               - description
 *               - durationHours
 *               - instructor
 *               - level
 *               - price
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
 * /courses/{id}:
 *   put:
 *     summary: Update a Course
 *     tags:
 *       - Courses
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Course ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Course title
 *               description:
 *                 type: string
 *                 description: Course description
 *               durationHours:
 *                 type: integer
 *                 description: Duration in hours
 *               instructor:
 *                 type: string
 *                 description: Instructor name
 *               level:
 *                 type: string
 *                 description: Course level
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Course price
 *             required:
 *               - title
 *               - description
 *               - durationHours
 *               - instructor
 *               - level
 *               - price
 *             example:
 *               title: "Desenvolvimento Web com Node.js"
 *               description: "Curso atualizado de backend com Node.js e Express"
 *               durationHours: 45
 *               instructor: "Carlos Souza"
 *               level: "Avançado"
 *               price: 249.99
 *     responses:
 *       '200':
 *         description: Course updated successfully
 *       '400':
 *         description: Invalid request body or ID format
 *       '404':
 *         description: Course not found
 *       '500':
 *         description: Server error
 */

/**
 * @swagger
 * /courses/{id}:
 *   delete:
 *     summary: Delete a Course
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID for delete
 *     responses:
 *       200:
 *         description: Course deleted
 *       404:
 *         description: Record not found
 *       '500':
 *         description: Server error
 */

router.get("/", courseController.getCourses); //get - read
router.post("/", courseController.createCourse); //post - create
router.put("/:id", courseController.updateCourse); //put - update
router.delete("/:id", courseController.deleteCourse); //delete

module.exports = router;
