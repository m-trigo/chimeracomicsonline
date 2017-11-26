var x = undefined;
var y = undefined;
const THRESHOLD = 50;
window.onload = () => {
	var content = document.getElementById('content');
	content.addEventListener('touchstart', (e) => {
		x = e.touches[0].clientX;
		y = e.touches[0].clientY;
	}, false);
	content.addEventListener('touchend', (e) => {
		return;
		let dx = e.changedTouches[0].clientX - x;
		let dy = e.changedTouches[0].clientY - y;
		if (dy > dx) return;
		if (dx < THRESHOLD) { document.getElementById('fwd').click();}
		else if (dx > THRESHOLD) { document.getElementById('back').click(); }
	}, false); 
}