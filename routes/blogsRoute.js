const { Router } = require("express");
const {BlogModel}=require("../models/Blog.Model")

const blogsRouter=Router()

blogsRouter.get("/",async(req,res)=>{
    const all_Blogs=await BlogModel.find()
    res.send({all_Blogs})
})

module.exports={blogsRouter}