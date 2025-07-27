export default function alertMessage(text) {
	const div = document.createElement('div');
	div.classList.add('error-message');
	div.innerHTML = `
      <div class="wrapper">
        <div class="icon">
          <i class="bx bx-x-circle"></i>
        </div>
        <h4 class="error">Ooooops!</h4>
        <p>Something Went Wrong ...</p>

        <p class="alert-info">${text}</p>

        <button class="again-btn">Try Again</button>
        <button class="close-btn"><i class='bx bx-x'></i></button>

      </div>
    `;
	const close = div.querySelector('.close-btn');
	const again = div.querySelector('.again-btn');

	close.addEventListener('click', () => {
		div.classList.add('closing');

		div.addEventListener(
			'animationend',
			() => {
				div.remove();
			},
			{ once: true }
		);
	});
	again.addEventListener('click', () => {
		div.classList.add('closing');

		div.addEventListener(
			'animationend',
			() => {
				div.remove();
			},
			{ once: true }
		);
	});

	document.body.append(div);
}
