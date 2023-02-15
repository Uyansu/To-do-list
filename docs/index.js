
let arrayOfTaskObj = [
	{ 
		task: 'Aufagabe 01',
		status: false
	},
	{ 
		task: 'Aufagabe 02',
		status: false
	},
	{ 
		task: 'Aufagabe 03',
		status: false
	}
]


// arrayOfTaskObj.forEach( taskObj => console.log(taskObj) )

const listTodoItemsDiv = document.querySelector('.listToDoItems');

// console.log(listTodoItemsDiv);

/* 
Syntax:
	element.appendChild(node)
or
	node.appendChild(node)
*/

let toDoItemDiv;

function outputAllTasks(arrayOfObj) {
	arrayOfObj.forEach( taskObj => {
		// console.log(taskObj)
		toDoItemDiv = document.createElement('div');
		toDoItemDiv.classList.add('toDoItem');
		listTodoItemsDiv.appendChild(toDoItemDiv);

		toDoItemDiv.innerHTML = `
			<label>
				<input type="checkbox">
				<span class="task">${ taskObj.task }</span>
	 		</label>
			<div class="toDoItemMenu">
          <img class="edit" src="images/pencil.svg">
          <img class="delete" src="images/trash.svg">
        </div>`
	} )
}

outputAllTasks(arrayOfTaskObj);

let imagesEdit = document.querySelectorAll('.toDoItemMenu .edit');
console.log(imagesEdit);
let itemSpans = document.querySelectorAll('.toDoItem .task');
console.log(itemSpans);
let itemsMenu = document.querySelectorAll('.toDoItemMenu');
console.log(itemsMenu);


imagesEdit.forEach( (imgEdit, i) => {
	imgEdit.addEventListener('click', () => {
		//console.log(itemSpans[i]);	
		//alert('click');


		imgOk = document.createElement('img');
		imgOk.src = 'images/ok.svg';
		imgOk.classList.add('editOk');
		
		console.log(imgOk);	


		console.log(itemsMenu[i]);
		itemsMenu[i].appendChild(imgOk);
		imagesEdit[i].style.display = 'none';

		// taskEditOk(); - convert input to span
				
		
		taskEdit(itemSpans[i]);
	})
})


function taskEdit(toDoItemSpan){
	toDoItemInput = document.createElement('input');
	toDoItemInput.value = toDoItemSpan.innerHTML;
	toDoItemSpan.replaceWith(toDoItemInput);  // convert span to input
}

function taskEditOk(){
	alert('taskEditOk');

	
}






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


