const mongoose = require('mongoose');

let Task = mongoose.Schema({
    name:{
        require:[true,'name required'],
        type:String
    },
    completed:{
        type:Boolean
    }
});

module.exports =mongoose.model('Task',Task);

