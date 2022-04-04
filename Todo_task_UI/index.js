//Query Selector

const textInput = document.querySelector('.input-text');
let addbtn = document.querySelector('.add-button');
let savebtn = document.querySelector('.save-button');
let addtasklist = document.getElementById('todoLists');
let filterOption = document.querySelector('.tab');

// EventListener
filterOption.addEventListener("click", filterTodotask);

let Taskarray = [];

// Get list UI
function getTask(Taskarray) {
    let html = '';
    if (Taskarray.length > 0) {
        Taskarray.forEach((item) => {
            html += `<div class="todo ${item.task_status ? 'completed' : ''}">
                    <input type="checkbox" id="mycheck" value="${item.task_id}">
                    <li class="todo-item">${item.task_name}</li>
                    <button type="button" title="task status"  class="complete-btn" onclick="Taskstatus('${item.task_id}','${item.task_status}')"><i class="fas fa-check"></i></button>
                    <button type="button" title = "Edit task" class="edit-btn" onclick="updateTask('${item.task_id}','${item.task_name}')"><i class="fas fa-edit" ></i></button>
                    <button type="button" title = "delete task" class="trash-btn" onclick="removeTask('${item.task_id}')"><i class="fas fa-trash"></i></button>     
                    </div>`
        });
    } else {
        html += `<div class="todo1">
                    <li class="todo-items">No record found</li>     
                    </div>`
    }
    addtasklist.innerHTML = html;
}
// ADD Function
document.addEventListener("DOMContentLoaded", () => {
    addbtn.addEventListener("click", (e) => {
        const items = textInput.value.trim();
        e.preventDefault();
        let msg = ""
        let error = document.getElementById('error');
        if (items == 0) {
            msg = "Please Enter the Task"
            error = document.getElementById('error');
            error.innerHTML = msg
            setTimeout(() => {
                msg = ""
                error.innerHTML = msg
            }, 2000);
            return;
        } else {
            createTask()
            getAlltask();
            document.querySelectorAll('.tabs').forEach((tab) => {
                tab.classList.remove("active");
            })
            document.getElementById('tab' + 1).classList.add("active");
        }
        textInput.value = '';
    });
    getAlltask();
});


const createTask = async function(){
    await fetch('http://localhost:3001/createTask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            task_name: textInput.value
        }),
    }).then((response) =>
        response.json().then(data => ({
            data: data,
            status: response.status//check it now
        }))).then((res) => {
            if (res.status == 201) {
                iziToast.success({
                    title: 'Success',
                    message: res.data.message,
                    position: 'topRight'
                });
            }else{
                iziToast.error({
                    title: 'Error',
                    message: 'Something went wrong',
                    position: 'topRight'
                });
            }
        }).catch(() => {
            iziToast.error({
                title: 'Error',
                message: 'Something went wrong',
                position: 'topRight'
            });
        });
}

// Get all Task Here 
const getAlltask = async function () {
    await fetch('http://localhost:3001/fetchTask', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((response) => response.json()
        .then(data => ({
            data: data,
            status: response.status
        }))).then((res) => {
            if (res.status == 200) {
                Taskarray = res.data.data;
            }else {
                iziToast.error({
                    title: 'Error',
                    message: 'Something went wrong',
                    position: 'topRight'
                });
            }
        }).catch(() => {
            iziToast.error({
                title: 'Error',
                message: 'Something went wrong',
                position: 'topRight'
            });
        })
    getTask(Taskarray);
}

// Task Complete or Incomplete Button Function
function Taskstatus(value, done) {
    var id = value;
    let Done = JSON.parse(done)
    if (Done === false) {
        Done = true;
        fetch('http://localhost:3001/taskUpdated', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                task_status: Done,
                task_id: id
            }),
        }).then((response) =>
            response.json().then(data => ({
                data: data,
                status: response.status
            }))).then((res) => {
                if (res.status == 200) {
                    iziToast.success({
                        title: 'Completed',
                        message: res.data.message,
                        position: 'topRight'
                    });
                }else{
                    iziToast.error({
                        title: 'Failure',
                        message: res.data.message,
                        position: 'topRight'
                    });
                }
                getAlltask();
            }).catch(() => {
                iziToast.error({
                    title: 'Error',
                    message: 'Something went wrong',
                    position: 'topRight'
                });;
            });
    }
    else if (Done === true) {
        Done = false;
        fetch('http://localhost:3001/taskUpdated', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                task_status: Done,
                task_id: id
            }),
        }).then((response) =>
            response.json().then(data => ({
                data: data,
                status: response.status
            }))).then((res) => {
                if (res.status == 200) {
                    iziToast.success({
                        title: 'Incompleted',
                        message: res.data.message,
                        position: 'topRight'
                    });
                }else{
                    iziToast.error({
                        title: 'Failure',
                        message: res.data.message,
                        position: 'topRight'
                    });
                }
                getAlltask();
            }).catch(() => {
                iziToast.error({
                    title: 'Error',
                    message: 'Something went wrong',
                    position: 'topRight'
                });
            });
    }
}


