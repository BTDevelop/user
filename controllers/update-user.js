const express = require("express");
const router = express.Router();
const Users = require("../models/users");
const {NotFoundError} = require('../errors/not-found-error')


exports.UpdateUser =  async (req, res) => {
  const { body } = req;
  delete body.isActive;

  await Users.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  )
    .then((updatedUser) => {
      res.status(200).send(updatedUser);
    })
    .catch((error) => {
     res.send( new NotFoundError('error', error))
    });
}


