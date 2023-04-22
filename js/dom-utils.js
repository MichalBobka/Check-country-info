const createInfoElement = (labelName, value) => {
	const infoElement = document.createElement('div')
	const labelElement = document.createElement('strong')
	labelElement.innerText = `${labelName}: `
	const valueElement = document.createElement('span')
	valueElement.innerText = value

	infoElement.append(labelElement, valueElement)

	return infoElement
}

const createFlagImgElement = country => {
	const imgContainerElement = document.createElement('div')
	const imgElement = document.createElement('img')
	imgElement.src = country.flagUrl
	imgElement.alt = `${country.name} flag`
	imgContainerElement.append(imgElement)

	return imgContainerElement
}

const createCountryItemElement = country => {
	const countryElement = document.createElement('li')
	const anchorElement = document.createElement('a')
	anchorElement.href = `?country=${country.code}`
	anchorElement.append(createFlagImgElement(country))
	const infoContainerElement = document.createElement('div')
	infoContainerElement.classList.add('info-container')

	const countryNameElement = document.createElement('strong')
	countryNameElement.innerText = country.name
	countryNameElement.classList.add('country-name')

	infoContainerElement.append(countryNameElement)
	infoContainerElement.append(createInfoElement('Population', country.population))
	infoContainerElement.append(createInfoElement('Region', country.region))
	infoContainerElement.append(createInfoElement('Capital', country.capital))
	anchorElement.append(infoContainerElement)
	countryElement.append(anchorElement)
	return countryElement
}

const createListElement = countries => {
	const listElement = document.createElement('ul')
	countries.forEach(country => {
		listElement.append(createCountryItemElement(country))
	})
	return listElement
}

const createDetailElement = country => {
	const detailContainerElement = document.createElement('div')
	const FlagImgElement = createFlagImgElement(country)
	const detailContentElement = document.createElement('div')
	detailContainerElement.classList.add('detail-container')
	detailContentElement.classList.add('detail-content')
	const detailNameElement = document.createElement('strong')
	detailNameElement.innerText = country.name
	detailNameElement.classList.add('detail-name')

	detailContainerElement.append(FlagImgElement)
	detailContentElement.append(detailNameElement)

	const leftColumnElement = document.createElement('div')

	leftColumnElement.append(createInfoElement('Native name', country.nativeName))
	leftColumnElement.append(createInfoElement('Population', country.population))
	leftColumnElement.append(createInfoElement('Region', country.region))
	leftColumnElement.append(createInfoElement('Sub region', country.subregion))
	leftColumnElement.append(createInfoElement('Capital', country.capital))

	const rightColumnElement = document.createElement('div')

	rightColumnElement.append(createInfoElement('Top level domain', country.tld))
	rightColumnElement.append(createInfoElement('Currencies', country.currencies))
	rightColumnElement.append(createInfoElement('Languages', country.languages))

	detailContentElement.append(leftColumnElement, rightColumnElement)

	if (country.borders && country.borders.length > 0) {
		detailContentElement.append(createBorderCountriesContainer(country))
	}
	detailContainerElement.append(detailContentElement)

	return detailContainerElement
}

const createDetailButton = (text, link) => {
	const anchorElement = document.createElement('a')
	anchorElement.innerText = text
	anchorElement.classList.add('detail-button')
	anchorElement.href = link
	return anchorElement
}

const createBorderCountriesContainer = country => {
	const borderCountriesContainerElement = document.createElement('div')
    borderCountriesContainerElement.classList.add('border-countries-container')
	const labelElement = document.createElement('strong')
	labelElement.innerText = 'Border Countries'

	borderCountriesContainerElement.append(labelElement)

	country.borders.forEach(border => {
		borderCountriesContainerElement.append(createDetailButton(border, `/?country=${border}`))
	})
	return borderCountriesContainerElement
}

export const renderCountriesList = countries => {
	const rootElement = document.querySelector('#main')
	rootElement.innerHTML = ''
	rootElement.append(createListElement(countries))
}
export const renderCountryDetails = country => {
	const rootElement = document.querySelector('#main')
	rootElement.innerHTML = ''
	rootElement.append(createDetailButton('Go back', '/'))
	rootElement.append(createDetailElement(country))
}
