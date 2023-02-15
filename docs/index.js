const form = document.querySelector(".addTodoItem");
const input = document.querySelector("#newTaskInput");
const toDoList = document.querySelector(".listToDoItems");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const task = input.value;

    const taskEl = document.createElement("div");
    taskEl.classList.add("toDoItem");
    

    taskEl.innerHTML = `
    <label>
        <input type="checkbox">
        <span class="task">${task}</span>
    </label>
    <div class="toDoItemMenu">
<img class="edit" src="images/pencil.svg">
<img class="delete" src="images/trash.svg">
</div>`;
console.log(toDoList);
toDoList.appendChild(taskEl);
});

