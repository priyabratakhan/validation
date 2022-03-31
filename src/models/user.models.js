const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // confirmPassword: { type: String, required: true },
    gender: {
      type: String,
      required: false,
      enum: ["Male", "Female"],
      default: "Male",
    },
    pincode: { type: Number, required: true },
    // birthdate: { type: Date, required: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
