export default function deleteInstruction() {
	const instrCnt = document.querySelector('.instruction-container');
	const deleteBtn = instrCnt.querySelector('#btn-understand');

	const anim = instrCnt.animate(
		[
			{ transform: 'scale(1) rotate(0deg)', opacity: 1 },
			{ transform: 'scale(0) rotate(180deg)', opacity: 0 },
		],
		{
			duration: 400,
			iterations: 1,
			easing: 'ease-in-out',
		}
	);

	anim.onfinish = e => {
		instrCnt.remove();
	};
}