// Edit Task Function
function updateTask(value, data) {
    textInput.value = data;
    EditedIndex = value
    addbtn.style.display = "none";
    savebtn.style.display = "inline";
}
savebtn.addEventListener('click', function () {
    var Data = Taskarray;
    var InputValue = EditedIndex;
    for (var i = 0; i < Data.length; i++) {
        if (InputValue == Data[i].task_id) {
            var EditedInput = document.getElementById("InputText").value.trim();
            fetch('http://localhost:3001/taskUpdated', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    task_name: EditedInput,
                    task_id: InputValue
                }),
            }).then((response) =>
                response.json().then(data => ({
                    data: data,
                    status: response.status
                }))).then((res) => {
                    if (res.status == 200) {
                        iziToast.success({
                            title: 'Task',
                            message: res.data.message,
                            position: 'topRight'
                        });
                    }else if (res.status == 400) {
                        iziToast.error({
                            title: 'Failure',
                            message: res.data.message,
                            position: 'topRight'
                        });
                    }
                    getAlltask();
                }).catch(() => {
                    iziToast.error({
                        title: 'Error',
                        message: 'Something went wrong',
                        position: 'topRight'
                    });
                });
        }
    }
    textInput.value = "";
    addbtn.style.display = "inline";
    savebtn.style.display = "none";
})

// Remove Function
function removeTask(value) {
    fetch('http://localhost:3001/deleteTask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            task_id: value
        })
    }).then((response) =>
        response.json().then(data => ({
            data: data,
            status: response.status
        }))).then((res) => {
            if (res.status == 200) {
                iziToast.success({
                    title: 'Success',
                    message: res.data.message,
                    position: 'topRight',
                });
            }else{
                iziToast.error({
                    title: 'Failure',
                    message: res.data.message,
                    position: 'topRight',
                });
            }
            getAlltask();
        }).catch(() => {
            iziToast.error({
                title: 'Error',
                message: 'Something went wrong',
                position: 'topRight'
            });
        })
    document.querySelectorAll('.tabs').forEach((tab) => {
        tab.classList.remove("active");
    })
    document.getElementById('tab' + 1).classList.add("active");
}

// Delete all task function
function deleteAlltask() {
    if (Taskarray.length > 0) {
        if (confirm("Sure you want to delete all task..?") === true) {

            fetch('http://localhost:3001/deleteAllTask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((response) =>
                response.json().then(data => ({
                    data: data,
                    status: response.status
                })))
                .then((res) => {
                    if (res.status == 200) {
                        iziToast.success({
                            title: 'Success',
                            message: res.data.message,
                            position: 'topRight',
                        });
                    } else {
                        iziToast.error({
                            title: 'Failure',
                            message: res.data.message,
                            position: 'topRight',
                        });
                    }
                    getAlltask();
                }).catch(() => {
                    iziToast.error({
                        title: 'Error',
                        message: 'Something went wrong',
                        position: 'topRight'
                    });
                })
        }
    }
    else {
        iziToast.error({
            title: 'Sorry',
            message: 'No available data',
            position: 'topRight'
        });
    }
}
// Delete Selected Task Function
function deleteSelectedTask() {
    let check = document.querySelectorAll('input[type ="checkbox"]:checked');
    let checkdata = []
    check.forEach((checkbox) => {
        checkdata.push(checkbox.value)
    })
    if (checkdata.length > 0) {
        if (confirm("sure you want delete selected task..?") === true) {
            fetch('http://localhost:3001/deleteSelectedTask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    task_id: checkdata
                })
            }).then((response) =>
                response.json().then(data => ({
                    data: data,
                    status: response.status
                })))
                .then((res) => {
                    if (res.status == 200) {
                        iziToast.success({
                            title: 'Success',
                            message: res.data.message,
                            position: 'topRight',
                        });
                    } else {
                        iziToast.error({
                            title: 'Failure',
                            message: res.data.message,
                            position: 'topRight',
                        });
                    }
                    getAlltask();
                }).catch(() => {
                    iziToast.error({
                        title: 'Error',
                        message: 'Something went wrong',
                        position: 'topRight'
                    });
                })
        } else {
            return;
        }
    } else {
        return
    }
}
// Filter Tab Function
function tabs(tabIndex) {
    document.getElementById('tab1').style.display = "inline";
    document.getElementById('tab2').style.display = "inline";
    document.getElementById('tab3').style.display = "inline";

    document.getElementById('tab' + tabIndex).style.display = "inline";
    if (tabIndex == 1) {
        document.getElementById('tab' + 3).classList.remove("active");
        document.getElementById('tab' + 2).classList.remove("active");
    } else if (tabIndex == 2) {
        document.getElementById('tab' + 1).classList.remove("active");
        document.getElementById('tab' + 3).classList.remove("active");
    } else if (tabIndex == 3) {
        document.getElementById('tab' + 1).classList.remove("active");
        document.getElementById('tab' + 2).classList.remove("active");
    }
    document.getElementById('tab' + tabIndex).classList.add("active");
}
// Filter Tasks  Function
function filterTodotask(e) {
    let filterItems = [];
    switch (e.target.value) {
        case "tabcompleted":
            filterItems = Taskarray.filter((item) => item.task_status);
            break;
        case "tabuncompleted":
            filterItems = Taskarray.filter((item) => item.task_status === false);
            break;
        case "taball":
            filterItems = Taskarray
    }
    getTask(filterItems)
}