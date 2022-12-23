const Users = require("../models/users");
const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../errors/bad-request");
const { NotFoundError } = require("../errors/not-found-error");

const signToken = (user) => {
  return jwt.sign({ ...user }, process.env.JWT_KEY, { expiresIn: "24h" });
};

exports.LoginUser = async (req, res, next) => {
  await Users.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      //Saves the login date, updates in every login.
      user.lastAccessDate = Date.now();
      user.save();

      const token = signToken({ id: user._id, isAdmin: user.isAdmin });

      //Decoding the token
      const decoded = jwt.decode(token, process.env.JWT_KEY);

      res.status(201).header("auth-token", token).send({
        token,
        isAdmin: user.isAdmin,
        id: user._id,
        lastAccessDate: user.lastAccessDate,
      });
    } else {
      res.status(404).send(new BadRequestError("hata"));
    }
  })
  .catch(() => {
    res.send(new NotFoundError('not found'))
  })
};
