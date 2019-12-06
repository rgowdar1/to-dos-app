const mongoose=require('mongoose')

const Schema=mongoose.Schema

const taskSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    dueDate:{
        type:Date
    },
    status:{
        type:String,
        required:true
    },
    label:[
        {
                type:Schema.Types.ObjectId,
                required:true,
                ref:'Label'
         }
        ],
    archieved:{
        type:Boolean,
        default:false
    },
    user:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
})

const Task=mongoose.model('Task',taskSchema)

module.exports=Task