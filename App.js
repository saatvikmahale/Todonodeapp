const express = require('express');
require('./Src/Db/mongoose');

const taskRouter =require('./Src/Tasks/Tasks');
const cors =require('cors');

const app = express();
app.use(express.json());
app.use(cors({origin:true,credentials:true}));
app.use(taskRouter);

module.exports =app;