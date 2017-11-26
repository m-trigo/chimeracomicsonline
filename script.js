var x = undefined;
var y = undefined;
const THRESHOLD = 100;
window.onload = () => {
	var content = document.getElementById('content');
	content.addEventListener('touchstart', (e) => {
		x = e.touches[0].clientX;
		y = e.touches[0].clientY;
	}, false);
	content.addEventListener('touchend', (e) => {
		let dx = e.changedTouches[0].clientX - x;
		let dy = e.changedTouches[0].clientY - y;
		let adx = Math.abs(dx);
		let ady = Math.abs(dy);
		if (ady > adx || adx < THRESHOLD) return;
		if (dx < 0) { document.getElementById('fwd').click();}
		else { document.getElementById('back').click(); }
	}, false); 
}