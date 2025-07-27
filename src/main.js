// API
import {
	apiAddTask,
	apiGetTasks,
	apiSearchTasks,
	apiDeleteTask,
	apiEditTask,
} from './JS-MODULES/_api';

// Renderowanie
import {
	renderTaskList,
	renderSingleTask,
	getTaskHTML,
} from './JS-MODULES/_renderTaskElement';
import renderSearchSection from './JS-MODULES/_renderSearchSection';
import renderInstruction from './JS-MODULES/_renderInstruction';

// Utils
import alertMessage from './JS-MODULES/_alertMessage';
import { debounced } from './JS-MODULES/_debounced';

// Style
import './SCSS/style.scss';

// Start and render application
async function startApp() {
	const res = await apiGetTasks();
	renderTaskList(res);
}
renderSearchSection();
renderInstruction();
startApp();

const form = document.querySelector('.form');

// Search Event with debounce function
const tHandler = debounced(500, async e => {
	const tasks = await apiSearchTasks(search.value);
	renderTaskList(tasks);
});

const search = document.querySelector('#todoSearch');
search.addEventListener('input', tHandler);

// Form Submit Event to Add New Task
form.addEventListener('submit', async e => {
	e.preventDefault();

	const title = form.querySelector('#todoTitle').value;
	const date = form.querySelector('#todoDate').value;
	const body = form.querySelector('#todoMessage').value;

	if (title && date && body) {
		try {
			const dataElement = await apiAddTask({ title, date, body });
			renderSingleTask(dataElement);
			form.reset();
		} catch (err) {
			console.error(error);
		}
	} else {
		const text = 'Please fill in all fields and try again.';
		alertMessage(text);
	}
});

// Delegation Events in task Element
document.addEventListener('click', async e => {
	// Delete Task
	const deleteBtn = e.target.closest('.task-delete');
	if (deleteBtn) {
		const task = deleteBtn.closest('.task');
		const id = +task.dataset.id;

		try {
			await apiDeleteTask(id);

			const anim = task.animate(
				[
					{ transform: 'scale(1)', opacity: 1 },
					{ transform: 'scale(0.1)', opacity: 0 },
				],
				{
					duration: 300,
					iterations: 1,
					easing: 'ease-in-out',
				}
			);

			anim.onfinish = () => {
				task.remove();

				const ul = document.querySelector('.task-list');
				const emptyState = document.querySelector('.empty-state');

				if (ul && !ul.querySelector('.task')) {
					emptyState?.classList.remove('hidden');
				}
			};
		} catch (err) {
			console.error('Błąd przy usuwaniu:', err);
		}
	}

	// Edit Task
	const editBtn = e.target.closest('.task-edit');
	if (editBtn) {
		const task = editBtn.closest('.task');
		const id = task.dataset.id;
		const date = task.querySelector('.task-date').innerText;
		const title = task.querySelector('.task-title').innerText;
		const body = task.querySelector('.task-body').innerText;
		const dataElement = {
			id,
			date,
			title,
			body,
		};
		task.innerHTML = getTaskHTML(dataElement, true);
	}

	// Save Task
	const saveBtn = e.target.closest('.task-edit-save');
	if (saveBtn) {
		const task = e.target.closest('.task');
		const id = task.dataset.id;
		const date = task.querySelector('.task-date').value;
		const title = task.querySelector('.task-title').value;
		const body = task.querySelector('.task-body').value;
		const dataElement = {
			id,
			date,
			title,
			body,
		};
		const request = await apiEditTask(dataElement);
		task.innerHTML = getTaskHTML(dataElement, false);
	}

	// Cancel Edit Task
	const cancelBtn = e.target.closest('.task-edit-cancel');
	if (cancelBtn) {
		const task = e.target.closest('.task');
		const id = +task.dataset.id;
		const originalData = await apiGetTasks(); // lub z cache

		const dataElement = originalData.find(task => task.id === id);
		task.innerHTML = getTaskHTML(dataElement, false);
	}
});
