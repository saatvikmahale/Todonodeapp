const mongoose = require('mongoose');

const connectionUrl ="mongodb://Vitthal:Sample123@cluster0-shard-00-00.uh0jx.mongodb.net:27017,cluster0-shard-00-01.uh0jx.mongodb.net:27017,cluster0-shard-00-02.uh0jx.mongodb.net:27017/TestDB?ssl=true&replicaSet=atlas-6yd9hi-shard-0&authSource=admin&retryWrites=true&w=majority";


mongoose.connect(connectionUrl,{
    useNewUrlParser :true,
    useCreateIndex:true,
    useUnifiedTopology:true
}).catch((error)=>{
    console.log(error);
});

