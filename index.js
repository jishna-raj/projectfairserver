// import dotenv

require('dotenv').config() //load the enviornment

//import express

const express = require('express')

//import cors

const cors = require('cors')

//import router file

const router = require('./routes')

//import mongodb connection file

require('./connection')

//create an express server

const pfServer = express()
//to connect with frontend

pfServer.use(cors())


//parse json format -json()

pfServer.use(express.json())

//router

pfServer.use(router)


//static method is used to export a file from backend

pfServer.use('/uploads',express.static('./uploads'))

//create port

const PORT = 4000|| process.env.PORT

// using listen method make the server to check the request received

pfServer.listen(PORT,()=>{
    console.log(`port running successfully at ${PORT}` );
})

//logic

/* pfServer.get('/get',(req,res)=>{
    res.send('get request received')
})

pfServer.post('/post',(req,res)=>{
    res.send('post request received')
})

pfServer.delete('/delete',(req,res)=>{
    res.send( 'delete request received')
}) */