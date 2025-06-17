const { body } = require("express-validator");

const allowedRoles = ["admin", "user", "guest"];

exports.validateUser = [
  body("email").isEmail().withMessage("Invalid email."),
  body("role")
    .isIn(allowedRoles)
    .withMessage("Invalid role. Use: admin, user, or guest"),
];
