const express = require("express");

const { body, validationResult } = require("express-validator");

const User = require("../models/user.models");

const router = express.Router();

router.post(
  "/",
  body("firstName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("First name can't be empty"),
  body("pincode")
    .trim()
    .not()
    .isEmpty()
    .isNumeric()
    .withMessage("Pincode must be 6 digit")
    .isLength({ min: 6, max: 6 }),
  body("email")
    .isEmail()
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("Email is already taken");
      }
    }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const user = await User.create(req.body);
      return res.send(201).send(user);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  }
);

module.exports = router;
