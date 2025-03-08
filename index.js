const container = document.querySelector('.container');
const search = document.querySelector('.container');
const weatherBox = document.querySelector('.container');
const weatherDetails = document.querySelector('.container');
const error$404 = document.querySelector('.container');

search.addEventListener('click', ()=>{
    
    const APIKey='0c76942348c65bb5043d19aede5660d2';
    const city = document.querySelector('.search-box input').value;

    if(city === "")
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json =>{

        if(json.cod === '404'){
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error$404.style.display = 'block';
            error$404.classList.add('fadeIn');
            return;
        }

        error$404.style.display = 'none';
        error$404.classList.remove('fadeIn');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity =document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        switch(json.weather[0].main){
            case 'Clear':
                image.src = 'images/clear_sky_weather.jpeg';
                break;

            case 'Rain':
                image.src = 'images/rain_weather.png';
                break;
                    
            case 'Cloud':
                image.src = 'images/cloud_weather.png';
                break;

            case 'Snow':
                image.src = 'images/snow_weather.jpeg';
                break;

            case 'Haze':
                image.src = 'images/mist_weather.png';
                break;

            default:
                image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML=`${json.weather[0].description}`;
            humidity.innerHTML= `${json.main.humidity}%`;
            wind.innerHTML=`${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display= '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';

    })


})
