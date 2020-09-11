//Basics (global variables)
let apiKey = "8e4097ceca08f5b66546b3660bdf4d95";
let units = `metric`;
let cityName = document.querySelector("h2#cityName");
let mainIcon = document.querySelector("#mainIcon");
let mainTemp = document.querySelector("#mainTemp");
let weatherImg = document.querySelector("#weatherImg");
let sky = document.querySelector("h3");
let humidity = document.querySelector("#humidity");
let windSpeed = document.querySelector("#wind");
let tempMax = document.querySelector("#highTemp");
let tempMin = document.querySelector("#lowTemp");
let cUnit = document.querySelector("#cUnit");
let fUnit = document.querySelector("#fUnit");
let forecastDay = document.querySelector("#forecastDay");
let forecastIcon = document.querySelector("#forecastIcon");
let forecastTemp = document.querySelector("#forecastTemp");
let cTemp = null;
let cTempMax = null;
let cTempMin = null;

//Get defult city

let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=haifa&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(getWeather);

apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=minuly,hourly&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(getForecast);

function getForecast(response) {
  /*
  let forecastDay = ;*/
  let getIcon = response.data.daily[0].weather[0].icon;
  forecastIcon.setAttribute("src", `/media/${getIcon}.svg`);
  forecastTemp.innerHTML = Math.round(response.data.daily[0].temp.day);
  //console.log(response.data);
}

function getWeather(response) {
  cTemp = response.data.main.temp;
  cTempMax = response.data.main.temp_max;
  cTempMin = response.data.main.temp_min;
  let getTemp = Math.round(cTemp);
  let getTempMax = Math.round(cTempMax);
  let getTempMin = Math.round(cTempMin);
  let getCity = response.data.name;
  let getIconCode = response.data.weather[0].icon;
  let getStatus = response.data.weather[0].description;
  let getHumidity = response.data.main.humidity;
  let getWind = Math.round(response.data.wind.speed);

  cityName.innerHTML = getCity;
  mainTemp.innerHTML = getTemp;
  mainIcon.setAttribute("src", `/media/${getIconCode}.svg`);
  mainIcon.setAttribute("alt", getStatus);
  sky.innerHTML = getStatus;
  humidity.innerHTML = getHumidity;
  windSpeed.innerHTML = getWind;
  tempMax.innerHTML = getTempMax;
  tempMin.innerHTML = getTempMin;
}

//Get tempeture from Geo-Location
function clickButton() {
  navigator.geolocation.getCurrentPosition(getPosition);
}

function getPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(getWeather);

  fUnit.classList.replace("active-unit", "inactive-unit");
  cUnit.classList.replace("inactive-unit", "active-unit");
}

let geoLocationButton = document.querySelector("#geoLocation");
geoLocationButton.addEventListener("click", clickButton);

//Get City and Temp from input
function getCity(event) {
  event.preventDefault();
  let city = document.querySelector("#inputCity");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(getWeather);

  fUnit.classList.replace("active-unit", "inactive-unit");
  cUnit.classList.replace("inactive-unit", "active-unit");
}

let cityForm = document.querySelector("#cityForm");
cityForm.addEventListener("submit", getCity);

//Change unit

function changeUnitToF(event) {
  event.preventDefault();
  let fTempMain = (cTemp * 9) / 5 + 32;
  mainTemp.innerHTML = Math.round(fTempMain);

  let fTempMax = (cTempMax * 9) / 5 + 32;
  tempMax.innerHTML = Math.round(fTempMax);

  let fTempMin = (cTempMin * 9) / 5 + 32;
  tempMin.innerHTML = Math.round(fTempMin);

  cUnit.classList.replace("active-unit", "inactive-unit");
  fUnit.classList.replace("inactive-unit", "active-unit");
}
fUnit.addEventListener("click", changeUnitToF);

function changeUnitToC(event) {
  event.preventDefault();
  mainTemp.innerHTML = Math.round(cTemp);
  tempMax.innerHTML = Math.round(cTempMax);
  tempMin.innerHTML = Math.round(cTempMin);

  fUnit.classList.replace("active-unit", "inactive-unit");
  cUnit.classList.replace("inactive-unit", "active-unit");
}
cUnit.addEventListener("click", changeUnitToC);

//Present day and time
let now = new Date();
let date = now.getDate();
let minuts = now.getMinutes();
let hour = now.getHours();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];

let year = now.getFullYear();

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let fullMonth = months[now.getMonth()];

if (hour < 10) {
  hour = `0${hour}`;
}
if (minuts < 10) {
  minuts = `0${minuts}`;
}
let h4 = document.querySelector("h4#displyDayTime");
h4.innerHTML = `${day} ${hour}:${minuts}`;

let shortDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let today = new Date();
for (let i = 0; i < 5; i++) {
  let nextDay = shortDays[(today.getDay() + 1) % 7];
  forecastDay.innerHTML = nextDay;
}

console.log(today);
