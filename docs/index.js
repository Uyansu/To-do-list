const form = document.querySelector(".addTodoItem");
const input = document.querySelector(".newTaskInput");
const listEl = document.querySelector(".toDoItem");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const task = input.value;

    const taskEl = document.createElement("div");
    taskEl.classList.add("toDoItem");

    const taskContentEl = document.createElement("label");
    taskContentEl.classList.add("labelArea");

    taskEl.appendChild(taskContentEl);

    const taskInputEl = document.createElement("input");
    taskInputEl.type = "checkbox";

    taskContentEl.appendChild(taskInputEl);

    const taskInputEl2 = document.createElement("input");
    taskInputEl2.type = "text";

    taskContentEl.appendChild(taskInputEl2);
    
    const taskActionEl = document.createElement("div");
    taskActionEl.classList.add(toDoItemMenu);

    const editElement = document.createElement("img");
    editElement.classList.add("edit");
    editElement.src = "images/pencil.svg";

    const deleteElement = document.createElement("img");
    deleteElement.classList.add("delete");
    deleteElement.src = "images/trash.svg";

    taskActionEl.appendChild(editElement);
    taskActionEl.appendChild(deleteElement);

});