const cityForm = document.querySelector('.change-location');

const card = document.querySelector('.card');
const details = document.querySelector('.details');

const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const forecast = new Forecast(key);

const updateUI = (data) => {

    const { cityDetails, weather } = data;

    details.innerHTML = `
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="my-4 display-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    //update the day/night & icon images
    let timeImgSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeImgSrc);

    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);
};


cityForm.addEventListener('submit', e => {
    e.preventDefault();

    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update the ui with the city
    forecast.updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

    //remove d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

    localStorage.setItem('city', city);
});

//local storage
if(localStorage.getItem('city')){
    forecast.updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
};


const quickSearch = document.querySelector('.quickSearch ul');

quickSearch.addEventListener('click', (e) => {
    if(e.target.tagName === 'LI'){
        const city = e.target.innerText;
        console.log(city);
        forecast.updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
        if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
        }
    }
});

const addCity = document.querySelector('.footer');

addCity.addEventListener('submit', e => {
    e.preventDefault();
    const city = addCity.inputCity.value.trim();
    addCity.reset();

    const html = `<li>${city}</li>`;
    quickSearch.innerHTML += html;
})