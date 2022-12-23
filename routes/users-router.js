const express = require('express')
const router = express.Router()

//MIDDLEWARES
const isAdmin = require('../middleware/isAdmin')


const createUser = require('../controllers/create-user')
const deleteUser = require('../controllers/delete-user')
const getUserOne = require('../controllers/get-user')
const getUsers = require('../controllers/get-users')
const isActive = require('../controllers/is-active-user')
const loginUser = require('../controllers/login-user')
const updateUser = require('../controllers/update-user')

//router.post('/create-user', createUser.CreateUser)
router.get('/get-user/:id', getUserOne.GetUser)
router.get('/get-users', getUsers.getUsers)
router.put('/is-active', isActive.IsActiveUser)
router.post('/login' , loginUser.LoginUser)
router.delete('/delete-user/:id' , isAdmin.verifyToken,  deleteUser.DeleteUser)
router.put('/update-user/:id' , updateUser.UpdateUser)

module.exports = router