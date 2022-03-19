const { getToken } = require("../utils");
const jwt = require("jsonwebtoken");
const User = require("../app/auth/model");

function decodeToken() {
  return async function (req, res, next) {
    try {
      let token = getToken(req);

      if (!token) return next();

      req.user = jwt.verify(token, process.env.SECRET_KEY);

      let user = await User.findOne({ token: { $in: [token] } });

      if (!user) {
        res.json({
          error: 1,
          message: "Token Expired!",
        });
      }
    } catch (err) {
      if (err && err.name === "JsonWebTokenError") {
        return res.json({
          error: 1,
          message: err.message,
        });
      }
      next(err);
    }
    return next();
  };
}

module.exports = { decodeToken };
