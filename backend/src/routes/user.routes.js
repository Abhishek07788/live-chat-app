const express = require("express");
const User = require("../schemas/user.schema");
const middleware = require("../middleware/middleware");
const app = express.Router();

// --- SignUp --
app.post("/signup", async (req, res) => {
  const { userName } = req.body;
  try {
    const user = await User.findOne({ userName });
    if (user) {
      return res
        .status(201)
        .send({ user, message: "User already exists", status: false });
    } else {
      const user = await User.create(req.body);
      return res
        .status(201)
        .send({ user, status: true, message: "Signup successfully" });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// --- LogIn ---
app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne(req.body).select("-password");
    if (!user) {
      return res.status(201).send({ message: "User not found", status: false });
    }
    res.status(200).send({ user, message: "Login successfully", status: true });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// --- get all users --
app.get("/", middleware, async (req, res) => {
  try {
    const users = await User.find({})
      .sort({ createdAt: -1 })
      .select("-password");
    const count = await User.countDocuments({});
    res.status(200).send({ users, count });
  } catch (error) {
    console.error("Error fetching all users:", error.message);
    res.status(500).send({ message: "Internal server error" });
  }
});

// --- get one user --
app.get("/:id", middleware, async (req, res) => {
  try {
    const singleUser = await User.findById(req.params.id);
    if (!singleUser) {
      return res.status(201).send({ message: "User not found", status: false });
    }
    res.status(200).send(singleUser);
  } catch (error) {
    res.status(500).send({ message: "Internal server error", status: false });
  }
});

// --- delete one user --
app.delete("/:id", middleware, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(201).send({ message: "User not found", status: false });
    }
    res.status(200).send({ message: "User deleted", status: true });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", status: false });
  }
});

module.exports = app;
