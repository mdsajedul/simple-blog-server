const http = require('http')
const app = require('./app/app')
const mongoose = require('mongoose')
const config = require('./config/config')

const server = http.createServer(app)

mongoose.connect(config.dbURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log('Connected to Mongodb');
}).catch((error)=>{
    console.log(error);
})


server.listen(config.PORT,()=>{
    console.log(`Server is running on PORT ${config.PORT}`);
})