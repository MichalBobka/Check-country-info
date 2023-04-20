export const renderDashboard = () => {
	const API_URL = 'https://restcountries.com/v3.1/all'
	let countries
	let query = ''
	let region = ''

	fetch(API_URL)
		.then(res => res.json())
		.then(countriesRaw => {
			countries = countriesRaw.map(country => {
				return {
					capital: country.capital && country.capital[0],
					population: country.population.toLocaleString(),
					name: country.name.common,
                    code: country.cioc,
					region: country.region,
					flagUrl: country.flags.png,
				}
			})
			renderCountriesList(countries)
		})
	const filteredDataAndRenderedCoutriesList = () => {
		const filteredCountries = countries.filter(country => {
			return country.name.toLowerCase().includes(query) && (!region || country.region === region)
		})
		renderCountriesList(filteredCountries)
	}
	document.querySelector('#query').addEventListener('input', e => {
		query = e.target.value.toLowerCase().trim()
		filteredDataAndRenderedCoutriesList()
	})

	document.querySelector('#region').addEventListener('change', e => {
		region = e.target.value
		filteredDataAndRenderedCoutriesList()
	})
}

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
const renderCountriesList = countries => {
	const rootElement = document.querySelector('#main')
	rootElement.innerHTML = ''
	rootElement.append(createListElement(countries))
}
