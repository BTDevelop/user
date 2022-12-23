const express = require('express')
const router = express.Router()
const Users = require('../models/users')
const {NotFoundError}  = require('../errors/not-found-error')
const { response } = require('express')
const { DBConnectionError } = require('../errors/db-connection-error')
const { BadRequestError } = require('../errors/bad-request')
const { isValidObjectId } = require('mongoose')


exports.GetUser = async (req, res, next) => {
    
    const id = req.params.id;

    // Check if the ID is valid before attempting to retrieve the user
    if (!isValidObjectId(id)) {
      next (new BadRequestError('Invalid ID'));
    }
  
    Users.findById(id)
      .then((user) => {
        if (!user) {
          throw new BadRequestError('User not found');
        }
        res.status(200).json(user);
      })
      .catch((error) => {
        // If an error occurred during the process, return a 500 Internal Server Error status
        res.send( new DBConnectionError('error', error))
      });
  };
 
