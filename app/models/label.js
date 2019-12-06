const mongoose=require('mongoose')

const Schema=mongoose.Schema

const labelSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
})

const Label=mongoose.model('Label',labelSchema)

module.exports=Label