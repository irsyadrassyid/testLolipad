const Axios = require("axios");
const { getToken } = require("../utils");

const verifyToken = async (req, res, next) => {
  try {
    const token = getToken(req);
    if (!token) return next();
    const user = await Axios.get("http://localhost:4500/auth/users/", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (user.data.error) {
      throw new Error(user.data.message);
    }

    console.log(user.data.error);
  } catch (err) {
    res.json({
      error: 1,
      message: err.message,
    }),
      next(err);
  }
  next();
};

module.exports = { verifyToken };
