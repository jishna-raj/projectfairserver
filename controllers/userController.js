//logics
const users = require('../model/userModel')
const jwt = require("jsonwebtoken")
//register

exports.registerControlller = async (req,res) => {

    //logics

    const {username,email,password} =req.body
    console.log(username,email,password);

    try {
        
        const existingUser = await users.findOne({email})

        if(existingUser){
            res.status(401).json("already existing user")
        }

        else{
            const newUser = new users({
                username,
                email,
                password,
                github:"",
                linkedin:"",
                profile:""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }


    } catch (error) {
        res.status(401).json(error)
    }


    
}



//login

exports.loginControlller = async(req,res)=>{
    const {email,password} = req.body

    console.log(email,password);
    

    try {
        const existingUser = await users.findOne({email,password})
        if(existingUser){

            const token = jwt.sign({userId:existingUser._id},'superkey')

            res.status(200).json({existingUser,token})
        }
        else{
            res.status(406).json('account doesnot exist')
        }
            
        }
        catch (error) {
        res.status(401).json(error)
    }
}


//update profile

exports.updateProfileDetailsController = async (req, res) => {
    const userId = req.payload
    const { username, email, password, github, linkedin, profile } = req.body

    const profileImg = req.file ? req.file.filename : profile

    try {


        const existingUser = await users.findByIdAndUpdate({ _id: userId }, {username, email, password, github, linkedin, profile: profileImg }, { new: true })

        await existingUser.save()
        res.status(200).json(existingUser)
    } catch (error) {

        res.status(401).json(error)

    }
}