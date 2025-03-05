document.addEventListener("DOMContentLoaded", () => {
    const taskList = document.getElementById("taskList");
    const taskForm = document.getElementById("taskForm");
    const userIdInput = document.getElementById("user-id");
    const taskTitleInput = document.getElementById("task-title");
    const taskDescInput = document.getElementById("task-desc");
    const taskCompletedInput = document.getElementById("completed");
    const filterUserInput = document.getElementById("filter-user");
    const filterButton = document.getElementById("filter-btn");
    
    let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Recupera as tarefas salvas
    renderTasks();

    taskForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const newTask = {
            userId: userIdInput.value,
            title: taskTitleInput.value,
            description: taskDescInput.value,
            completed: taskCompletedInput.checked
        };

        tasks.push(newTask);
        saveTasks();
        renderTasks();
        taskForm.reset();
    });

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function renderTasks(filteredUserId = null) {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            if (filteredUserId === null || task.userId == filteredUserId) {
                addTaskToList(task, index);
            }
        });
    }

    function addTaskToList(task, index) {
        const li = document.createElement("li");
        li.classList.add("task-item");

        li.innerHTML = `
            <span><strong>${task.title}</strong> (${task.completed ? "✔️" : "❌"}) - ${task.description} [ID: ${task.userId}]</span>
            <div>
                <button class="edit-task">Editar</button>
                <button class="delete-task">Excluir</button>
            </div>
        `;

        const editButton = li.querySelector(".edit-task");
        const deleteButton = li.querySelector(".delete-task");

        editButton.addEventListener("click", () => editTask(index));
        deleteButton.addEventListener("click", () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        taskList.appendChild(li);
    }

    function editTask(index) {
        const task = tasks[index];
        taskTitleInput.value = task.title;
        taskDescInput.value = task.description;
        userIdInput.value = task.userId;
        taskCompletedInput.checked = task.completed;

        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }

    filterButton.addEventListener("click", () => {
        const filteredUserId = filterUserInput.value.trim();
        renderTasks(filteredUserId || null);
    });
});