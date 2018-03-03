const FIRST_PAGE = 1;
const FINAL_PAGE = 40;
const THRESHOLD = 240;

var x = undefined;
var y = undefined;
var SINGLE_PAGES = [0, 3, 4, 6, 7, 8, 9, 10, 11, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 28, 29, 32, 34, 35, 36, 37];
var checksum;

const page_number = () => {
	return window.location.href.split('#')[1];
};

const load_page = (page_number) => {
	document.getElementById('content').classList.add('hid');
	if (!page_number) {
		page_number = 1;
	}
	window.scrollTo(0, 0);
	document.getElementsByTagName('title')[0].innerText = `Faerog Page - ${page_number}`;
	document.getElementById('page').setAttribute('src', `./pages/${page_number}.jpg`);
	if (SINGLE_PAGES.findIndex(e => e == page_number) != -1) {
		document.getElementById('page').classList.add('single');
	} else {
		document.getElementById('page').classList.remove('single');
	}
	window.location.href = `${window.location.href.split('#')[0]}#${page_number}`;
	checksum = page_number;
};

const next_page = () => {
	let n = parseInt(page_number());
	if (n < FINAL_PAGE) {
		load_page(n + 1);
	}
};

const previous_page = () => {
	let n = parseInt(page_number());
	if (n > FIRST_PAGE) {
		load_page(n - 1);
	} else {
		window.location.href = "../../index.html"
	}
};

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
		if (dx < 0) {
			next_page();
		} else {
			previous_page();
		}
	}, false);

	document.getElementById('page').addEventListener('click', () => {
		next_page();
	});

	document.getElementById('page').addEventListener('load', () => {
		document.getElementById('nav-arrows-container').style.width = `${document.getElementById('page').clientWidth}px`;
		document.getElementById('content').classList.remove('hid');
	});

	document.getElementById('forward').addEventListener('click', () => {
		next_page();
	});

	document.getElementById('back').addEventListener('click', () => {
		previous_page();
	});

	load_page(page_number());
};

window.onhashchange = () => {
	let n = page_number();
	if (n != checksum) {
		load_page(n);
	}
};