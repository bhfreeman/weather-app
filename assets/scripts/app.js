var apiKey = "06ea892937d25046c048ad52855ad9f6";
var cardContainer = document.querySelector("#card-container");
var forecastContainer = document.querySelector("#forecast-container");
var searchBtn = document.querySelector("#search-btn");
var cityText = document.querySelector("#city-text");
var stateText = document.querySelector("#state-text");
var temperature;
var humidity;
var windSpeed;
var uvIndex;
var headName;
var date;
var weatherIcon;

function getLocation(city) {
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  fetch(apiUrl)
    .then((data) => data.json())
    .then(function (data) {
      // console.log(data);
      var lon = data.coord.lon;
      var lat = data.coord.lat;
      headName = data.name;
      // console.log(lon, lat);
      var newUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
      fetch(newUrl)
        .then((data) => data.json())
        .then(function (data) {
          console.log(data);
          temperature = data.current.temp;
          humidity = data.current.humidity;
          windSpeed = data.current.wind_speed;
          uvIndex = data.current.uvi;
          weatherIcon = data.current.weather[0].icon;
          date = data.current.dt;
          // console.log(data);
          currentWeatherCard();
          for (let i = 0; i < 4; i++) {
            item = data.daily[i];
            humidity = item.humidity;
            temperature = item.temp.day;
            date = item.dt;
            weatherIcon = item.weather[0].icon;
            forecastCard();
          }
        });
    });
}

function currentWeatherCard() {
  cardContainer.innerHTML = "";
  var newCard = document.createElement("div");
  var headNameH1 = document.createElement("h1");
  var ul = document.createElement("ul");
  var tempLi = document.createElement("li");
  var humidityLi = document.createElement("li");
  var windLi = document.createElement("li");
  var uvLi = document.createElement("li");
  var iconImg = document.createElement("img");
  iconImg.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`
  );
  headNameH1.innerText = `${headName} ${date}`;
  headNameH1.append(iconImg);
  tempLi.innerText = `Temperature: ${temperature}`;
  humidityLi.innerText = `Humidity: ${humidity}`;
  windLi.innerText = `Wind Speed: ${windSpeed}`;
  uvLi.innerText = `UV Index: ${uvIndex}`;
  ul.classList = "list-group";
  tempLi.classList = "list-group-item";
  humidityLi.classList = "list-group-item";
  windLi.classList = "list-group-item";
  uvLi.classList = "list-group-item";

  ul.append(tempLi);
  ul.append(humidityLi);
  ul.append(windLi);
  ul.append(uvLi);
  newCard.append(headNameH1);
  newCard.append(ul);
  cardContainer.append(newCard);
}

function forecastCard() {
  forecastContainer.innerHTML = "";
  var newCard = document.createElement("div");
  var headH1 = document.createElement("h1");
  var ul = document.createElement("ul");
  var tempLi = document.createElement("li");
  var humidityLi = document.createElement("li");
  var iconImg = document.createElement("img");
  iconImg.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`
  );
  headH1.innerText = `${date}`;
  tempLi.innerText = `Temperature: ${temperature}`;
  humidityLi.innerText = `Humidity: ${humidity}`;
  newCard.classList = "col-2"
  newCard.append(headH1);
  ul.append(iconImg);
  ul.append(tempLi);
  ul.append(humidityLi);
  newCard.append(ul);
  forecastContainer.append(newCard);
}

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  getLocation(cityText.value);
  console.log("clicked");
});
