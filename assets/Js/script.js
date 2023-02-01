var key = "e065fc7e9b81d8076cdf23e93941524d";
var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=";
var city;

function handleSubmission(event) {
  event.preventDefault();


  city = document.getElementById("input-group").value;
  console.log(city);

  var currentDate;
  currentDate = dayjs().format('ddd D, YYYY');
  console.log(currentDate);

  fetch(apiUrl + city + "&appid=" + key, { mode: 'cors' })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data.list[0].weather[0].main);
      console.log(data.list[0].wind.speed);
      console.log(data.list[0].main.temp);

      var Temperature = data.list[0].main.temp.toFixed(2) - 273.15;
      console.log(Temperature + "°C");
      var humidityMain = data.list[0].main.humidity;
      console.log(humidityMain + "%");
      var windSpeedMain = data.list[0].wind.speed;
      console.log(windSpeedMain + "km/h");

      for (var i = 0; i < data.list.length; i++) {
        var forecast = data.list[i];
        var date = new Date(forecast.dt * 1000);
        var cardContEl = document.createElement("div");
        if (date.getUTCHours() === 12) {
          console.log("Date: " + currentDate);
          console.log("Weather: " + forecast.weather[0].main);
          console.log("Icon: " + forecast.weather[0].icon);
          console.log("Temperature: " + Temperature);
          console.log("Wind Speed: " + windSpeedMain);
          console.log("Humidity: " + humidityMain);
        }
      }

      displayResults(data);
      GenerateCards();
      saveHistory();
    })
    .catch(function (err) {
      console.error(err);
    });
}

function saveHistory() {
  var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
  searchHistory.push(city);
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  console.log(searchHistory);
}

function GenerateCards(data) {
  var cardContEl = document.getElementById("forecast-section");
  for (let i = 0; i < data.list.length; i++) {
    var forecast = data.list[i];
    var date = new Date(forecast.dt * 1000);

    if (date.getUTCHours() === 12) {
      var card = document.createElement("div");
      card.classList.add("card");

      cardContEl.class = "card-group";


      var dateEL = document.createElement("div");
      dateEL.innerText = date;

      var temp = document.createElement("p");
      temp.innerText = "Temperature: " + (forecast.main.temp - 273.15).toFixed(1) + "°C";

      var humidity = document.createElement("p");
      humidity.innerText = "Humidity: " + forecast.main.humidity + "%";

      var windSpeed = document.createElement("p");
      windSpeed.innerText = "Wind Speed: " + forecast.wind.speed + "km/h";

      card.appendChild(dateEL);
      card.appendChild(temp);
      card.appendChild(humidity);
      card.appendChild(windSpeed);

      var forecastSection = document.getElementById("forecast-section");
      forecastSection.appendChild(card);
    }
  }

}
function displayResults(data) {
  for (let i = 0; i < data.list.length; i++) {
    var forecast = data.list[i];
    var date = new Date(forecast.dt * 1000);
    if (date.getUTCHours() === 12) {
      var card = document.createElement("div");
      card.classList.add("card");

      var dateEL = document.createElement("div");
      dateEL.innerText = date;

      var temp = document.createElement("p");
      temp.innerText = "Temperature: " + (forecast.main.temp - 273.15).toFixed(1) + "°C";

      var humidity = document.createElement("p");
      humidity.innerText = "Humidity: " + forecast.main.humidity + "%";

      var windSpeed = document.createElement("p");
      windSpeed.innerText = "Wind Speed: " + forecast.wind.speed + "km/h";

      card.appendChild(dateEL);
      card.appendChild(temp);
      card.appendChild(humidity);
      card.appendChild(windSpeed);

      var forecastSection = document.getElementById("forecast-section");
      forecastSection.appendChild(card);
    }
  }
}
document.addEventListener("submit", handleSubmission);
