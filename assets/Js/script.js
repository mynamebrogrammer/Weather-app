var key = "e065fc7e9b81d8076cdf23e93941524d";
var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=";
var city;

function handleSubmission(event) {
  event.preventDefault();

  city = document.getElementById("input-group").value;

  fetch(apiUrl + city + "&appid=" + key, { mode: 'cors' })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      var forecastSection = document.getElementById("forecast-section");
      forecastSection.innerHTML = '';
      GenerateCards(data);
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
  var cardDeck = document.createElement("div");
  cardDeck.classList.add("card-deck");
  var cardContEl = document.getElementById("forecast-section");
  cardContEl.classList.add("d-flex", "flex-wrap");

  for (let i = 0; i < data.list.length; i++) {
    var forecast = data.list[i];
    var date = new Date(forecast.dt * 1000);

    if (date.getUTCHours() === 12) {
      var card = document.createElement("div");
      card.classList.add("card");

      var dateEL = document.createElement("div");
      dateEL.innerText = date.toDateString();

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

      cardContEl.appendChild(card);
      cardDeck.appendChild(card);
    }
  }
  cardContEl.appendChild(cardDeck);
}

var form = document.querySelector('#weather-form');
var cityInput = document.querySelector('#input-group');
var forecastSection = document.querySelector('#forecast-section');
var clearButton = document.createElement('button');

clearButton.innerHTML = 'Clear';
clearButton.classList.add('btn', 'btn-secondary', 'btn-lg');

form.addEventListener('submit', async event => {
  event.preventDefault();

  form.appendChild(clearButton);
});

clearButton.addEventListener('click', event => {
  localStorage.removeItem('city');
  forecastSection.innerHTML = '';
  clearButton.remove();
});
document.addEventListener("submit", handleSubmission);

