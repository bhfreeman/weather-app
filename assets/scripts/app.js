var apiKey = "06ea892937d25046c048ad52855ad9f6";
var cardContainer = document.querySelector("#card-container");
var searchBtn = document.querySelector("#search-btn");
var currentTemp;
var humidity;
var windSpeed;
var uvIndex;

function getLocation(city) {
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  fetch(apiUrl)
    .then((data) => data.json())
    .then(function (data) {
      console.log(data);
      var lon = data.coord.lon;
      var lat = data.coord.lat;
      console.log(lon, lat);
      var newUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
      fetch(newUrl)
        .then((data) => data.json())
        .then(function (data) {
          currentTemp = data.current.temp;
          humidity = data.current.humidity;
          windSpeed = data.current.speed;
          uvIndex = data.current.uvi;
          console.log(data);
          createCard();
        });
    });
}

function createCard() {
  var newCard = document.createElement("div");
  var ul = document.createElement("ul");
  var tempLi = document.createElement("li");
  var humidityLi = document.createElement("li");
  var windLi = document.createElement("li");
  var uvLi = document.createElement("li");
  tempLi.innerText = currentTemp;
  humidityLi.innerText = humidity;
  windLi.innerText = windSpeed;
  uvLi.innerText = uvIndex;
  ul.append(tempLi);
  ul.append(humidityLi);
  ul.append(windLi);
  ul.append(uvLi);
  newCard.append(ul);
  cardContainer.append(newCard);
}

searchBtn.addEventListener("click", getLocation("Mesa"));
