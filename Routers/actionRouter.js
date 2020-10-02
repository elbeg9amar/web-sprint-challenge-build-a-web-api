const e = require('express');
const express = require('express');
const router = express.Router();
const check = require('../middleware/actionmid')

const actions = require('../data/helpers/actionModel.js')

router.get('/', (req,res) => {
    console.log(actions)
    actions.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "error occured while getting actions"})
        });
});

router.get('/:id',check.validataActionId, (req, res) => {
    actions.get(req.params.id)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: "error occured while getting action by ID"})
        });
});

router.put('/:id',check.validataActionId, (req,res) => {
    const id = req.params.id;
    const body = req.body;
    actions.update(id, body)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "error occured while updating the action"})
        });
});

router.delete('/:id', check.validataActionId, (req, res) => {
    actions.remove(req.params.id)
        .then(action => {
            res.status(200).json({message:"action deleted"})
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: "error occured while deleting actions"})
        });
});

router.post('/',check.validateNewAction, (req,res) => {
    const newAction = req.body;
    actions.insert(newAction)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error:"error occured while posting new action"})
        });
});


module.exports = router;