{
    const welcome = () => {
        console.log("Witam na mojej stronie!");
    };

    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [...tasks, { content: newTaskContent }];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex + 1),
        ];

        render();
    };

    const markAllTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));

        render();
    };

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const bindToggleDoneEvents = () => {
            const toggleDoneButtons = document.querySelectorAll(".js-done");

            toggleDoneButtons.forEach((toggleDoneButton, index) => {
                toggleDoneButton.addEventListener("click", () => {
                    toggleTaskDone(index);
                });
            });
        };

        const renderTasks = () => {
            const taskToHTML = task => `
            <li class="
            task__item${task.done && hideDoneTasks ? " tasks__item--hidden" : ""} js-task
            ">
            <button class="tasks__button tasks__button--done js-done">
                ${task.done ? "✔" : ""}
            </button>
            <span class="tasks__content${task.done ? " tasks__content--done" : ""}">
                ${task.content}
            </span>
            <button class="tasks__button tasks__button--remove js-remove">
                🗑
            </button>
            </li>
            `;

            const tasksElement = document.querySelector(".js-task");
            tasksElement.innerHTML = tasks.map(taskToHTML).join("");
        };

        document.querySelector(".js-task").innerHTML = htmlString;

        bindEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask")
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }

        newTaskElement.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);

        welcome();
    };

    init();
}