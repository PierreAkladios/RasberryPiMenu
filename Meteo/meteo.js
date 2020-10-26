const notificationElement = document.querySelector(".notification");
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
//Variable from App
const weather = {};
weather.temperature ={
    unit : "celcius"
}
const Kelvin = 273;
//App key usage
const Key = "56afb6c45f6f5ecf304ec26c26decf70";

if("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser Doesn't Support Geolocation.</p>"
}
//set User position
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(latitude, longitude);
}

//Show Error if there is an issue
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML =`<p> ${error.message} </p>`
}

//Get weather from API
function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${Key}`;
    
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
            })
            .then(function(data){
                weather.temperature.value = Math.floor(data.main.temp-Kelvin);
                weather.description = data.weather[0].description;
                weather.iconId = data.weather[0].icon;
                weather.city = data.name;
                weather.country = data.sys.country;
            })
            .then(function(){
                displayWeather();
            })
}

//C to F conversion
function celciusToFahrenheit( temperature){
    return (temperature * 9/5)+32;
}

//Show weather to User
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;

    tempElement.innerHTML = `${weather.temperature.value} ° <span>C</span>`;

    descElement.innerHTML = weather.description;

    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

//When the user clicks on the temperature element
tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;

    if(weather.temperature.unit === "celcius"){
        let fahrenheit = celciusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        
        tempElement.innerHTML = `${fahrenheit}° <span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    
    }else{
        tempElement.innerHTML = `${weather.temperature.value}° <span>C</span>`;
        weather.temperature.unit = "celcius";
    }
});

window.addEventListener("keydown", checkKey, false);

function checkKey(key) {
    if (key.keyCode == "66") {
        //retourner au menu
        window.location.href = "../Menu/Menu.html"
    }
}

