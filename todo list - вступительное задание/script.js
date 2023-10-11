let todos = [];
let todosString = localStorage.getItem('todos');
todos = JSON.parse(todosString);

let ul = document.querySelector('ul');
loadToDos();

function loadToDos() {		
	for (let i = 0; i < todos.length; i++) {
		let li = document.createElement('li');
		li.innerHTML = '<span>' + todos[i].textTodo + '</span>';
		
		if (todos[i].complete == 1) {
			li.children[0].classList.add('complete');
		}
		
		let complete = document.createElement('span');
		complete.innerHTML = '[Complete]';
		complete.addEventListener('click', completeTodos);
		complete.addEventListener('click', refresStyleLi);
		li.append(complete);
		
		let delTodos = document.createElement('span');
		delTodos.innerHTML = '[Удалить]';
		delTodos.addEventListener('click', deleteTodos);
		delTodos.addEventListener('click', refresStyleLi);
		li.append(delTodos);
		
		ul.append(li);
	}
	refresStyleLi();
}

function completeTodos() {
	if (todos[todos.findIndex(el => el.textTodo === this.parentElement.children[0].innerText)].complete == 0) {	
		this.previousSibling.classList.add('complete');
		todos[todos.findIndex(el => el.textTodo === this.parentElement.children[0].innerText)].complete = 1;
		localStorage.setItem('todos', JSON.stringify(todos));
		ul.append(this.parentElement);
	}
}

let addBtn = document.querySelector('#addBtn');
addBtn.onclick = function() {
	let inputValue = document.querySelector('input').value.trim();
	if (!inputValue) {
		alert("Напишите задание");
	} else {
		todos.push({textTodo: inputValue, complete: 0});
		localStorage.setItem('todos', JSON.stringify(todos));
		let li = document.createElement('li');
		li.innerHTML = '<span>' + inputValue + '</span>';
		
		let complete = document.createElement('span');
		complete.innerHTML = '[Complete]';
		complete.addEventListener('click', completeTodos);
		complete.addEventListener('click', refresStyleLi);
		li.append(complete);
		
		let delTodos = document.createElement('span');
		delTodos.innerHTML = '[Удалить]';
		delTodos.addEventListener('click', deleteTodos);
		delTodos.addEventListener('click', refresStyleLi);
		li.append(delTodos);
		
		ul.append(li);
		document.querySelector('input').value = '';
	}
}

let setEvenColorBtn = document.querySelector('#setEvenColorBtn');
setEvenColorBtn.addEventListener('click', () => setStyleElem('even'));

let setOddColorBtn = document.querySelector('#setOddColorBtn');
setOddColorBtn.addEventListener('click', () => setStyleElem('odd'));

function setStyleElem(options) {
	if (options == 'odd') localStorage.setItem('styleOdd', 'on');
	if (options == 'even') localStorage.setItem('styleEven', 'on');
	
	let liAllElements = document.querySelectorAll('li');
	for (let elem of liAllElements) {
		if (elem.classList.contains(options)) {
			elem.classList.remove(options);
		}
	}
	
	let liElements = document.querySelectorAll('ul > li:nth-child('+ options +')');
	for (let elem of liElements) {
		elem.classList.add(options);
	}
}

let delFirstElemBtn = document.querySelector('#delFirstElemBtn');
delFirstElemBtn.addEventListener('click', () => delElem(ul.children[0]));
delFirstElemBtn.addEventListener('click', refresStyleLi);

let delLastElemBtn = document.querySelector('#delLastElemBtn');
delLastElemBtn.addEventListener('click', () => delElem(ul.children[ul.children.length - 1]));
delLastElemBtn.addEventListener('click', refresStyleLi);

function delElem(elem) {		
	todos.splice(todos.findIndex(el => el.textTodo === elem.firstElementChild.innerText), 1);
	localStorage.setItem('todos', JSON.stringify(todos));
	elem.remove();
} 

function deleteTodos() {	
	todos.splice(todos.findIndex(el => el.textTodo === this.parentElement.children[0].innerText), 1);	
	localStorage.setItem('todos', JSON.stringify(todos));
	this.parentElement.remove();	
}

function refresStyleLi() {
	let liAllElements = document.querySelectorAll('li');
	
	if (localStorage.getItem('styleOdd') == 'on') {		
		for (let elem of liAllElements) {
			if (elem.classList.contains('odd')) {
				elem.classList.remove('odd');
			}
		}
		
		let liOddElements = document.querySelectorAll('ul > li:nth-child(odd)');
		for (let elem of liOddElements) {
			elem.classList.add('odd');
		}
	}
	
	if (localStorage.getItem('styleEven') == 'on') {		
		for (let elem of liAllElements) {
			if (elem.classList.contains('even')) {
				elem.classList.remove('even');
			}
		}
		
		let liEvenElements = document.querySelectorAll('ul > li:nth-child(even)');
		for (let elem of liEvenElements) {
			elem.classList.add('even');
		}
	}
}