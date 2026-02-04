let input = document.getElementById('taskInput')
let add = document.getElementById('add')
let taskList = document.getElementById('taskList')
let tasks = JSON.parse(localStorage.getItem("tasks")) || []

add.addEventListener('click' , task)
renderTask()

function task(){
    if (input.value ===""){
        return
    }

    tasks.push({
        text :input.value,
        completed:false
    })
    saveTasks();
    renderTask()

    input.value = ""
}

function saveTasks(){
    localStorage.setItem("tasks" , JSON.stringify(tasks));
}

function renderTask(){

    taskList.innerHTML = ""

    for(let i=0 ; i<tasks.length  ; i++){

        let div = document.createElement('div')
        div.className = 'task-item'

        let span = document.createElement('span')
        span.innerText = tasks[i].text

        if(tasks[i].completed){
            span.classList.add('completed')
        }

        span.addEventListener('click' , function(){
            toggleComplete(i)
        })


         let editBtn = document.createElement('button');
        editBtn.innerText = "✏️";
        editBtn.className = "edit-btn";

        editBtn.addEventListener('click', function () {
            editTask(i);
        });



        let delBtn = document.createElement('button')
        delBtn.innerText = "❌"
        delBtn.className = "delete-btn"

        delBtn.addEventListener('click' ,function(){
            deleteTask(i)
        })

        div.appendChild(span)
        div.appendChild(editBtn)

        div.appendChild(delBtn)

        taskList.appendChild(div)
    }
}

function deleteTask(index){
    tasks.splice(index , 1);
    saveTasks()
    renderTask()
}


function toggleComplete(index){
    tasks[index].completed = !tasks[index].completed
    saveTasks()
    renderTask()
}

function editTask(index) {

    let newText = prompt("Edit your task:", tasks[index].text);

    if (newText === null || newText.trim() === "") {
        return;
    }

    tasks[index].text = newText.trim();
    saveTasks();
    renderTask();
}