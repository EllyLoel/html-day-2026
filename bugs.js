// const bugs = document.querySelectorAll(`[id^="bug-"`);

// for (const bug of bugs) {
// 	bug.addEventListener('click', () => {
// 		// bug.toggleAttribute('hidden');
// 		startSpawnBugTimer();
// 	});
// }

// const spawnBug = () => {
// 	const bug = document.querySelector(`#bug-${Math.floor(Math.random() * 7)}`);
// 	bug.removeAttribute('hidden');
// 	createBug();
// };

const startSpawnBugTimer = () => window.setTimeout(createBug, Math.floor(Math.random() * 5000));

// addEventListener('DOMContentLoaded', (event) => {
// 	startSpawnBugTimer();
// })

const bugImages = [
	"bugs/bug1.png",
	"bugs/bug2.png",
	"bugs/bug3.png",
	"bugs/bug4.png",
	"bugs/bug5.png",
	"bugs/bug6.png",
	"bugs/bug7.png",
]

function createBug() {
	console.log("created bug")
	let bugTargetX = 0;
	let bugTargetY = 0;
	let bugTargetFound = true;
	let bugNewLeft = 0;
	let bugNewTop = 0;
	const bugTopMin = 0;
	const bugTopMax = 100;
	const bugLeftMin = 10;
	const bugLeftMax = 100;
	const bugSizeMin = 10;
	const bugSizeMax = 100;
	const pauseMin = 200;
	const pauseMax = 6000;
	let pauseTimer = 1;

	const bug = document.createElement("button");
	const bugImgElement = document.createElement("img")
	bugImgElement.setAttribute("width", 50)
	bugImgElement.setAttribute("height", 50)
	const bugNumber = Math.floor(Math.random() * bugImages.length)
	bugImgElement.src = bugImages[bugNumber];
	bugImgElement.alt = "bug " + (bugNumber+1)
	bug.id = "bug-" + (bugNumber+1)
	
	const bugTop = Math.floor(Math.random() * bugTopMax) + bugTopMin;
	const bugLeft = Math.floor(Math.random() * bugLeftMax) + bugLeftMin;
	const bugSize = Math.floor(Math.random() * bugSizeMax) + bugSizeMin;

	bug.addEventListener('click', () => {
		bug.remove()
		startSpawnBugTimer();
	});

	const bugMoveSpeedMax = 1
	const bugMoveSpeedAcceleration = 0.0005;
	let bugMoveSpeedCurrent = 0;
	bug.style = `
		top:${bugTop}%;
		left:${bugLeft}%;
		position:absolute;
	`;
	bug.title = "bug";
	bug.appendChild(bugImgElement)
	document.getElementsByClassName("bugs")[0].appendChild(bug);
	moveBug(bug);

	function moveBug(bug) {
		if(bugMoveSpeedCurrent < bugMoveSpeedMax) bugMoveSpeedCurrent += bugMoveSpeedAcceleration;
		if(bugTargetFound) newBugTarget();
		bugNewLeft = Number(bug.style.left.slice(0, -1))
		bugNewTop = Number(bug.style.top.slice(0, -1))
		if(!bugTargetFound) {
			if(bugNewLeft < bugTargetX) {
				bugNewLeft = bugNewLeft + bugMoveSpeedCurrent;
			}
			if(bugNewLeft > bugTargetX) {
				bugNewLeft = bugNewLeft - bugMoveSpeedCurrent;
			}
			if(bugNewTop < bugTargetY) {
				bugNewTop = bugNewTop + bugMoveSpeedCurrent;
			}
			if(bugNewTop > bugTargetY) {
				bugNewTop = bugNewTop - bugMoveSpeedCurrent;
			}
			if(approximatelyEqual(bugNewLeft, bugTargetX, 4) && approximatelyEqual(bugNewTop, bugTargetY, 4)){
				bugTargetFound = true;
				pauseTimer = Math.floor(Math.random() * (pauseMax - pauseMin + 1) + pauseMin);
			}
			Object.assign(bug.style, {
				left: bugNewLeft + "%",
				top: bugNewTop + "%",
			});
			setTimeout(function() { 
				moveBug(bug);
			}, pauseTimer);
		}
	}

	function newBugTarget() {
		console.log("new target")
		bugTargetX = Math.floor(Math.random() * bugLeftMax) + bugLeftMin;
		bugTargetY = Math.floor(Math.random() * bugTopMax) + bugTopMin;
		console.log(calculateAngle(Number(bug.style.left.slice(0, -2)), Number(bug.style.top.slice(0, -2)), bugTargetX, bugTargetY))
		bug.style.rotate = -calculateAngle(Number(bug.style.left.slice(0, -2)), Number(bug.style.top.slice(0, -2)), bugTargetX, bugTargetY) + "deg";
		bugMoveSpeedCurrent = 0;
		bugTargetFound = false;
		pauseTimer = 1;
	}

	function approximatelyEqual (num1, num2, tolerance) {
		return Math.abs(num1 - num2) < tolerance;
	}

	function calculateAngle(x1, y1, x2, y2) {
		// Calculate the differences in the coordinates
		const deltaY = y2 - y1;
		const deltaX = x2 - x1;
	
		// Calculate the angle in radians and convert to degrees
		const radians = Math.atan2(deltaY, deltaX);
		const degrees = radians * (180 / Math.PI);
	
		// Normalize the angle to the range [0, 360)
		return (degrees + 360) % 360;
	}
}

createBug();