const express = require("express");
const router = express.Router();
// const students = require("../models/students");
const studentController = require("../controllers/students");

const { isLoggedIn } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: students
 *   description: student Management
 */

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Read students
 *     description: >
 *       - Sem ID, return student list.
 *       - Com ID, return unique student  (404 if not found).
 *     tags:
 *       - students
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: false
 *         description: student Id for search
 *     responses:
 *       '200':
 *         description: student List or a distinct student
 *       '404':
 *         description: student not found
 *       '500':
 *         description: SErver Error
 */

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Add new student
 *     tags: [students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: Student's first name
 *               lastName:
 *                 type: string
 *                 description: Student's last name
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Student's email address
 *               phone:
 *                 type: string
 *                 description: Student's phone number
 *               enrolledCourses:
 *                 type: array
 *                 description: List of enrolled course IDs
 *                 items:
 *                   type: string
 *                   format: ObjectId
 *                   example: 68436f884d6cef9e77452390
 *               birthDate:
 *                 type: string
 *                 format: date
 *                 description: Student's birth date (YYYY-MM-DD)
 *               registrationDate:
 *                 type: string
 *                 format: date
 *                 description: Registration date (YYYY-MM-DD)
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - phone
 *               - enrolledCourses
 *               - birthDate
 *               - registrationDate
 *             example:
 *               firstName: Maria
 *               lastName: Silva
 *               email: maria.silva@email.com
 *               phone: 555-1234
 *               enrolledCourses:
 *                 - 68436f884d6cef9e77452390
 *                 - 68436f884d6cef9e77452391
 *               birthDate: 1995-06-20
 *               registrationDate: 2024-09-01
 *     responses:
 *       '201':
 *         description: Student created successfully
 *       '400':
 *         description: Invalid input
 *       '500':
 *         description: Server error
 */

/**
 * @swagger
 * /students/{id}:
 *   put:
 *     summary: Update a student
 *     tags:
 *       - students
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: MongoDB ObjectId of the student to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: First name of the student
 *               lastName:
 *                 type: string
 *                 description: Last name of the student
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address
 *               phone:
 *                 type: string
 *                 description: Phone number
 *               enrolledCourses:
 *                 type: array
 *                 description: Array of enrolled course IDs
 *                 items:
 *                   type: string
 *                   format: ObjectId
 *               birthDate:
 *                 type: string
 *                 format: date
 *                 description: Birth date (YYYY-MM-DD)
 *               registrationDate:
 *                 type: string
 *                 format: date
 *                 description: Registration date (YYYY-MM-DD)
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - phone
 *               - enrolledCourses
 *               - birthDate
 *               - registrationDate
 *             example:
 *               firstName: Maria
 *               lastName: Silva
 *               email: maria.silva@email.com
 *               phone: 555-1234
 *               enrolledCourses:
 *                 - 68436f884d6cef9e77452390
 *                 - 68436f884d6cef9e77452391
 *               birthDate: 1995-06-20
 *               registrationDate: 2024-09-01
 *     responses:
 *       '200':
 *         description: Student updated successfully
 *       '400':
 *         description: Invalid input data
 *       '404':
 *         description: Student not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     summary: Delete a student
 *     tags: [students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: student ID for delete
 *     responses:
 *       200:
 *         description: student deleted
 *       404:
 *         description: Record not found
 */

router.get("/", studentController.getStudent); //get - read
router.post("/", isLoggedIn, studentController.createStudent); //post - create
router.put("/:id", isLoggedIn, studentController.updateStudent); //put - update
router.delete("/:id", isLoggedIn, studentController.deleteStudent); //delete

module.exports = router;
