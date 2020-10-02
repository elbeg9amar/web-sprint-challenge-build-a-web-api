const actions = require('../data/helpers/actionModel')

module.exports = {
    validataActionId,
    validateNewAction
};

function validataActionId(req,res,next) {
    const id = Number(req.params.id)
    actions.get()
        .then(actions => {
            if(actions.find(act => act.id === id)){
                next()
            }else {
                res.status(404).json({message: "invalid action id"})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "error occured while validating action's id"})
        });
};

function validateNewAction(req,res,next) {
    const body =req.body;
    console.log(body)
    if(Object.keys(body).length === 0){
        res.status(400).json({message: "missing action data"})
    }else if (!body.description || !body.notes ||!body.project_id){
        res.status(400).json({error:"required fields are missing"})
    }else {
        next()
    };
};