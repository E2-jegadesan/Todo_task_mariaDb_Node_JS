const TodoDao= require('../dao/Todo_task')
const ResponseMsg = require('../config/config')

module.exports = {
    createTask: createTask,
    fetchTask: fetchTask,
    deleteTask: deleteTask,
    updateTask: updateTask,
    deleteall:deleteall,
    deleteTaskById:deleteTaskById
}


function createTask(req, res) {
    return TodoDao.createTask(req.body).then(function () {
        res.status(201).send(ResponseMsg.Successmsg(null,"Added Successfully"))
    }).catch(e => {
        res.status(400).send(ResponseMsg.Failuremsg(e.message))
    })
}

function fetchTask(req,res) {
    return TodoDao.fetchTask(req).then(function (response) {
        res.status(200).send(ResponseMsg.Successmsg(response,"fetched Successfully"))
    }).catch(e => {
        res.status(400).send(ResponseMsg.Failuremsg(e.message))
    })
}

function deleteTask(req, res) {
    return TodoDao.deleteTask(req.body).then(function () {
        res.status(200).send(ResponseMsg.Successmsg(null,"Deleted Successfully"))
    }).catch(e => {
        res.status(400).send(ResponseMsg.Failuremsg(e.message))
    })
}

function updateTask(req, res) {
    return TodoDao.updateTask(req.body).then(function () {
        res.status(200).send(ResponseMsg.Successmsg(null,"Updated Successfully"))
    }).catch(e => {
        res.status(400).send(ResponseMsg.Failuremsg(e.message))
    })
}


function deleteall(req,res){
    return TodoDao.deleteAll().then(()=>{
        res.status(200).send(ResponseMsg.Successmsg(null,"All task deleted successfully"))
    })
    .catch(e=>{
        res.send(400).send(ResponseMsg.Failuremsg(e.message))
    })
}


function deleteTaskById(req,res){
    return TodoDao.deleteById(req.body).then(()=>{
        res.status(200).send(ResponseMsg.Successmsg(null,"Selected task deleted successfully"))
    }).catch(e=>{
        res.status(400).send(ResponseMsg.Failuremsg(e.message))
    })
}