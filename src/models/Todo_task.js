module.exports = (Sequelize, type) => {
    return Sequelize.define('todo_tasks', {
        task_id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        task_name: {
            type: type.STRING,
            required: true,
            allownull:false
        },
        task_status: {
            type: type.BOOLEAN,
            defaultValue: false
        }
    }, {
        timestamps: false
    })
}