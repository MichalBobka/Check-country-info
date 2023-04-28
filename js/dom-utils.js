
const createInfoElement = (labelName, value) => {
	const infoElement = document.createElement('div');
	const labelElement = document.createElement('strong');
	labelElement.innerText = `${labelName}: `;
	const valueElement = document.createElement('span');
	valueElement.innerText = value;

	infoElement.append(labelElement, valueElement);

	return infoElement;
};

const createFlagImgElement = country => {
	const imgContainerElement = document.createElement('div');
	imgContainerElement.classList.add('img-container');
	const imgElement = document.createElement('img');
	imgElement.src = country.flagUrl;
	imgElement.alt = `${country.name} flag`;
	imgContainerElement.append(imgElement);

	return imgContainerElement;
};

const createCountryItemElement = country => {
	const countryElement = document.createElement('li');
	const anchorElement = document.createElement('a');
	anchorElement.href = `?country=${country.code}`;
	anchorElement.append(createFlagImgElement(country));
	const infoContainerElement = document.createElement('div');
	infoContainerElement.classList.add('info-container');

	const countryNameElement = document.createElement('strong');
	countryNameElement.innerText = country.name;
	countryNameElement.classList.add('country-name');

	infoContainerElement.append(countryNameElement);
	infoContainerElement.append(createInfoElement('Population', country.population));
	infoContainerElement.append(createInfoElement('Region', country.region));
	infoContainerElement.append(createInfoElement('Capital', country.capital));
	anchorElement.append(infoContainerElement);
	countryElement.append(anchorElement);
	return countryElement;
};

const createListElement = countries => {
	const listElement = document.createElement('ul');
	countries.forEach(country => {
		listElement.append(createCountryItemElement(country));
	});
	return listElement;
};

const createDetailElement = country => {
	const detailContainerElement = document.createElement('div');
	const footer = document.querySelector('footer');
	footer.classList.add('footer-detail');
	const FlagImgElement = createFlagImgElement(country);
	const detailContentElement = document.createElement('div');
	detailContainerElement.classList.add('detail-container');
	detailContentElement.classList.add('detail-content');
	const detailNameElement = document.createElement('strong');
	detailNameElement.innerText = country.name;
	detailNameElement.classList.add('detail-name');

	detailContainerElement.append(FlagImgElement);
	detailContentElement.append(detailNameElement);

	const leftColumnElement = document.createElement('div');

	leftColumnElement.append(createInfoElement('Native name', country.nativeName));
	leftColumnElement.append(createInfoElement('Population', country.population));
	leftColumnElement.append(createInfoElement('Region', country.region));
	leftColumnElement.append(createInfoElement('Sub region', country.subregion));
	leftColumnElement.append(createInfoElement('Capital', country.capital));

	const rightColumnElement = document.createElement('div');

	rightColumnElement.append(createInfoElement('Top level domain', country.tld));
	rightColumnElement.append(createInfoElement('Currencies', country.currencies));
	rightColumnElement.append(createInfoElement('Languages', country.languages));

	detailContentElement.append(leftColumnElement, rightColumnElement);

	if (country.borders && country.borders.length > 0) {
		detailContentElement.append(createBorderCountriesContainer(country));
	}
	detailContainerElement.append(detailContentElement);

	return detailContainerElement;
};

const createDetailButton = (text, link) => {
	const anchorElement = document.createElement('a');
	anchorElement.innerText = text;
	anchorElement.classList.add('detail-button');
	anchorElement.href = link;
	return anchorElement;
};

const createBorderCountriesContainer = country => {
	const borderCountriesContainerElement = document.createElement('div');
	borderCountriesContainerElement.classList.add('border-countries-container');
	const labelElement = document.createElement('strong');
	labelElement.innerText = 'Border Countries';

	borderCountriesContainerElement.append(labelElement);

	country.borders.forEach(border => {
		borderCountriesContainerElement.append(createDetailButton(border, `/Check-country-info/?country=${border}`));
	});
	return borderCountriesContainerElement;
};

// body najciemniejszy
// .header-content, #query, select, li all na jasniejszy ciemniejszy
const themeBtn = document.querySelector('#dark');
const enableDarkMode = () => {
	const liItems = document.querySelectorAll('li');
	const headerContent = document.querySelector('.header-content');
	const header = document.querySelector('header');
	const inputBox = document.querySelector('#query');
	const selectBox = document.querySelector('select');
	const h1 = document.querySelector('h1');
	const infoCont = document.querySelectorAll('.info-container');
	const bodyElement = document.querySelector('body');


	themeBtn.classList.add('dark-lighter');
	bodyElement.classList.add('darker');

	liItems.forEach(liItem => {
		liItem.classList.add('dark-lighter');
	});
	infoCont.forEach(info => {
		info.classList.add('dark-lighter');
	});
	header.classList.add('dark-lighter');
	headerContent.classList.add('dark-lighter');
	inputBox.classList.add('dark-lighter');
	selectBox.classList.add('dark-lighter');
	h1.classList.add('dark-lighter');
	localStorage.setItem('darkModeEnabled', true);
};
const enableLightMode = () => {
	const liItems = document.querySelectorAll('li');
	const headerContent = document.querySelector('.header-content');
	const header = document.querySelector('header');
	const inputBox = document.querySelector('#query');
	const selectBox = document.querySelector('select');
	const h1 = document.querySelector('h1');
	const infoCont = document.querySelectorAll('.info-container');
	const bodyElement = document.querySelector('body');
	const detailButton = document.querySelector('.detail-button');

	themeBtn.classList.remove('dark-lighter');
	bodyElement.classList.remove('darker');

	liItems.forEach(liItem => {
		liItem.classList.remove('dark-lighter');
	});
	infoCont.forEach(info => {
		info.classList.remove('dark-lighter');
	});
	header.classList.remove('dark-lighter');
	headerContent.classList.remove('dark-lighter');
	inputBox.classList.remove('dark-lighter');
	selectBox.classList.remove('dark-lighter');
	detailButton.classList.remove('dark-lighter');
	h1.classList.remove('dark-lighter');
	localStorage.setItem('darkModeEnabled', false);
};

const changeTheme = () => {
	if (localStorage.getItem('darkModeEnabled') === 'false' || localStorage.getItem('darkModeEnabled') === null) {
		enableDarkMode();
	} else {
		enableLightMode();
	}
};

themeBtn.addEventListener('click', changeTheme);
export const renderCountriesList = countries => {
	const rootElement = document.querySelector('#main');
	rootElement.innerHTML = '';
	rootElement.append(createListElement(countries));
	if (localStorage.getItem('darkModeEnabled') === 'true') {
		enableDarkMode();
	}
};
export const renderCountryDetails = country => {
	const rootElement = document.querySelector('#main');
	rootElement.innerHTML = '';
	rootElement.append(createDetailButton('← Back', 'javascript:history.back()'));
	rootElement.append(createDetailElement(country));
};
if (localStorage.getItem('darkModeEnabled') === 'true') {
	enableDarkMode();
} else {
	enableLightMode();
}
