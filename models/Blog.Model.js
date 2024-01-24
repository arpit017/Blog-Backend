const mongoose=require("mongoose")

const blogSchema=mongoose.Schema({

    heading:{type:String, required:true},
    content:{type:String, required:true},
    tag:{type:String, required:true},
    creatorID:{type:String, required:true},
    price:{type:Number, required:true},
    creatorName:{type:String, required:true},
    image:{type:String, required:true}
})

const BlogModel= mongoose.model("blog",blogSchema)

module.exports={BlogModel} 