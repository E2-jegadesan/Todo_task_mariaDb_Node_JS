const todoDao= require('../dao/Todo_task')
const responseMsg = require('../config/config')

module.exports = {
    createTask: createTask,
    fetchTask: fetchTask,
    deleteTask: deleteTask,
    updateTask: updateTask,
    deleteall:deleteall,
    deleteTaskById:deleteTaskById
}


function createTask(req, res) {
    return todoDao.createTask(req.body).then(function () {
        res.status(201).send(responseMsg.successMsg(null,"Added Successfully"))
    }).catch(e => {
        res.status(400).send(responseMsg.failureMsg(e.message))
    })
}

function fetchTask(req,res) {
    return todoDao.fetchTask(req).then(function (response) {
        res.status(200).send(responseMsg.successMsg(response,"fetched Successfully"))
    }).catch(e => {
        res.status(400).send(responseMsg.failureMsg(e.message))
    })
}

function deleteTask(req, res) {
    return todoDao.deleteTask(req.body).then(function () {
        res.status(200).send(responseMsg.successMsg(null,"Deleted Successfully"))
    }).catch(e => {
        res.status(400).send(responseMsg.failureMsg(e.message))
    })
}

function updateTask(req, res) {
    return todoDao.updateTask(req.body).then(function () {
        res.status(200).send(responseMsg.successMsg(null,"Updated Successfully"))
    }).catch(e => {
        res.status(400).send(responseMsg.failureMsg(e.message))
    })
}


function deleteall(req,res){
    return todoDao.deleteAll().then(()=>{
        res.status(200).send(responseMsg.successMsg(null,"All task deleted successfully"))
    })
    .catch(e=>{
        res.send(400).send(responseMsg.failureMsg(e.message))
    })
}


function deleteTaskById(req,res){
    return todoDao.deleteById(req.body).then(()=>{
        res.status(200).send(responseMsg.successMsg(null,"Selected task deleted successfully"))
    }).catch(e=>{
        res.status(400).send(responseMsg.failureMsg(e.message))
    })
}