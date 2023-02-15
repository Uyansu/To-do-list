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

const listTodoItemsDiv = document.querySelector('.listTodoItems');

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
          <img src="images/trash.svg">
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





