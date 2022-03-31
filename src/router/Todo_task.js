const express = require('express')
const router = new express.Router()
const todoController = require('../controller/Todo_task')


router.post('/createTask', todoController.createTask);
router.get('/fetchTask',todoController.fetchTask);
router.post('/deleteTask',todoController.deleteTask);
router.put('/taskUpdated',todoController.updateTask);
router.post('/deleteAlltask',todoController.deleteall);
router.post('/deleteTaskbyId',todoController.deleteTaskById)


module.exports = router
