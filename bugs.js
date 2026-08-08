const bugs = document.querySelectorAll(`[id^="bug-"`);

for (const bug of bugs) {
	bug.addEventListener('click', () => {
		bug.toggleAttribute('hidden');
		startSpawnBugTimer();
	});
}

const spawnBug = () => {
	const bug = document.querySelector(`#bug-${Math.floor(Math.random() * 7)}`);
	bug.removeAttribute('hidden');
};

const startSpawnBugTimer = () => window.setTimeout(spawnBug, Math.floor(Math.random() * 5000));

addEventListener('DOMContentLoaded', (event) => {
	startSpawnBugTimer();
})
