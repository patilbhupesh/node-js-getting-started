const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../middleware/auth");
const userSignUpDto = require("../dto/userSignUpDto")
const userLoginDto = require("../dto/userLoginDto")
const User = require("../model/user");
const validateDto = require("../middleware/validate-dto");
const userController = require("../controller/userController");

/**
 * @swagger
 * /signup:
 *  post:
 *    description: User SignUp
 *    parameters:
 *      - email: email
 *        in: query
 *        description: Name of our email
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - password: password
 *        in: query
 *        description: Password
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - companyName: Company Name
 *        in: query
 *        description: Company Name
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - firstName: First Name
 *        in: query
 *        description: First Name
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - lastName: Last Name
 *        in: query
 *        description: Last Name
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: A successful response
 */

router.post("/signup", [validateDto(userSignUpDto)], userController.userSignUp);

/**
 * @swagger
 * /login:
 *  post:
 *    description: Login User
 *    responses:
 *      '200':
 *        description: A successful response
 */

router.post("/login", [validateDto(userLoginDto)], userController.userLogin);


/**
 * @swagger
 * /user/me:
 *  get:
 *    description: Get User Profile
 *    responses:
 *      '200':
 *        description: A successful response
 */


router.get("/me", auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});

module.exports = router;