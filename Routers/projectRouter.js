const express = require('express');
const router = express.Router();

const projects = require('../data/helpers/projectModel')

router.get('/', (req,res) => {
    projects.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: "error occured while getting projects"})
        })
})


module.exports = router;