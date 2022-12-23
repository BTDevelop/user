const Users = require("../models/users");

exports.DeleteUser = async (req, res) => {
  await Users.findByIdAndDelete(req.params.id)

    .then((user) => {
      res.send(user).status(200);
    })
    .catch((error) => {
      res.send(error).status(403);
    });
};
