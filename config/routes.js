const express=require('express')
const authenticateUser=require('../app/middlewares/authenticate')
const usersController=require('../app/controllers/usersController')
const tasksController=require('../app/controllers/tasksController')
const labelController=require('../app/controllers/labelController')

const router=express.Router()

//users
router.post('/users/register',usersController.register)
router.post('/users/login',usersController.login)
router.get('/users/account',authenticateUser, usersController.account)
router.delete('/users/logout',authenticateUser,usersController.logout)

//tasks
router.get('/tasks',authenticateUser,tasksController.list)
router.post('/tasks',authenticateUser,tasksController.create)
router.get('/tasks/:id',authenticateUser,tasksController.show)
router.put('/tasks/:id',authenticateUser,tasksController.update)
router.delete('/tasks/:id',authenticateUser,tasksController.destroy)
router.post('/tasks/:id',authenticateUser,tasksController.createMany)
router.get('/tasks/archieved',authenticateUser,tasksController.showCompleted)

//labels
router.get('/labels',authenticateUser,labelController.list)
router.post('/labels',authenticateUser,labelController.create)
router.get('/labels/:id',authenticateUser,labelController.show)
router.put('/labels/:id',authenticateUser,labelController.update)
router.delete('/labels/:id',authenticateUser,labelController.destroy)
router.post('/labels/more',authenticateUser,labelController.createMany)

module.exports=router