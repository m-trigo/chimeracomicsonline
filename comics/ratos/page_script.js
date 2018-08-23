const FIRST_PAGE = 1;
const FINAL_PAGE = 15;
const DOUBLE_PAGE_INDEX = 12;

var checksum;

const page_number = () => {
	return window.location.href.split('#')[1];
};

const load_page = (page_number) => {
	document.getElementById('content').classList.add('hid');
	if (!page_number) {
		page_number = 1;
	}

	if (page_number == DOUBLE_PAGE_INDEX) {
		document.getElementById('page').classList.add('double');
	} else {
		document.getElementById('page').classList.remove('double');
	}

	window.scrollTo(0, 0);
	document.getElementsByTagName('title')[0].innerText = `Ratos no Caníl - ${page_number}`;
	document.getElementById('page').setAttribute('src', `./pages/${page_number}.jpg`);
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
	document.getElementById('page').addEventListener('click', () => {
		if (document.body.clientWidth < 1200) {
			next_page();
		}
	});

	document.getElementById('page').addEventListener('load', () => {
		document.getElementById('nav-arrows-container').style.width = `${document.getElementById('page').clientWidth}px`;
		if (page_number() == FINAL_PAGE) {
			document.getElementById('forward').classList.add('hid');
		} else {
			document.getElementById('forward').classList.remove('hid');
		}
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

window.addEventListener('keydown', (e) => {
	if (e.key == 'ArrowRight' || e.key == 'Enter') {
		next_page();
	} else if (e.key == 'ArrowLeft') {
		previous_page();
	}
});