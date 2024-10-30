const apiKey = "f74d5471a8d55c9e3ecea11e2693634f"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="

const searchBar = document.querySelector(".search-btn input")
const searchBtn = document.querySelector(".search-btn button")
const weatherIcon = document.querySelector(".weather-icon")
async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error-msg").style.display = "block"
        // document.querySelector(".weather").style.display = "none";
    }
    else {

        let data = await response.json();

        console.log(data)

        let tempCelsius = Math.round(data.main.temp);
        let tempFahrenheit = Math.round(tempCelsius * 9 / 5 + 32);

        document.querySelector(".city").innerHTML = `${data.name}, ${data.sys.country}`
        document.querySelector(".temperature").innerHTML = `${tempCelsius}°C / ${tempFahrenheit}°F`
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%"
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h"

        if (data.weather[0].main == "clouds") {
            weatherIcon.src = "images/clouds.png"
        }
        else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png"
        }
        else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png"
        }
        else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png"
        }
        else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png"
        }
        
        document.querySelector(".error-msg").style.display = "none"; 
        document.querySelector(".weather").style.display = "block";
    }
}
searchBtn.addEventListener("click", () => {
    checkWeather(searchBar.value)
})

searchBar.addEventListener('keydown', (event) =>{
    if(event.key === 'Enter'){
        checkWeather(searchBar.value)
    }
})