const Logistic = require("./model");

const postLogistic = async (req, res) => {
  // destructuring object
  let payload = req.body;

  try {
    // initialize logistic
    let logistic = new Logistic(payload);

    // create logistic
    await logistic.save();

    // return logistic
    res.json(logistic);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: err.message });
  }
};

const getOriginAndDestination = async (req, res) => {
  try {
    // destructuring objeck
    let { origin_name, destination_name } = req.params;
    const originAndDestination = await Logistic.findAll({
      where: {
        origin_name,
        destination_name,
      },
    });

    res.json(originAndDestination);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: err.message });
  }
};

module.exports = { postLogistic, getOriginAndDestination };
