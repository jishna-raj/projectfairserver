//import express

const express = require('express')

//import usecontroller

const userController = require('./controllers/userController')

//import projectcontroller

const projectController = require('./controllers/projectController')

//import middleware

const jwt = require('./middleware/jwtMiddleware')

//import multer

const multer = require('./middleware/multerMiddleware')

//create an object for express class

const router = new express.Router()

//register

router.post('/register',userController.registerControlller)

//login

router.post('/login',userController.loginControlller)


//add project

router.post('/add-project',jwt, multer.single("projectImg"), projectController.addProjectController)


//get home project

router.get('/home-project',projectController.getHomeProjectController)

//get all project

router.get('/all-project',projectController.getAllProjectController)


//get user project

router.get('/user-project',jwt,projectController.getUserProjectController)


//delete a project

router.delete('/remove-userProject/:id',projectController.deleteUserProjectController)


//edit userproject

router.put('/edit-project/:id',jwt,multer.single('projectImg'),projectController.editUserProjectController)


//update profile

router.put('/update-profile',jwt,multer.single("profile"),userController.updateProfileDetailsController)



module.exports = router
