const connection = require('../db/mariaDB')

module.exports = {
    createTask: createTask,
    fetchTask: fetchTask,
    deleteTask: deleteTask,
    updateTask: updateTask,
    deleteAll:deleteAll,
    deleteById:deleteById
    
}

function createTask(data) {
    return new Promise((resolve, reject) => {
        connection.Todo.create(data).then((rowupdated) => {
            resolve(rowupdated)
        }).catch(e => {
            reject(e)
            return;
        })
    })
}

function fetchTask() {
    return new Promise((resolve, reject) => {
        connection.Todo.findAll().then((rowupdated) => {
            resolve(rowupdated)
        }).catch(e => {
            reject(e)
            return;
        })
    })
}


function deleteTask(data){
    const where = {
        task_id: data.task_id
    }
    return new Promise((resolve, reject) => {
        connection.Todo.destroy({ where: where }).then((rowsUpdated) => {
            resolve(rowsUpdated);
        }).catch(err => {
            reject(err);
            return;
        });
    });
}


function deleteAll(){
    return new Promise((resolve,reject)=>{
        connection.Todo.destroy({where :{}}).then((rowDeleted)=>{
            resolve(rowDeleted)
        })
        .catch(err=>{
            reject(err)
            return;
        })

    })
}

function deleteById(data){
    return new Promise((resolve,reject)=>{
        const where={
            task_id:data.task_id
        }
        connection.Todo.destroy({where:where}).then((rowDeleted)=>{
            resolve(rowDeleted)
        }).catch(err=>{
            reject(err);
            return;
        })
    })
}


function updateTask(data) {
    const where = {
        task_id: data.task_id
    }
    return new Promise((resolve, reject) => {
        connection.Todo.update(data, { where: where }).then((rowsUpdated) => {
            resolve(rowsUpdated);
        }).
            catch(err => {
                reject(err);
                return;
            });
    });
}