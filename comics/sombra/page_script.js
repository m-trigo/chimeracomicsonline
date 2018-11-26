const FIRST_PAGE = 1;
const FINAL_PAGE = 13;

var checksum;

const page_number = () => {
	return window.location.href.split('#')[1];
};

const load_page = (page_number) => {
	document.getElementById('content').classList.add('hid');
	if (!page_number) {
		page_number = 1;
	}

	document.getElementById('page').setAttribute('src', `./pages/${page_number}.png`);
	document.getElementsByTagName('title')[0].innerText = `À Sombra da Fortaleza - ${page_number}`;
	document.getElementById('page').classList.add('double');

	window.location.href = `${window.location.href.split('#')[0]}#${page_number}`;
	window.scrollTo(0, 0);
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
	document.getElementById('page').addEventListener('load', () => {
		if (page_number() != FINAL_PAGE) {
			document.getElementById('page').classList.add('notlast');
		} else {
			document.getElementById('page').classList.remove('notlast');
		}
		document.getElementById('content').classList.remove('hid');
	});
	document.getElementById('page').addEventListener('click', () => next_page());
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