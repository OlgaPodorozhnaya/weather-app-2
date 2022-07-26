function formatDate(currentDate) {
  let now = new Date(currentDate);
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekDays[now.getDay()];
  let hour = now.getHours();
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hour < 10) {
    hour = `0${hour}`;
  }

  return `${day} ${hour}:${minutes}`;
}

let forecastElement = document.querySelector("#forecast");
let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon" ];
days.forEach(function (forecastDay) {
  forecastHTML = forecastHTML +
  `<div class="col-sm">
    <div class="dayOfWeek">${forecastDay}
     </div>

     <div class="card">
       <div class="card-body border border-light">
         <p class="degree day-degree text-dark">${} &#176;C</p>
         <img src="src/image/cloud.png" alt="" class="picture" />
         <p class="degree text-muted">${} &#176;C</p>
       </div>
     </div>
   </div>`;
}
);
 forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;


function showFahrenheitTemp(event) {
  event.preventDefault();
  let elementTemp = document.querySelector("#temperature");
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  elementTemp.innerHTML = Math.round(fahrenheitTemp);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let elementTemp = document.querySelector("#temperature");
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  elementTemp.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;
let fah = document.querySelector("#fahrenheit");
fah.addEventListener("click", showFahrenheitTemp);
let cel = document.querySelector("#celsius");
cel.addEventListener("click", showCelsiusTemp);

// Home work---------------------------------------------------

function changeData(info) {
  console.log(info);

  let inputCity = document.querySelector(".city-change");
  inputCity.innerHTML = info.data.name;

  celsiusTemp = info.data.main.temp;

  let dayAndTime = document.querySelector(".today");
  dayAndTime.innerHTML = formatDate(info.data.dt * 1000);
  let temperature = document.querySelector(".big-degree");
  temperature.innerHTML = Math.round(info.data.main.temp);

  let description = document.querySelector(".description");
  description.innerHTML = `Description: ${info.data.weather[0].description}`;

  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `Humidity: ${info.data.main.humidity} %`;

  let wind = document.querySelector(".wind");
  wind.innerHTML = `Wind: ${info.data.wind.speed} m/c`;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${info.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", info.data.weather[0].description);
}

function search(city) {
  let apiKey = "0c669309e9b69198d164920a0d742074";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(changeData);
}

function definecity(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#input-city");
  search(cityInputElement.value);
}

let form = document.querySelector(".search-form");
form.addEventListener("submit", definecity);

search("New York");

function showData(giveMeCity) {
  console.log(giveMeCity);

  let cityName = document.querySelector(".city-change");
  cityName.innerHTML = giveMeCity.data.name;

  let temperature = document.querySelector(".big-degree");
  temperature.innerHTML = Math.round(giveMeCity.data.main.temp);

  let description = document.querySelector(".description");
  description.innerHTML = `Description: ${giveMeCity.data.weather[0].description}`;

  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `Humidity: ${giveMeCity.data.main.humidity} %`;

  let wind = document.querySelector(".wind");
  wind.innerHTML = `Wind: ${giveMeCity.data.wind.speed} m/c`;
}

function showLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=0c669309e9b69198d164920a0d742074&units=metric`;
  axios.get(url).then(showData);
}

function myLocation() {
  // alert("hello");
  navigator.geolocation.getCurrentPosition(showLocation);
}

let myPosition = document.querySelector(".buttonLoc");
myPosition.addEventListener("click", myLocation);
