const User = require("../schemas/user.schema");

const middleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send({
        type: "AUTH",
        message: "Unauthorized: Login details not provided",
      });
    }

    const user = await User.findOne({ userName: token });
    if (user) {
      next();
    } else {
      return res.status(401).send({
        type: "AUTH",
        message: "Unauthorized: Invalid Login details!",
      });
    }
  } catch (error) {
    console.log("Error in middleware:", error.message);
    return res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = middleware;
