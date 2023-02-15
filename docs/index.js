
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

var stopRestoreTimer = false; 
const restoreListTimer = window.setInterval(restoreListFadeOut, 80); 

document.querySelectorAll(".delete").forEach((element) => element.addEventListener("click", deleteToDoItem)); 
document.querySelectorAll(".doRestore").forEach((element) => element.addEventListener("click", restoreItem));
document.querySelector(".restoreToDoList").addEventListener("mouseover", () => stopRestoreTimer = true); 
document.querySelector(".restoreToDoList").addEventListener("mouseout", () => stopRestoreTimer = false); 

function deleteToDoItem(event) {
	let item = event.target; 
	while (!item.classList.contains("toDoItem")) { item = item.parentElement; }
	item.querySelector("input").disabled = true;  
	document.querySelector(".restoreToDoList").insertBefore(item, document.querySelector(".restoreToDoList").firstChild);
}

function restoreItem(event) {
	let itemToRestore = event.target; 
	while (!itemToRestore.classList.contains("toDoItem")) { itemToRestore = itemToRestore.parentElement; }
	itemToRestore.style.opacity = 1; 
	itemToRestore.querySelector("input").disabled = false; 
	document.querySelector(".listToDoItems").appendChild(itemToRestore); 
}

function restoreListFadeOut() {
	let restoreList = document.querySelectorAll(".restoreToDoList .toDoItem"); 
	if (restoreList.length < 1 || stopRestoreTimer ) return; 
	restoreList.forEach((item) => {
		item.style.opacity = (!item.style.opacity) ? 1 : item.style.opacity - 0.02; 
		if (item.style.opacity < 0) {	document.querySelector(".restoreToDoList").removeChild(item);	}
	}); 
}

