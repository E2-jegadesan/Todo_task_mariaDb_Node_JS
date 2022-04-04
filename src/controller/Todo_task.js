const todoDao= require('../dao/Todo_task')
const responseMsg = require('../config/config')

module.exports = {
    createTask: createTask,
    fetchTask: fetchTask,
    deleteTask: deleteTask,
    updateTask: updateTask,
    deleteAllTask:deleteAllTask,
    deleteSelectedTask:deleteSelectedTask
}


function createTask(req, res) {
    if(req.body.task_name != 0){
        return todoDao.createTask(req.body).then(function () {
            res.status(201).send(responseMsg.successMsg(null,"Added Successfully"))
        }).catch(e => {
            res.status(500).send(responseMsg.failureMsg(e.message))
        }) 
    }else{
         res.status(400).send(responseMsg.failureMsg("Enter the task"))
    }  
}

function fetchTask(req,res) {
    return todoDao.fetchTask(req).then(function (response) {
        res.status(200).send(responseMsg.successMsg(response,"fetched Successfully"))
    }).catch(e => {
        res.status(400).send(responseMsg.failureMsg(e.message))
    })
}

function deleteTask(req, res) {
    return todoDao.deleteTask(req.body).then(function (userResponse) {
        if(userResponse == 1){
            res.status(200).send(responseMsg.successMsg(null,"Deleted Successfully"))
        }else{
            res.status(400).send(responseMsg.failureMsg("No Task Found"))
        }
        
    }).catch(e => {
        res.status(500).send(responseMsg.failureMsg(e.message))
    })
}

function updateTask(req, res) {
    return todoDao.updateTask(req.body).then(function () {
        res.status(200).send(responseMsg.successMsg(null,"Updated Successfully"))
    }).catch(e => {
        res.status(400).send(responseMsg.failureMsg(e.message))
    })
}


function deleteAllTask(req,res){
    return todoDao.deleteAllTask().then(()=>{
        res.status(200).send(responseMsg.successMsg(null,"All task deleted successfully"))
    })
    .catch(e=>{
        res.send(400).send(responseMsg.failureMsg(e.message))
    })
}


function deleteSelectedTask(req,res){
    return todoDao.deleteSeletedTask(req.body).then(()=>{
        res.status(200).send(responseMsg.successMsg(null,"Selected task deleted successfully"))
    }).catch(e=>{
        res.status(400).send(responseMsg.failureMsg(e.message))
    })
}