const Task=require('../models/task')
const _=require('lodash')
//Listing
module.exports.list=(req,res)=>{
    Task.find({user:req.user._id}).populate('label')
        .then((tasks)=>{
            res.json(tasks)
        })
        .catch((err)=>{
            res.json(err)
        })
}

//creating
module.exports.create=(req,res)=>{
    const body=_.pick(req.body,['title','dueDate','status','label','archieved'])
    const task=new Task(body)
    task.user=req.user._id
    task.save()
        .then((task)=>{
            res.json(task)
        })
        .catch((err)=>{
            res.json(err)
        })
}

//insert more
module.exports.createMany=(req,res)=>{
    const body=req.body
    let tasks=[]
    body.map(task=>tasks.push(Object.assign(task,{user:req.user._id})))
    Label.insertMany(tasks)
        .then((tasks)=>{
            res.json(tasks)
        })
        .catch((err)=>{
            res.json(err)
        })
}

//showing one task
module.exports.show=(req,res)=>{
    const id=req.params.id
    Task.findOne({_id:id,user:req.user._id}).populate('label')
        .then((task)=>{
            if(task) {
                res.json(task)
            } else {
                res.json({})
            }
        })
        .catch((err)=>{
            res.json(err)
        })
}

module.exports.showCompleted=(req,res)=>{
   Task.find({user:req.user._id,archieved:true}).populate('label')
    .then((tasks)=>{
        if(tasks) {
            res.json(tasks)
        } else {
            res.json({})
        }
    })
    .catch((err)=>{
        res.json(err)
    })
}

//deleting single task
module.exports.destroy=(req,res)=>{
    const id=req.params.id
    Task.findOneAndDelete({_id:id,user:req.user._id})
        .then((task)=>{
            if(task) {
                res.json(task)
            } else {
                res.json({})
            }
        })
        .catch((err)=>{
            res.json(err)
        })
}

//updating record
module.exports.update=(req,res)=>{
    const id=req.params.id
    const body=_.pick(req.body,['title','dueDate','status','label','archieved'])
    Task.findOneAndUpdate({_id:id,user:req.user._id},body,{ new:true,runValidators:true })
        .then((task)=>{
            if(task) {
                res.json(task)
            } else {
                res.json({})
            }
        })
        .catch((err)=>{
            res.json(err)
        })
}