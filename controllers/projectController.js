const projects = require('../model/projectModel');
const users = require('../model/userModel');

exports.addProjectController = async (req, res) => {

    console.log('inside addproject controller');



    const userId = req.payload
    console.log(userId);
    /*  console.log(req.body); */

    const { title, language, GitHub, website, Overview } = req.body

    console.log(title, language, GitHub, website, Overview);

    const projectImage = req.file.filename

    console.log(projectImage);


    try {


        const existingProject = await projects.findOne({ GitHub })

        if (existingProject) {
            res.status(406).json("project already exist")
        }

        else {
            const newProject = new projects({

                title,
                language,
                GitHub,
                website,
                Overview,
                projectImage,
                userId
            })

            await newProject.save()
            res.status(200).json(newProject)

        }

    } catch (error) {
        res.status(401).json(error)
    }






}


exports.getAllProjectController = async (req, res) => {


    const searchKey = req.query.search
    console.log(searchKey);

    const query = {
        language: {
            $regex: searchKey, $options: 'i'
        }
    }

    try {

        const allProject = await projects.find(query)
        res.status(200).json(allProject)

    } catch (error) {
        res.status(401).json(error)
    }
}

//to get home projects

exports.getHomeProjectController = async (req, res) => {


    try {

        const homeProject = await projects.find().limit(3)
        res.status(200).json(homeProject)

    } catch (error) {
        res.status(401).json(error)
    }
}


//to get user projects

exports.getUserProjectController = async (req, res) => {

    const userId = req.payload
    try {

        const userProject = await projects.find({ userId })
        res.status(200).json(userProject)

    } catch (error) {

        res.status(401).json(error)

    }
}


//to delete a project

exports.deleteUserProjectController = async (req, res) => {

    const { id } = req.params

    try {

        const item = await projects.findByIdAndDelete({ _id: id })
        res.status(200).json('deleted successfully')

    } catch (error) {
        res.status(401).json(error)
    }
}


//edit project

exports.editUserProjectController = async (req, res) => {

    const { id } = req.params
    console.log(id);


    const userId = req.payload

    console.log(userId);


    const { title, language, GitHub, website, Overview, projectImg } = req.body

    console.log(title, language, GitHub, website, Overview, projectImg);


    const projectImage = req.file ? req.file.filename : projectImg

    console.log(projectImage);



    try {

        const existingProject = await projects.findByIdAndUpdate({ _id: id }, {
            title,
            language,
            GitHub,
            website,
            Overview,
            projectImage: projectImage,
            userId
        }, { new: true })
        await existingProject.save()
        res.status(200).json(existingProject)


    } catch (error) {
        res.status(401).json(error)
    }



}


