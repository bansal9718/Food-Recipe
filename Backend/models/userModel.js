const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  favorites: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Recipe",
    default: [],
  },
});

userSchema.pre("save", async function (next) {
  const user = this;

  // Check if the password is modified
  if (user.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next(); // If password isn't modified, proceed to save
  }
});

userSchema.methods.comparePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

userSchema.methods.generateToken = async function () {
  try {
    const token = jwt.sign(
      {
        id: this._id,
        email: this.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "90d" }
    );
    return token;
  } catch (error) {
    console.error(error);
  }
};
const User = mongoose.model("User", userSchema);

module.exports = User;
