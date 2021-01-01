function testWebP(callback) {

	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

	if (support == true) {
		document.querySelector('body').classList.add('webp');
	}
});

const modalLinks = document.querySelectorAll('.modal-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding'); // for fixed objects

const timeout = 800;

let unlock = true;

if (modalLinks.length > 0) {
	for (let index = 0; index < modalLinks.length; index++) {
		const modalLink = modalLinks[index];
		modalLink.addEventListener('click', function (e) {
			const modalName = modalLink.getAttribute('href').replace('#', '');
			const currentModal = document.getElementById(modalName);
			modalOpen(currentModal);
			e.preventDefault();
		});
	}
}

const modalCloseIcon = document.querySelectorAll('.modal-close');
if (modalCloseIcon.length > 0) {
	for (let index = 0; index < modalCloseIcon.length; index++) {
		const el = modalCloseIcon[index];
		el.addEventListener('click', function (e) {
			modalClose(el.closest('.modal'));
			e.preventDefault();
		});
	}
}

function modalOpen(currentModal) {
	if (currentModal && unlock) {
		const modalActive = document.querySelector('.modal.open');
		if (modalActive) {
			modalClose(modalActive, false);
		} else {
			bodyLock();
		}
		currentModal.classList.add('open');
		currentModal.addEventListener('click', function (e) {
			if (!e.target.closest('.modal__wrapper')) {
				modalClose(e.target.closest('.modal'));
			}
		});
	}
}

function modalClose(modalActive, doUnlock = true) {
	if (unlock) {
		modalActive.classList.remove('open');
		if (doUnlock) {
			bodyUnLock();
		}
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if (lockPadding.length > 0) {
		for (let index = 0; lockPadding.length < 0; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}

	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unLock = false;

	setTimeout(function () {
		unlock = true;
	}, timeout)
}

function bodyUnLock() {
	setTimeout(function () {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = '0px';
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

}

document.addEventListener('keydown', function (e) {
	if (e.which === 27) {
		const modalActive = document.querySelector('.modal.open');
		modalClose(modalActive);
	}
});

function insertData() {

	var insertData = "";

	for (i = 0; i < data.length; i++) {

		//console.log(data[i].link);

		insertData += `
		<li class="main__wrapper-item">
				<div>
					<a class="link" href="${data[i].tagLink}">
					${data[i].tagName}
					
					<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 283.922 283.922">
						<path d="M266.422,0h-97.625c-9.65,0-17.5,7.851-17.5,17.5c0,9.649,7.85,
						17.5,17.5,17.5h55.377l-92.375,92.374 c-3.307,3.305-5.127,7.699-5.127,12.375c0,
						4.676,1.819,9.069,5.125,12.371c3.306,3.309,7.699,5.13,12.375,5.13 c4.674,0,
						9.069-1.82,12.376-5.127l92.374-92.375v55.377c0,9.649,7.851,17.5,17.5,17.5c9.649,
						0,17.5-7.851,17.5-17.5V17.5 C283.922,7.851,276.071,0,266.422,0z"/> 
						<path d="M201.137,253.922H30V82.785h128.711l30-30H15c-8.284,0-15,6.716-15,15v201.137c0,
						8.284,6.716,15,15,15h201.137 	c8.284,0,15-6.716,15-15V95.211l-30,30V253.922z"/>
					</svg>

					</a>
				</div>
				<small>(${data[i].tagTotal})</small>
			</li>`
	}

	$('.main__wrapper-list').html(insertData);
}


function insertCardData() {

	var insertCardData = "";

	for (i = 0; i < cardData.length; i++) {

		//console.log(data[i].link);

		insertCardData += `
		<li class="card">
			<div class="title-wrapper">
				<h2>
					<a href="${cardData[i].storyLink}">${cardData[i].storyTitle}</a>
				</h2>
			</div>

			<div class="card-reactions"></div>
			<div class="image-wrapper">
				<a href="${cardData[i].storyLink}">
					<img alt="" src="${cardData[i].storyImage}" width="379"
						height="200" loading="lazy"></a>
				<div class="tag">
					<a href="/tagged/${cardData[i].tag}" class="tag-link">#${cardData[i].tag}</a>
				</div>
			</div>

			<div class="meta">
				<div class="profile">
					<a href="${cardData[i].authorLink}">
						<img src="${cardData[i].authorImage}"
							alt="Author profile picture" width="50" height="50" loading="lazy">
					</a>
					<div>
						<h3>
							<a class="link" href="${cardData[i].authorLink}" class="">@${cardData[i].authorNickname}</a>
							<small>${cardData[i].authorName}</small>
						</h3>
					</div>
				</div>
				<div class="time">
					<div>${cardData[i].time}</div>
					<div class="date">${cardData[i].date}</div>
				</div>
			</div>
		</li>`
	}

	$('.main__wrapper-list').html(insertCardData);
}


jQuery(function ($) {
	$(document).ready(function () {


		$('.burger').on('click', function (e) {
			e.preventDefault();
			$('.burger').toggleClass('burger-active');
			$('.nav-header').toggleClass('nav-header__active');
		});


		$('.header__theme').on('click', function (e) {
			e.preventDefault();
			$('body').toggleClass('dark');
		});

		if (typeof data !== 'undefined' && data) {

			insertData();

		}

		if (typeof cardData !== 'undefined' && cardData) {

			insertCardData();

		}

		$('title').html(titlePage);





	});

});