const User = require("./model");
const bcrypt = require("bcrypt");
const PhoneNumber = require("awesome-phonenumber");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    //   destructuring object
    const { name, username, msisdn, password } = req.body;
    console.log(req.body);

    //check if username is exists and return error message
    const userNameExists = await User.findOne({
      where: { username: username },
    });
    if (userNameExists) {
      throw new Error("username sudah terdaftar");
    }
    //check if msisdn is exists and return error message
    const msisdnExists = await User.findOne({
      where: { msisdn: msisdn },
    });
    if (msisdnExists) {
      throw new Error("msisdn sudah terdaftar");
    }

    // initialize msisdn to pn for checking region code
    const pn = new PhoneNumber(msisdn);
    console.log(pn.getRegionCode());

    // check number phone isID
    if (pn.getRegionCode() !== "ID") {
      return res.status(401).send("No harus diawali +62");
    }

    // hashing password
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    // initialize models database
    const newUser = new User({
      name,
      username,
      msisdn,
      password: hashPassword,
    });

    // menampilkan newuser ketika di save postman
    await newUser.save();

    res.json(newUser);

    //catch the error
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
};

const login = async (req, res) => {
  try {
    // find data User with msisdn
    const user = await User.findOne({
      where: {
        msisdn: req.body.msisdn,
      },
    });

    //checking password if isMatch
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return res.status(400).json({ msg: "password salah" });

    //get token
    const signed = jwt.sign({ user }, process.env.SECRET_KEY);

    //update User and return Token
    await User.update(
      { token: signed },
      {
        where: { id: user.id },
      }
    );

    res.json({
      message: "Login Successfully",
      user,
      token: signed,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ msg: "msisdn salah" });
  }
};

const getUser = async (req, res, next) => {
  if (!req.user) {
    res.json({
      err: 1,
      message: "You`re Not login or token expired ",
    });
  }
  res.json(req.user);
};

module.exports = { register, login, getUser };
