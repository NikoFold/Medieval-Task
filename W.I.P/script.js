document.addEventListener("DOMContentLoaded", () => {
    const taskList = document.getElementById("taskList");
    const taskForm = document.getElementById("taskForm");
    const userIdInput = document.getElementById("user-id");
    const taskTitleInput = document.getElementById("task-title");
    const taskDescInput = document.getElementById("task-desc");
    const taskCompletedInput = document.getElementById("completed");

    taskForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const newTask = {
            userId: userIdInput.value,
            title: taskTitleInput.value,
            description: taskDescInput.value,
            completed: taskCompletedInput.checked
        };

        addTaskToList(newTask);
        taskForm.reset();
    });

    function addTaskToList(task) {
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

        editButton.addEventListener("click", () => editTask(li, task));
        deleteButton.addEventListener("click", () => li.remove());

        taskList.appendChild(li);
    }

    function editTask(li, task) {
        taskTitleInput.value = task.title;
        taskDescInput.value = task.description;
        userIdInput.value = task.userId;
        taskCompletedInput.checked = task.completed;
        li.remove();
    }
});