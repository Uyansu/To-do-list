
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
	updateToDoListProgressBar(); 
	taskEl.querySelector("button").onclick = restoreItem;
	taskEl.querySelector("input").onchange = updateToDoListProgressBar;
	taskEl.querySelector(".delete").onclick = deleteToDoItem;

	input.value ="";



	// ---- start edit button -----------------
	const imgEdit = taskEl.querySelector(".edit");
	console.log(imgEdit);

	const itemMenu = taskEl.querySelector(".toDoItemMenu");
	console.log(itemMenu);

	const itemSpan = taskEl.querySelector(".task");
	console.log(itemSpan);


	imgEdit.addEventListener('click', (e) => {
 
		 //console.log('e.target.parentElement: ' + e.target.parentElement.innerHTML);	
		 //alert('click');
		 imgOk = document.createElement('img');
		 imgOk.src = 'images/ok.svg';
		 imgOk.classList.add('editOk');
		 // console.log(imgOk);	
		 itemMenu.appendChild(imgOk);

		 noneEditDelete(); // disable edit für andere tasks 

		 taskEdit(imgOk, itemSpan);
	 })
 	// ---- end edit button ----


});  // end form


// ---- start edit ----------------------------

let imagesEdit;
let imagesDelete;
const submitFormBtn = document.querySelector('form button[type="submit"]');

function createTasksArrays() {
	imagesEdit = document.querySelectorAll('.toDoItemMenu .edit');
	console.log(imagesEdit);
	
	imagesDelete = document.querySelectorAll('.toDoItemMenu .delete');
	console.log(imagesDelete);
}

function noneEditDelete() {
	createTasksArrays(); 
	//console.log(imagesEdit);
	imagesEdit.forEach((el, j) => {
		imagesEdit[j].style.display 	= 'none'; 
		imagesDelete[j].style.display = 'none';
	})	

	input.disabled = true;
	submitFormBtn.disabled = true; 
}

function taskEdit(imgOk, itemSpan){
	// console.log('taskEdit run... OK-button active');
	
	let toDoItemInput = document.createElement('input');
	toDoItemInput.value = itemSpan.innerHTML;
	toDoItemInput.setAttribute('type', 'text');
	toDoItemInput.classList.add('inputEdit');
	itemSpan.replaceWith(toDoItemInput);  // convert span to input

	imgOk.addEventListener('click', () => {
		editOk(itemSpan, toDoItemInput);
	});

	toDoItemInput.addEventListener('keypress', (e) => { 
		if (e.key === 'Enter') {
			editOk(i, toDoItemInput);
		}
	})
}

function editOk(itemSpan, toDoItemInput) {
	// console.log('imgEditOk click');

	itemSpan.innerHTML = toDoItemInput.value;
	toDoItemInput.replaceWith(itemSpan);  // convert input to span 
	//console.log('update: ' + itemSpan.innerHTML);

	imagesEdit.forEach( (el, j) => {
	  imagesEdit[j].style.display		= 'inline'; 
	  imagesDelete[j].style.display 	= 'inline';
	})

	input.disabled = false;
	submitFormBtn.disabled = true; 

	imgOk.remove();	
}

// --- end edit ----



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
	updateToDoListProgressBar(); 
}

function restoreItem(event) {
	let itemToRestore = event.target; 
	while (!itemToRestore.classList.contains("toDoItem")) { itemToRestore = itemToRestore.parentElement; }
	itemToRestore.style.opacity = 1; 
	itemToRestore.querySelector("input").disabled = false; 
	document.querySelector(".listToDoItems").appendChild(itemToRestore); 
	updateToDoListProgressBar(); 
}

function restoreListFadeOut() {
	let restoreList = document.querySelectorAll(".restoreToDoList .toDoItem"); 
	if (restoreList.length < 1 || stopRestoreTimer ) return; 
	restoreList.forEach((item) => {
		item.style.opacity = (!item.style.opacity) ? 1 : item.style.opacity - 0.02; 
		if (item.style.opacity < 0) {	document.querySelector(".restoreToDoList").removeChild(item);	}
	}); 
}

function updateToDoListProgressBar() {
	let itemsChecked = document.querySelectorAll(".listToDoItems input[type=checkbox]:checked").length ??= 0;
	let itemsNotChecked = document.querySelectorAll(".listToDoItems input[type=checkbox]:not(:checked)").length ??= 0;
	let progress = ((itemsChecked + itemsNotChecked) <= 0) ? 0 : Math.round(itemsChecked * 100 / (itemsChecked + itemsNotChecked));  
	document.querySelector(".toDoListProgressBar").value = progress; 
}



