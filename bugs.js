const bugs = document.querySelectorAll(`[id^="bug-"`);

for (const bug of bugs) {
	bug.addEventListener('click', () => {
		bug.toggleAttribute('hidden');
	});
}

window.setTimeout(() => {
	const bug = document.querySelector(`#bug-${Math.floor(Math.random() * 7)}`);
	bug.removeAttribute('hidden');
}, Math.floor(Math.random() * 5000));
