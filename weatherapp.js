let cityInputEl = document.getElementById("cityInput");
let temperatureEl = document.getElementById("temperature");
let humidityEl = document.getElementById("humidity");
let windSpeedEl = document.getElementById("windSpeed");
let rainEl = document.getElementById("rain");
let pressureEl = document.getElementById("pressure");
let sunriseEl = document.getElementById("sunrise");
let sunsetEl = document.getElementById("sunset")
let cityNameEl = document.getElementById("cityName");

let searchButtonEl = document.getElementById("searchButton");

let options={
    method:"GET"
}

searchButtonEl.addEventListener("click",function(){
    let userInput = cityInputEl.value.trim();
    if(userInput===""){
        alert("Please enter a city");
        return;
    }
    let url =`https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=c89347f083038b1dc0a09a80040eb746&units=metric`;
    fetch(url,options)
    .then(function(response){
        return response.json();
    })
    .then(function(fetchedData){
        if (fetchedData.cod !== 200) {
            return;
      }
        let {temp,humidity,pressure} = fetchedData.main;
        let {speed} = fetchedData.wind;
        let {sunrise,sunset}= fetchedData.sys;
        let {all} = fetchedData.clouds;
        
        cityNameEl.textContent=userInput;
        temperatureEl.textContent=temp;
        humidityEl.textContent=humidity+"%";
        windSpeedEl.textContent=speed +"km/h";
        rainEl.textContent=all+"mm";
        pressureEl.textContent=pressure+"hPa";
         sunriseEl.textContent = new Date(sunrise * 1000).toLocaleTimeString();
        sunsetEl.textContent = new Date(sunset * 1000).toLocaleTimeString();
    })
    .catch(function (error) {
      console.log("Error fetching weather data:", error);
      alert("Something went wrong. Please try again later.");
    });
    cityInputEl.value="";
})
