const express=require('express')
const connectDB=require('./config/database')
const cors=require('cors')
const router=require('./config/routes')

const port=3040

connectDB()

const app=express()

app.use(express.json())

app.use(cors())
app.use('/',router)

app.listen(port,function() {
    console.log('listening port:',port)
})