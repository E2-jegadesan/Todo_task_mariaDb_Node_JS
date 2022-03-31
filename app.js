const express = require('express')
const path =require('path')
const taskRouter = require('./src/router/Todo_task')
const port =  3001
const app = express()
const publicDirectorypath = path.join(__dirname,"./Todo_task_UI")
app.use(express.static(publicDirectorypath))
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST,PUT,DELETE,GET")
    next();
});
app.use(express.json())
app.use(taskRouter)
app.listen(port)