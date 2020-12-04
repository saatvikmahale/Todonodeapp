const request = require('supertest');
const Task =require('../models/task');

const app= require('../../App');


jest.useFakeTimers();

//facing issue in beforeeach hence commenting code and writing in each test case  

// beforEach(async()=>{
//      //await Task.deleteMany()
//      //await new Task(taskOne).save()
//      console.log('test');
//  });



test('should get allTasks',async()=>{
    let tasks= await request(app).get('/allTasks').send().expect(200);
    expect(tasks.body).toHaveLength(0);
});

test('should create task',async()=>{
    await Task.deleteMany();
    const resp=await request(app).post('/task').send({
        name:'test',
        completed:true
    }).expect(201);

    const createdTask=await Task.findById(resp.body._id);
    expect(createdTask).not.toBeNull();
});
                                

test('should get allTasks',async()=>{
    let tasks =await request(app).get('/allTasks').send().expect(200)
    expect(tasks.body).toHaveLength(1);
});


 test('should get completed task',async()=>{
     const resp=await request(app).get('/tasks?completed=true').send().expect(200);
     expect(resp.body).toHaveLength(1);
 });


 test('should get non completed task',async()=>{
    const resp=await request(app).get('/tasks?completed=false').send().expect(200);
    expect(resp.body).toHaveLength(0);
});


test('should update task',async()=>{
    const tsk = await Task.find();
    const resp=await request(app).patch('/task/' +  tsk[0]._id).send({
        completed:false
    }).expect(200);

    const updatedTask =await Task.findById(tsk[0]._id);
    expect(updatedTask.completed).toBe(false);
});


test('should receive 404 on update task',async()=>{
    const tsk = await Task.find();
    const resp=await request(app).patch('/task/' +  tsk[0]._id).send({
        name:'task'
    }).expect(400);
});


test('should delete task',async()=>{
    let tsk = await Task.find();
    const resp=await request(app).delete('/task/' +  tsk[0]._id).send().expect(200);

    tsk = await Task.findById(tsk[0]._id);
    expect(tsk).toBeNull();

});

test('delete all taks', async()=>{
    const resp=await request(app).delete('/task').send().expect(200);
    const tsks = await Task.find();
    expect(tsks).toHaveLength(0);
})


