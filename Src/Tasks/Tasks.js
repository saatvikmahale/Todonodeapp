const express = require('express');
const Task =require('../models/task');
const taskRouter =new express.Router();

taskRouter.get('/allTasks',async (req,resp)=>{
    //console.log(req.body);
    try{
        const tasks =await Task.find({});
        return resp.status(200).send( JSON.parse(JSON.stringify(tasks)));
    }catch(e){
        resp.status(500);
    }
});

taskRouter.get('/tasks',async (req,resp)=>{
    try{
        const tasks =await Task.find({completed:req.query.completed});
        return resp.status(200).send( JSON.parse(JSON.stringify(tasks)));
    }catch(e){
       return resp.status(500);
    }
});

taskRouter.post('/task',async (req,resp)=>{
    try{
        // const existingTask = Task.find({$and:[{name:req.body.name},{completed:true}]});
        // if(Task.countDocuments()>0 && existingTask){
        //     return resp.status(400).send({error:'This task already exists - try adding a new one'})
        // }

         const task =new Task(req.body);
         let newtask = await task.save();
         if(!newtask)
          return resp.send(400);
         else
         return resp.status(201).send(task);
    }catch(error){
       return  resp.status(500);
    }    
});

taskRouter.patch('/task/:id',async (req,resp)=>{
    const updates =Object.keys(req.body);
    const allowedUpdate =['completed'];
    const isValidOperation = updates.every((update)=>allowedUpdate.includes(update));

    if(!isValidOperation){
        return resp.status(400).send({error:'Invalid Updates !!!'});
    }
    try{
        const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true, runValidators:true});
        if(!task){
            return resp.status(404).send();
        }
        return resp.status(200).send(task);
    }catch(error){
       return resp.status(500);
    }    
});

taskRouter.delete('/task/:id',async (req,resp)=>{
console.log(req.params.id);

    try{
        const task =await Task.findByIdAndDelete(req.params.id);
        if(task){
            return resp.status(200).send();
        }
        else{
            return resp.status(404);
        }
    }catch(e){
       return resp.status(500);
    }
});


taskRouter.delete('/task',async (req,resp)=>{
    try{
        await Task.deleteMany();
        return resp.status(200).send();
    }catch(e){
       return resp.status(500);
    }
});

module.exports =taskRouter;
