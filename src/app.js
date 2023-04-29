function showWetaher(response) {
  console.log(response);
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.temperature.current
  );
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

searchCity("Edinburgh");
