const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ SIGNUP
// ✅ SIGNUP
exports.signup = async (req, res) => {
  try {

    // ✅ GET ROLE ALSO
    const {
      name,
      email,
      password,
      role
    } = req.body;

    // ✅ Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        msg: "Email already exists",
      });
    }

    // ✅ Hash password
    const hash = await bcrypt.hash(password, 10);

    // ✅ Create user with role
    const user = await User.create({
      name,
      email,
      password: hash,

      // ✅ SAVE ROLE
      role,
    });

    res.json({
      msg: "User created successfully",
      user,
    });

  } catch (err) {

    res.status(400).json({
      error: err.message,
    });
  }
};

// ✅ LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        msg: "User not found",
      });
    }

    // ✅ Compare password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        msg: "Wrong password",
      });
    }

    // ✅ Create token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // ✅ Send token
    res.json({
      msg: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};
