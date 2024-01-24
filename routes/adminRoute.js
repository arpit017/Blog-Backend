const { Router } = require("express");
const {BlogModel}=require("../models/Blog.Model");
const { UserModel } = require("../models/User.Model");

const adminRouter=Router()

adminRouter.get("/",async(req,res)=>{
    const {userID}=req.body
    const my_Blogs=await BlogModel.find({creatorID:userID})
    res.send({my_Blogs})
})
adminRouter.get("/:id",async(req,res)=>{
    // const {userID}=req.body
    const{id}=req.params
    const required_Blog=await BlogModel.findOne({_id:id})
    res.send({required_Blog})
})

adminRouter.post("/create",async(req,res)=>{
    const{heading,content,tag,creatorID,price,creatorName,image,userID}=req.body
    const user=await UserModel.findOne({_id:userID})
    console.log(user)
    console.log(userID)
    const new_Blog= new BlogModel({
        heading,
        content,
        tag,
        creatorID:userID,
        price,
        creatorName:user.name,
        image

    })
    await new_Blog.save()
    res.send("blog added")
})

adminRouter.patch("/edit/:id",async(req,res)=>{
    const {id}=req.params
    const {userID}=req.body
    const blog=await BlogModel.findOneAndUpdate({_id:id,creatorID:userID},req.body)
    if(blog){

        res.send("blog updated")
    }else{
        res.send("you are not authorized")

    }
})


adminRouter.delete("/delete/:id",async(req,res)=>{
    const {id}=req.params
    const {userID}=req.body
    const blog=await BlogModel.findOneAndDelete({_id:id,creatorID:userID})
    if(blog){

        res.send("blog deleted")
    }else{
        res.send("you are not authorized")

    }
})



module.exports={adminRouter}