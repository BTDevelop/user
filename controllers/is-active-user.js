const express = require('express')
const { BadRequestError } = require('../errors/bad-request')
const router = express.Router()
const Users = require('../models/users')

exports.IsActiveUser =  async (req, res) => {
   const updatedUser = await Users.findByIdAndUpdate(
        req.params.id, 
        { isActive: false },
        { new: true }
    )
    .then(() => {
        res.status(200).send(updatedUser)
    })
    .catch((error) => {
        res.send(new BadRequestError('Bad Request', error))
    })
  
}

