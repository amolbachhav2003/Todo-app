document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById("todo-input");
    const addTaskButton = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo-list");

    let tasks = JSON.parse(localStorage.getItem("task")) || []; 

    tasks.forEach(task => {
        renderTasks(task);
    });

    addTaskButton.addEventListener('click', () => {
        const inputText = todoInput.value.trim();
        if(inputText === "") return;
        const newTask = {
            id: Date.now(),
            text: inputText,
            completed: false,
        }
        todoInput.value = "";
        tasks.push(newTask);
        console.log(tasks);
        saveTask();
        renderTasks(newTask);
    })

    //saving tasks in localStorage of browser

    function saveTask() {
        localStorage.setItem("task", JSON.stringify(tasks));
    }

    function renderTasks(task) {
        const li = document.createElement('li');
        li.setAttribute("id", task.id);
        li.innerHTML = `${task.text} <button>Delete</button>`;
        todoList.appendChild(li);

        li.addEventListener('click', (e) => {
            if(e.target.tagName === "BUTTON") return;
            li.classList.toggle("completed");
            task.completed = !task.completed;
            saveTask();
        })

        li.querySelector("button").addEventListener('click', (e) => {
            e.stopPropagation;
            tasks = tasks.filter((t) => {t.id !== task.id});
            li.remove();
            saveTask();
        })
    }

})