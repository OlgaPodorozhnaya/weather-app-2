let now = new Date();
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

let dayAndTime = document.querySelector(".today");

let hour = now.getHours();
let minutes = now.getMinutes();

dayAndTime.innerHTML = `${day} ${hour}:${minutes}`;

// let fahrenheit;
// let celsius;
// function changeCel() {
//   let degree = document.querySelector(".big-degree");
//    console.log(degree);
//   let newDegree = Math.round(((22 * 9) / 5) + 32);
//   degree.innerHTML = newDegree;
// }
// function changeFah() {
//   let degree = document.querySelector(".big-degree");
//   let newDegree = Math.round((71.6 - 32) * (5/9));
//   degree.innerHTML = newDegree;
// }

// let fah = document.querySelector("#fahrenheit");
// fah.addEventListener("click", changeCel);
// let cel = document.querySelector("#celsius");
// cel.addEventListener("click", changeFah);

// Home work---------------------------------------------------

function changeData(info) {
  console.log(info);
  console.log(info.data.weather[0].description);
  let temperature = document.querySelector(".big-degree");
  temperature.innerHTML = Math.round(info.data.main.temp);

  let description = document.querySelector(".description");
  description.innerHTML = `Description: ${info.data.weather[0].description}`;

  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `Humidity: ${info.data.main.humidity} %`;

  let wind = document.querySelector(".wind");
  wind.innerHTML = `Wind: ${info.data.wind.speed} m/c`;
}

function searchSity(event) {
  event.preventDefault();
  let apiKey = "0c669309e9b69198d164920a0d742074";
  let inputCity = document.querySelector("#your-city");
  let changeCity = document.querySelector(".city-change");
  changeCity.innerHTML = inputCity.value;

  console.log(inputCity.value);

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(changeData);
}

let form = document.querySelector(".search-form");
form.addEventListener("submit", searchSity);

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
