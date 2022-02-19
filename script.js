const getWeatherDetails = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchText}&units=metric&appid=e80034e1706c4a1fcb5fd80e8350c6cc`;

    if (searchText == '') {
        alert('Type Something!');
    }
    else {
        fetch(url)
            .then((res) => {
                if (!res.ok) {
                    alert('No result found!');
                    throw new Error('No result found!');
                }
                return res.json();
            })
            .then((data) => showWeatherResult(data));
    }
};

document.getElementById('search-btn').addEventListener('click', function () {
    getWeatherDetails();
});

const showWeatherResult = details => {
    const searchResult = document.getElementById('weather-status');
    searchResult.textContent = '';
    const { main, icon } = details.weather[0];
    const div = document.createElement('div');

    div.innerHTML = `
        <div class="d-flex mx-auto col-md-5">
            <div class="d-flex flex-column align-items-start mb-0">
                <h4 class="n-mb-8">${details.name}</h4>
            </div>
        </div>
        <hr>
        <div class="d-flex justify-content-center ms-0 pe-1">
            <div class="d-flex align-items-center col-md-2 n-ms-20">
                <img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">
                <h3 class="my-2">${main}</h3>
            </div>
            <div class="d-flex flex-column align-items-end col-md-3">
                <h1 class="mb-0"><span>${details.main.temp}</span>&deg;C</h1>
                <h4 class="mb-0"><i class="fas fa-wind" style = "font-size:22px;"></i> &nbsp;<span>${details.wind.speed}</span>
                </h4>
            </div>
        </div>
        `;
    searchResult.appendChild(div);
}