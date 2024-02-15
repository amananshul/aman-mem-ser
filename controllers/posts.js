import  mongoose from "mongoose"
import PostMessage from "../models/postMessage.js"

export const getPosts=async(req,res)=>{
    try {

        const postMessage= await PostMessage.find()
         res.status(200).json(postMessage)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
    }
export const getPostsBySearch=async(req,res)=>{

    const {searchQuery,tags}=req.query
  
    try {

        const title=new RegExp(searchQuery,'i')
        const posts= await PostMessage.find({ $or:[{title},{tags:{$in:tags.split(',')}}]})
        console.log('searchQuery',posts)
         res.status(200).json({data:posts})
    } catch (error) {
        res.status(404).json({message:error.message})
    }
    }
export const createPost=async(req,res)=>{
    
    const post=req.body
    console.log('first',req.userId)
    const newPost=  new PostMessage({...post,creator:req.userId,createdAt:new Date().toISOString()})
   try {
    await newPost.save()
    res.status(201).json(newPost)
    
   } catch (error) {
    res.status(409).json({message:error.message})
   }
    }
export const updatePost=async(req,res)=>{
    const {id :_id} = req.params;
    const post=req.body
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id: ${_id}`);
     const updatedPost=await PostMessage.findByIdAndUpdate(_id, {...post,_id} ,{new:true})
     res.json(updatedPost)
    }
export const deletePost=async(req,res)=>{
    const {id :_id} = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id: ${_id}`);
      await PostMessage.findByIdAndRemove(_id)
     res.json({message:'Post Deleted Successfully'})
    }
export const likePost=async(req,res)=>{
    const {id} = req.params;
    if(!req.userId)return res.json({message:'unauthenticated'})
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const post = await PostMessage.findById(id);
    const index=post.likes.findIndex((id)=>id!==String(req.userId))
    if(index===-1){
     post.likes.push(req.userId)
    }else{
       post.likes= post.likes.filter((id)=>id!==String(req.userId))
    }
    const likedPost= await PostMessage.findByIdAndUpdate(id,post,{new:true})
     res.json(likedPost)
    }