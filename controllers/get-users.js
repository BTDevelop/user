const express = require('express')
const { NotFoundError } = require('../errors/not-found-error')
const router = express.Router()
const Users = require('../models/users')

exports.getUsers =  async (req, res) => {
   Users.find()
    .then((usersList) => {
        res.send(usersList)
    })
    .catch((error) => {
        res.send(new NotFoundError('No user'), error)
    })
}

