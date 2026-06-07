let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", addTask);

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filter = "all") {

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if(filter === "active"){
        filteredTasks = tasks.filter(task => !task.completed);
    }

    if(filter === "completed"){
        filteredTasks = tasks.filter(task => task.completed);
    }

    filteredTasks.forEach((task, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">
                ${task.text}
            </span>

            <button onclick="toggleTask(${index})">
                Complete
            </button>

            <button onclick="editTask(${index})">
                Edit
            </button>

            <button onclick="deleteTask(${index})">
                Delete
            </button>
        `;

        taskList.appendChild(li);
    });
}

function addTask() {

    if(taskInput.value.trim() === "") return;

    tasks.push({
        text: taskInput.value,
        completed:false
    });

    saveTasks();
    renderTasks();

    taskInput.value = "";
}

function deleteTask(index) {

    tasks.splice(index,1);

    saveTasks();

    renderTasks();
}

function toggleTask(index) {

    tasks[index].completed =
        !tasks[index].completed;

    saveTasks();

    renderTasks();
}

function editTask(index) {

    const updated =
        prompt("Edit task", tasks[index].text);

    if(updated !== null){

        tasks[index].text = updated;

        saveTasks();

        renderTasks();
    }
}

function filterTasks(type){

    renderTasks(type);
}

renderTasks();