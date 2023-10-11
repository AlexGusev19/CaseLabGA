const button = document.getElementById('myBtn');
const div = document.getElementById('spoiler');

button.addEventListener('click', handleButton);

function handleButton() {	
	if (div.classList.contains('closed')) {
		div.classList.remove('closed');
		document.addEventListener('keydown', handleKeydown);
	} else {
		div.classList.add('closed');
		document.removeEventListener('keydown', handleKeydown);
	}	
}

function handleKeydown(event) {	
	if (event.key === 'Escape') {
		div.classList.add('closed');
		document.removeEventListener('keydown', handleKeydown);			
	}
}