let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

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

let now = new Date();

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let date = days[now.getDay()];
let month = months[now.getMonth()];
let year = now.getFullYear();

let currentDate = document.querySelector("#date");
currentDate.innerHTML = `${date}, ${month} ${year} ${hours}:${minutes}`;

function showWetaher(response) {
  console.log(response);

  celsiusTemp = response.data.temperature.current;
  document.querySelector("#temperature").innerHTML = Math.round(celsiusTemp);

  document.querySelector("#city").innerHTML = response.data.city;

  document.querySelector("#description").innerHTML =
    response.data.condition.description;

  document.querySelector("#feelsLike").innerHTML = Math.round(
    response.data.temperature.feels_like
  );
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#city").innerHTML = response.data.city;

  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.condition.description);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheit = (celsiusTemp * 9) / 5 + 32;
  let mainTemperature = document.querySelector("#temperature");
  celsiusTemperature.classList.remove("active");
  fahrenheitTemp.classList.add("active");
  mainTemperature.innerHTML = Math.round(fahrenheit);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let mainTemperature = document.querySelector("#temperature");
  celsiusTemperature.classList.add("active");
  fahrenheitTemp.classList.remove("active");
  mainTemperature.innerHTML = Math.round(celsiusTemp);
}

function handleSumit(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city-input");
  searchCity(cityElement.value);
}

function searchCity(city) {
  let apiKey = "o36b6dafeb6ef56f34fa0t0eceebce4e";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(showWetaher);
}

function showLocation(position) {
  let apiKey = "o36b6dafeb6ef56f34fa0t0eceebce4e";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${position.coords.latitude}&lon=${position.coords.latitude}&key=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(showWetaher);
}

let celsiusTemp = null;

let celsiusTemperature = document.querySelector("#celsius-temp");
celsiusTemperature.addEventListener("click", showCelsiusTemp);

let fahrenheitTemp = document.querySelector("#fahrenheit-temp");
fahrenheitTemp.addEventListener("click", showFahrenheitTemp);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSumit);

searchCity("Edinburgh");
