const User = require("../schemas/user.schema");

const middleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log("token: ", token);
    if (!token) {
      return res
        .status(201)
        .send({ message: "Unauthorized: Token not provided" });
    }

    const user = await User.findOne({ userName: token });
    if (user) {
      next();
    } else {
      return res.status(201).send({ message: "Unauthorized: Invalid token" });
    }
  } catch (error) {
    console.error("Error in middleware:", error.message);
    return res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = middleware;
