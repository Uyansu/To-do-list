
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



// edit start

 let imagesEdit;
 let imagesDelete;
 let itemSpans;
 let itemsMenu;
 
 function refreshArrayOfTasks() {
	 imagesEdit = document.querySelectorAll('.toDoItemMenu .edit');
	 console.log(imagesEdit);
	 
	 imagesDelete = document.querySelectorAll('.toDoItemMenu .delete');
	 console.log(imagesDelete);
	 
	 itemSpans = document.querySelectorAll('.toDoItem .task');
	 console.log(itemSpans);
	 
	 itemsMenu = document.querySelectorAll('.toDoItemMenu');
	 console.log(itemsMenu);
 }
 
 refreshArrayOfTasks();

 
 imagesEdit.forEach( (imgEdit, i) => {

	if(i == imagesEdit.length-1) {
		imgEdit.addEventListener('click', (e) => {

		 //console.log('e.target.parentElement: ' + e.target.parentElement.innerHTML);	
		 //alert('click');
		 imgOk = document.createElement('img');
		 imgOk.src = 'images/ok.svg';
		 imgOk.classList.add('editOk');
		 // console.log(imgOk);	
		 
		 // console.log(itemsMenu[i]);
		 itemsMenu[i].appendChild(imgOk);
	 

		 imagesEdit.forEach((imgEdit, j) => {
			imagesEdit[j].style.display 	= 'none'; 
			imagesDelete[j].style.display = 'none';
		 })
	 
		 taskEdit(i, imgOk);
	 })

	} 
 })
 
 function taskEdit(i, imgOk){
	 console.log('taskEdit run...');
	 
	 let toDoItemInput = document.createElement('input');
	 toDoItemInput.value = itemSpans[i].innerHTML;
	 itemSpans[i].replaceWith(toDoItemInput);  // convert span to input
 
	 imgOk.addEventListener('click', () => {
		 editOk(i, toDoItemInput);
	 });
 
	 toDoItemInput.addEventListener('keypress', (e) => { 
		 if (e.key === 'Enter') {
			 editOk(i, toDoItemInput);
		 }
	 })
 }
 
 function editOk(i, toDoItemInput) {
	 console.log('imgEditOk click');
	 console.log('old: ' + itemSpans[i].innerHTML);
 
	 itemSpans[i].innerHTML = toDoItemInput.value;
	 toDoItemInput.replaceWith(itemSpans[i]);  // convert input to span 
	 console.log('update: ' + itemSpans[i].innerHTML);
 
	 imagesEdit.forEach((imgEdit, j) => {
		imagesEdit[j].style.display 	= 'inline'; 
		imagesDelete[j].style.display = 'inline';
	 })
 
	 imgOk.remove();	
 }
 
// edit end
 

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



