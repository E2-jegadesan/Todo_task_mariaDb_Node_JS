const Todotask =require('../models/Todo_task')

const Sequelize = require('sequelize')
const SequelizeData = new Sequelize('task', 'root', 'root',{
    dialect: 'mariadb',
    port: "3306"
})
const Todo = Todotask(SequelizeData, Sequelize.DataTypes)

module.exports={
    Todo
}