const express = require('express');
const router = express.Router();

const projects = require('../data/helpers/projectModel');

router.get('/', (req,res) => {
    projects.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: "error occured while getting projects"})
        });
});

router.get('/:id', validataProjectId, (req,res) => {
    projects.get(req.params.id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "error occured while getting project by id"})
        });
});

router.get('/project/:id', validataProjectId, (req,res) => {
    projects.getProjectActions(req.params.id)
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: "error occured while getting projects by id"})
        })
})

router.post('/',validataNewProject, (req,res) => {
    const newPost = req.body;
    projects.insert(newPost)
        .then(pro => {
            res.status(201).json(pro)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "error occured while posting new project"})
        });
});

router.delete('/:id', validataProjectId, (req,res) => {
    projects.remove(req.params.id)
        .then( project=> {
            res.status(200).json({message: "project deleted"})
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error:"error occured while deleting project"})
        });
});

router.put('/:id', validataProjectId,(req,res) => {
    const id = req.params.id;
    const body = req.body;
    projects.update(id,body)
        .then(pro => {
            res.status(201).json(pro)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: "error occured while updating existing project"})
        })
})

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

module.exports = router;