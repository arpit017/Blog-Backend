const { Router } = require("express");
const {BlogModel}=require("../models/Blog.Model")

const blogsRouter=Router()



blogsRouter.get("/",async(req,res)=>{
    const page = parseInt(req.query.page) || 1;
    const perPage = 8
    try{
        const skip = (page - 1) * perPage;
        const filter = {};
        const mysort = {};
        if (req.query.tag) {
            filter.tag=req.query.tag
          }
        if (req.query.sort) {
            // console.log(req.query.sort)
            const sortOrder = Array.isArray(req.query.sort) ? req.query.sort[0] : req.query.sort;
            mysort.price=sortOrder==='asc'?1:-1
          }
          
        const allBlogs = await BlogModel.find(filter).sort(mysort).skip(skip).limit(perPage);
        res.send({allBlogs})
    }catch(error){
        console.error("Error retrieving blogs:", error);
    }
})


blogsRouter.get("/all",async(req,res)=>{

  const total_Blogs=await BlogModel.find()

  res.send({total_Blogs})

})

      blogsRouter.get("/details/:id",async(req,res)=>{
      const id=req.params.id
      // console.log(id)
      const newBlog=await BlogModel.findOne({_id:id})

      if(newBlog){
        res.send({newBlog})
      }else{
        res.send("did not get details ")
      }

})
 
module.exports={blogsRouter}