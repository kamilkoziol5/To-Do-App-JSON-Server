import { apiDeleteTask } from './_api';

const ul = document.querySelector('.task-list');

export function getTaskHTML(dataElement, editMode = false) {
	const { date, title, body } = dataElement;

	if (editMode) {
		return `
            <div class="task-inside">
                <div class="task-header">
                    <label>
                        <span>Podaj datę</span>
                        <input type="date" class="task-date" value="${date}">
                    </label>

                    <div class="task-actions">
                        <button class="task-delete" title="Usuń zadanie">
                            <i class='bx  bx-trash'  ></i> 
                        </button>
                    </div>
                </div>

                <div class="row">
                    <label>
                        <span>Tytuł</span>
                        <input type="text" class="task-title" value="${title}">
                    </label>
                </div>

                <div class="row">
                    <label>
                        <span>Treść</span>
                        <textarea class="task-body">${body}</textarea>
                    </label>
                </div>

                <div class="task-footer">
                    <button class="button task-edit-save">Zapisz</button>
                    <button class="button task-edit-cancel button-secondary">Anuluj</button>
                </div>
            </div>
        `;
	} else {
		return `
            <div class="task-inside">
                <div class="task-header">
                    <h3 class="task-date">${date}</h3>

                    <div class="task-actions">
                        <button class="task-edit" title="Edytuj zadanie">
                            <i class='bx  bx-edit'  ></i> 
                        </button>
                        <button class="task-delete" title="Usuń zadanie">
                            <i class='bx  bx-trash'  ></i> 
                        </button>
                    </div>
                </div>

                <div class="row">
                    <div class="task-title">${title}</div>
                </div>

                <div class="row">
                    <div class="task-body">
                        ${body}
                    </div>
                </div>
            </div>
        `;
	}
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
