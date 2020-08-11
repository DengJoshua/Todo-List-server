const express = require('express');
const router = express.Router();
const Joi = require('joi');
const Todo = require('./todo');


//get all list items
    router.get('/', async (req, res) => {
            const todos = await Todo.find()
            res.send(todos)
            console.log(todos)
        
                      
    });


//get specific todo-item
router.get('/:id', async (req, res) => {
    try {
        const listItem = await Todo.findById(req.params.id) 
        res.json(listItem)
        }catch( error ) {
        res.json({ message: error })
    } 
})



//Create new Todo item
router.post('/', async (req, res) =>{
    const { error } = validateInput(req.body);
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    const newlistItem = new Todo({
        title: req.body.title,
        completed: false  
    })
    try{
        const listItem = await newlistItem.save()
        //res.json(listItem)
         res.redirect('http://localhost:3001/')
    }catch(error) {
        res.send( error)
    }
});

//update added Todo item
router.patch('/:id', async(req, res) => {
    try {
        const updatedListIem = await Todo.update({ _id: req.params.id }, { $set: { completed: req.body.completed} })
        res.json(updatedListIem)
    }catch(err) {
        console.log('Error Ocurred..', err)
    }
    
});

//delete todo-list item
router.delete('/:id', async (req, res) =>{
    try {
        const listItem = await Todo.remove({_id: req.params.id})
        res.json(listItem)
    }catch( error) {
        res.json({ message: error })
    }
});


//validate user input
function validateInput(listItem){
    const validator = {
        title: Joi.string().min(3).required()
    }
    return  Joi.validate(listItem, validator) 

}

module.exports = router;