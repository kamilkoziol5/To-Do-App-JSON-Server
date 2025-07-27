import { apiDeleteTask } from './_api';

const ul = document.querySelector('.task-list');

export function getTaskHTML(dataElement, editMode = false) {
	let html = '';
	if (editMode) {
		html = document.querySelector('#taskEditTemplate').innerHTML;
	} else {
		html = document.querySelector('#taskTemplate').innerHTML;
	}
	html = html.replaceAll('{{date}}', dataElement.date);
	html = html.replaceAll('{{title}}', dataElement.title);
	html = html.replaceAll('{{body}}', dataElement.body);
	return html;
}

export function renderSingleTask(dataElement, editMode) {
	const element = document.createElement('article');
	element.classList.add('task');
	element.dataset.id = dataElement.id;

	element.innerHTML = getTaskHTML(dataElement, editMode);

	ul.prepend(element); // najpierw dodaj do DOM

	const anim = element.animate(
		[
			{ transform: 'scale(0)', opacity: 0 },
			{ transform: 'scale(1)', opacity: 1 },
		],
		{
			duration: 400,
			iterations: 1,
			easing: 'ease-in-out',
		}
	);

	const emptyState = document.querySelector('.empty-state');

	if (!ul.querySelector('.task')) {
		emptyState.classList.remove('hidden');
	} else {
		emptyState.classList.add('hidden');
	}
}

export function renderTaskList(tasks) {
	const emptyState = document.querySelector('.empty-state');

	ul.innerHTML = '';
	if (tasks.length === 0) {
		emptyState.classList.remove('hidden');
	} else {
		emptyState.classList.add('hidden');
	}

	tasks.forEach(dataElement => {
		renderSingleTask(dataElement, false);
	});
}
