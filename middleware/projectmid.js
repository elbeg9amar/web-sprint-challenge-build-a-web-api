const projects = require('../data/helpers/projectModel');

module.exports = {
    validataProjectId,
    validataNewProject
};

function validataProjectId(req,res,next) {
    const id = Number(req.params.id)
    projects.get()
        .then(projects => {
            if(projects.find(p => p.id === id)){
                next()
            }else {
                res.status(404).json({message: "invalid project id"})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "error occured while validating project's id"})
        });
};

function validataNewProject(req,res,next){
    const body = req.body;
    if(Object.keys(body).length === 0){
        res.status(400).json({message: "missing project data"})
    }else if (!body.description || !body.name){
        res.status(400).json({error:"required fields are missing"})
    }else {
        next()
    };
};