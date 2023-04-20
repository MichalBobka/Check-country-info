export const renderDetail = () => {
	const searchParams = new URLSearchParams(window.location.search)
	const countryCode = searchParams.get('country')
	if (!countryCode) {
		goBackToDashboard()
	}
	const API_URL_DETAIL = `https://restcountries.com/v3.1/alpha/${countryCode}`
	fetch(API_URL_DETAIL)
		.then(res => res.json())
		.then((res) =>{
            if (!res || res.length === 0){
        goBackToDashboard()}}
        )}

const goBackToDashboard = () => {
	window.location.href = '/'
}
