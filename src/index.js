//Basics (global variables)
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
let apiKey = "8e4097ceca08f5b66546b3660bdf4d95";
let units = "metric";

//Change unit

function changeUnitToF(event) {
  event.preventDefault();
  cUnit.classList.replace("active-unit", "inactive-unit");
  fUnit.classList.replace("inactive-unit", "active-unit");
  units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}#`;
  axios.get(apiUrl).then(getWeather);
}
fUnit.addEventListener("click", changeUnitToF);

function changeUnitToC(event) {
  event.preventDefault();
  fUnit.classList.replace("active-unit", "inactive-unit");
  cUnit.classList.replace("inactive-unit", "active-unit");
  units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=haifa&appid=${apiKey}&units=${units}#`;
  axios.get(apiUrl).then(getWeather);
}
cUnit.addEventListener("click", changeUnitToC);

//Get defult city
let defultApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=haifa&appid=${apiKey}&units=${units}#`;
axios.get(defultApiUrl).then(getWeather);

function getWeather(response) {
  let getTemp = Math.round(response.data.main.temp);
  let getCity = response.data.name;
  let getIconCode = response.data.weather[0].icon;
  let getStatus = response.data.weather[0].description;
  let getHumidity = response.data.main.humidity;
  let getWind = response.data.wind.speed;
  let getTempMax = Math.round(response.data.main.temp_max);
  let getTempMin = Math.round(response.data.main.temp_min);

  cityName.innerHTML = getCity;
  mainTemp.innerHTML = getTemp;

  mainIcon.setAttribute("src", `/media/${getIconCode}.svg`);
  sky.innerHTML = getStatus;
  humidity.innerHTML = getHumidity;
  windSpeed.innerHTML = getWind;
  tempMax.innerHTML = getTempMax;
  tempMin.innerHTML = getTempMin;

  mainIcon.setAttribute("alt", getStatus);
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

  function changeUnitToF(event) {
    event.preventDefault();
    cUnit.classList.replace("active-unit", "inactive-unit");
    fUnit.classList.replace("inactive-unit", "active-unit");
    units = "imperial";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(getWeather);
  }
  fUnit.addEventListener("click", changeUnitToF);

  function changeUnitToC(event) {
    event.preventDefault();
    fUnit.classList.replace("active-unit", "inactive-unit");
    cUnit.classList.replace("inactive-unit", "active-unit");
    units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(getWeather);
  }
  cUnit.addEventListener("click", changeUnitToC);
}

let geoLocationButton = document.querySelector("#geoLocation");
geoLocationButton.addEventListener("click", clickButton);

//Get City and Temp from input
function getCity(event) {
  event.preventDefault();
  let city = document.querySelector("#inputCity");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=${units}#`;
  axios.get(apiUrl).then(getWeather);

  function changeUnitToF(event) {
    event.preventDefault();
    cUnit.classList.replace("active-unit", "inactive-unit");
    fUnit.classList.replace("inactive-unit", "active-unit");
    units = "imperial";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=${units}#`;
    axios.get(apiUrl).then(getWeather);
  }
  fUnit.addEventListener("click", changeUnitToF);

  function changeUnitToC(event) {
    event.preventDefault();
    fUnit.classList.replace("active-unit", "inactive-unit");
    cUnit.classList.replace("inactive-unit", "active-unit");
    units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=${units}#`;
    axios.get(apiUrl).then(getWeather);
  }
  cUnit.addEventListener("click", changeUnitToC);
}

let cityForm = document.querySelector("#cityForm");
cityForm.addEventListener("submit", getCity);

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
let h4 = document.querySelector("h4#displyDayTime");
if (hour < 10) {
  hour = `0${hour}`;
}
if (minuts < 10) {
  minuts = `0${minuts}`;
}
h4.innerHTML = `${day} ${hour}:${minuts}`;
