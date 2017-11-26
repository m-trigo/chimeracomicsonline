var x = undefined;
window.onload = () => {
	var content = document.getElementById('content');
	content.addEventListener('touchstart', (e) => {x = e.touches[0].clientX;}, false);
	content.addEventListener('touchend', (e) => {
		let ex = e.changedTouches[0].clientX; 
		if (ex < x) { document.getElementById('fwd').click();}
		else { document.getElementById('back').click(); }
	}, false); 
}