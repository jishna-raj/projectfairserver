const mongoose = require('mongoose')


const projectSchema = new mongoose.Schema({
    title:{
        required:true,
        type:String
    },
    language:{
        required:true,
        type:String
    },
    GitHub:{
        required:true,
        type:String
    },
    website:{
        required:true,
        type:String
    },
    Overview:{
        required:true,
        type:String
    },
    projectImage:{
        required:true,
        type:String
    },
    userId:{
        required:true,
        type:String
    }
})




const projects = mongoose.model("project",projectSchema)



module.exports = projects