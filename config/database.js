const mongoose=require('mongoose')

const connectDB=()=> { mongoose.connect('mongodb://localhost:27017/to-dos-app',{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true } )
    .then(()=>{
        console.log('connected to db')
    })
    .catch((err)=>{
        console.log(err)
    })
}

module.exports=connectDB