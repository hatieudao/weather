const nofication = document.querySelector('.nofication');
const iconWeather = document.querySelector('.icon-weather');
const description = document.querySelector('.description');
const temperature = document.querySelector('.temperature');
const area = document.querySelector('.place');
const key = '82005d27a116c2880c8f0fcb866998a0';
const weather = {};
    weather.temperature={
        unit: 'celsius'
    }

if ('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(getPosition, showErr);
}else{
    nofication.innerHTML='<p> Trình Duyệt Không Hỗ Trợ Vị Trí </p>';
}
    function getPosition(position){
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        getWeather(latitude, longitude);
    }
    function showErr(error){
        nofication.innerHTML='<p> Không cho biết địa chỉ thì báo làm sao hả my friend</p>';
    }
    function displayWeather(){
        iconWeather.innerHTML = `<img src="icons/${weather.iconWeather}.png" alt = "weather-icon" />`;
        temperature.innerHTML = `<p> ${weather.temperature.value} °C </p> `;
        description.innerHTML = `<p> ${weather.description} </p>`;
        area.innerHTML = `<p> ${weather.place}, ${weather.country} </p> `;
        console.log(`<p> ${weather.description} </p>`);
        console.log(`<img src="icons/${weather.iconWeather}.png" alt = "weather-icon" />`);
    }
    function getWeather(latitude, longitude){
        let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
        fetch(api)
            .then(res => res.json())
            .then(data => {
                weather.temperature.value = Math.floor(data.main.temp - 273);
                weather.iconWeather = data.weather[0].icon;
                weather.description = data.weather[0].description;
                weather.country = data.sys.country;
                weather.place = data.name;
            })
            .then(displayWeather);
    };
    function convertUnit(){
        if(weather.temperature.unit === 'celsius'){
            weather.temperature.value = Math.floor(weather.temperature.value*1.8 + 32);
            weather.temperature.unit = 'F';
            temperature.innerHTML = `<p> ${weather.temperature.value} °F </p> `;
        }else{
            weather.temperature.value = Math.floor((weather.temperature.value-32)/1.8);
            weather.temperature.unit = 'celsius';
            temperature.innerHTML = `<p> ${weather.temperature.value} °C </p> `;
        }
    };
    document.querySelector('.screen').addEventListener('click', convertUnit);