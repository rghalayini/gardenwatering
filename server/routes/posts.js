const express = require('express');
const router = express.Router();
const Post = require('../models/Post')

//gets back all the posts
router.get('/', async (req, res)=>{
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch (err){
        res.json({message:err});
    }
})

//submit a post
router.post('/', async (req,res)=>{
    const post = new Post({
        itemName: req.body.itemName,
        store:req.body.store
    })
    try{
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err){
        res.json({message:err});
    }
    
});

//specific post: this is dynamic meaning everything we put after post in the url, we will get its information
router.get('/:postId', async (req,res)=>{
    try{
    const post = await Post.findById(req.params.postId);
    res.json(post);
    }catch{
        res.json({message: err})
    }
})

//delete a specific post
router.delete('/:postId', async (req,res)=>{
    try{
        const removedPost = await Post.remove({_id: req.params.postId});
        res.json(removedPost);
    }catch(err){
        res.json({message: err});
    }
});

//update a post
router.patch('/:postId', async (req,res)=>{
    try{
        const updatedPost = await Post.updateOne(
            { _id:req.params.postId }, 
            { $set: { itemName: req.body.itemName } }
        );
        res.json(updatedPost);
    }catch(err){
        res.json({message:err});
    }
})

module.exports=router;