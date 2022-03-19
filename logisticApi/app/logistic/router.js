const router = require("express").Router();

// for controller Logistic
const logisticController = require("./controller");

// for verify token
const { verifyToken } = require("../../middleware/verifyToken");

// localhost:4501/api/logistic
router.post("/logistic", verifyToken, logisticController.postLogistic);
// localhost:4501/api/logistic/{origin_name}&{destination_name}
router.get(
  "/logistic/:origin_name.:destination_name",
  verifyToken,
  logisticController.getOriginAndDestination
);

module.exports = router;
