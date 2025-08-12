const apiUrl = 'http://localhost:3000/tasks';
import alertMessage from './_alertMessage';

// Get Tasks from JSON server
export async function apiGetTasks() {
	const request = await fetch(apiUrl);

	if (request.ok) {
		const data = await request.json();
		return data;
	} else {
		alertMessage('Error');
		throw Error(`Coś poszło nie tak. Kod błedu: ${request.status} `);
	}
}

// Add task to JSON server
export async function apiAddTask({ title, date, body }) {
	const request = await fetch(apiUrl, {
		method: 'post',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({ title, date, body }),
	});

	if (request.ok) {
		return request.json();
	} else {
		alertMessage('Error');
		throw Error(request.status);
	}
}

// Remove task from JSON server
export async function apiDeleteTask(id) {
	const request = await fetch(apiUrl + '/' + id, {
		method: 'delete',
	});
	if (request.ok) {
		return request.json();
	} else {
		alertMessage('Error');
		throw Error(request.status);
	}
}

// Search tasks in JSON server
export async function apiSearchTasks(query) {
	const request = await fetch(apiUrl + `?q=${query}`);
	if (request.ok) {
		return request.json();
	} else {
		alertMessage('Error');
		throw Error(request.status);
	}
}

// Change task in JSON server
export async function apiEditTask({ id, title, date, body }) {
	const request = await fetch(apiUrl + '/' + id, {
		method: 'put',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ title, date, body }),
	});

	if (request.ok) {
		return request.json();
	} else {
		alertMessage('Error');
		throw Error(request.status);
	}
}
