export default function renderSearchSection() {
	const div = document.querySelector('.all');

	const form = document.createElement('form');
	form.classList.add('form');

	form.innerHTML = `
    	<div class="form-row">
					<label for="todoTitle" class="form-label">Title</label>
					<input
						type="text"
						class="form-control"
						id="todoTitle"
						name="todoTitle"
						autocomplete="off"
						/>
				</div>
				<div class="form-row">
					<label class="form-label" for="todoMessage">Information</label>
					<textarea
						class="form-control form-control-textarea"
						name="todoMessage"
						id="todoMessage"></textarea>
				</div>
				<div class="form-row">
					<label for="todoDate" class="form-label">Date</label>
					<input
						type="date"
						class="form-control"
						id="todoDate"
						name="todoDate"
						value="2025-07-25" />
				</div>
				<div class="form-row form-row-last">
					<button type="submit" class="button form-button">Add</button>
				</div>
    `;

	div.append(form);
}
