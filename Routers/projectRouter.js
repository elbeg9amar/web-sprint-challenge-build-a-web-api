const express = require('express');
const router = express.Router();

const projects = require('../data/helpers/projectModel');
const {validataProjectId, validataNewProject} = require('../middleware/projectmid')

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

module.exports = router;