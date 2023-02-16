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
    <button class="doRestore">↺</button>
    <div class="toDoItemMenu">
<img class="edit" src="images/pencil.svg">
<img class="delete" src="images/trash.svg">
</div>`;

toDoList.appendChild(taskEl);

// console.log(toDoList);

taskEl.querySelector("button").onclick = restoreItem;
taskEl.querySelector(".delete").onclick = deleteToDoItem;

// todo: vitali funktionsnamen holen 
//taskEl.querySelector("edit").onclick = ???;

input.value ="";

});

