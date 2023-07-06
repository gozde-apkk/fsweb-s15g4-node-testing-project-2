

const router = require('express').Router();
const authorModel = require('../authors/author-model');

router.get('/' , async (req,res) =>{
    try{
        const authors = await authorModel.get();
        res.json(authors);
    }catch(err){
        res.status(500).json({message:err.message})
    }
})
router.get('/:id' , async(req,res) =>{
    try{
        const id = req.params.id
        const authors = await authorModel.getById();
        res.status(200).json(authors);
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

router.post('/' , async(req,res) =>{
    try{
        const {name} = req.body;
        const authors = await authorModel.insert({name: req.bo});
        res.status(201). json(authors);
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

router.put('/:id' , async(req,res) =>{
    try{
        const {name} = req.body;
        const authors = await authorModel.update({name: name} , req.params.id);
        res.status(201). json(authors);
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

router.delete('/:id' , async(req,res) =>{
    try{
       
        const authors = await authorModel.remove({name: name} , req.params.id);
        res.status(201). json(authors);
    }catch(err){
        res.status(500).json({message:err.message})
    }
})