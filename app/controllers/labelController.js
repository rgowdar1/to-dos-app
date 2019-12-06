const Label=require('../models/label')

//getting all labels
module.exports.list=(req,res)=>{
    Label.find({user:req.user._id}) 
        .then((labels)=>{
            res.json(labels)
        })
        .catch((err)=>{
            res.json(err)
        })
}

//creating label
module.exports.create=(req,res)=>{
    const body=req.body
    const label=new Label(body)
    label.user=req.user._id
    label.save()
        .then((label)=>{
            res.json(label)
        })
        .catch((err)=>{
            res.json(err)
        })
}

//insert more
module.exports.createMany=(req,res)=>{
    const body=req.body
    let labels=[]
    body.map(label=>labels.push(Object.assign(label,{user:req.user._id})))
    Label.insertMany(labels)
        .then((labels)=>{
            res.json(labels)
        })
        .catch((err)=>{
            res.json(err)
        })
}

//getting 1 record 
module.exports.show=(req,res)=>{
    const id=req.params.id
    Label.findOne({_id:id,user:req.user._id})
        .then((label)=>{
            if(label) {
                res.json(label)
            } else {
                res.json({})
            }
        })
        .catch((err)=>{
            res.json(err)
        })
}

//delete
module.exports.destroy=(req,res)=>{
    const id=req.params.id
    Label.findOneAndDelete({_id:id,user:req.user._id})
        .then((label)=>{
            if(label) {
                res.json(label)
            } else {
                res.json({})
            }
        })
        .catch((err)=>{
            res.json(err)
        })
}

//update
module.exports.update=(req,res)=>{
    const id=req.params.id
    const body=req.body
    Label.findOneAndUpdate({_id:id,user:req.user._id},body,{ new:true,runValidators:true })
        .then((label)=>{
            if(label) {
                res.json(label)
            } else {
                res.json({})
            }
        })
        .catch((err)=>{
            res.json(err)
        })
}