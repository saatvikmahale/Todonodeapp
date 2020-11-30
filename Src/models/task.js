const mongoose = require('mongoose');

const Task =mongoose.model('Task',{
    name:{
        require:true,
        type:String
    },
    completed:{
        type:Boolean
    }
});

module.exports =Task;
