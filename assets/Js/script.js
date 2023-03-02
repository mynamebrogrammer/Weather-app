var key = "e065fc7e9b81d8076cdf23e93941524d";
var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=";
var city;

function handleSubmission(event, city = null) {
  event.preventDefault();

  if (city !== null) {
    document.getElementById("input-group").value = city;
  }

  city = document.getElementById("input-group").value;

  fetch(apiUrl + city + "&appid=" + key, { mode: "cors" })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      var forecastSection = document.getElementById("forecast-section");
      forecastSection.innerHTML = "";
      GenerateCards(data);
      saveHistory();
    })
    .catch(function (err) {
      console.error(err);
    });
}

function saveHistory() {
  var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
  var city = document.getElementById("input-group").value;
  searchHistory.push(city);

  if (searchHistory.length > 5) {
    searchHistory.shift();
  }

  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

  renderHistory();
}

function renderHistory() {
  var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

  var searchHistoryEl = document.getElementById("history");
  searchHistoryEl.innerHTML = "";

  for (var i = searchHistory.length - 1; i >= 0; i--) {
    var historyCity = searchHistory[i];
    var historyCityEl = document.createElement("div");
    historyCityEl.innerText = historyCity;
    historyCityEl.classList.add("history-city");
    historyCityEl.setAttribute("id", historyCity);
    historyCityEl.addEventListener("click", function () {
      handleSubmission(event, this.id);
    });

    searchHistoryEl.appendChild(historyCityEl);
  }

  for (var i = 0; i < searchHistory.length; i++) {
    var historyCity = searchHistory[i];
    var historyCityEl = document.createElement("div");
    historyCityEl.innerText = historyCity;
    historyCityEl.classList.add("history-city");

    historyCityEl.addEventListener("click", function () {
      handleSubmission(
        {
          preventDefault: function () {},
        },
        historyCity
      );
    });

    searchHistoryEl.appendChild(historyCityEl);
  }

  for (var i = 0; i < searchHistory.length; i++) {
    var historyCity = searchHistory[i];
    var historyCityEl = document.createElement("div");
    historyCityEl.innerText = historyCity;
    historyCityEl.classList.add("history-city");

    historyCityEl.addEventListener("click", function () {
      handleSubmission(
        {
          preventDefault: function () {},
        },
        historyCity
      );
    });

    searchHistoryEl.appendChild(historyCityEl);
  }

  console.log(searchHistory);
}

function GenerateCards(data) {
  var cardDeck = document.createElement("div");
  cardDeck.classList.add("card-deck");
  var cardContEl = document.getElementById("forecast-section");
  cardContEl.classList.add("d-flex", "flex-wrap");

  var currentDate = new Date();
  var currentDateEl = document.createElement("div");
  currentDateEl.innerText = currentDate.toDateString();

  var dateEL = document.createElement("div");
  dateEL.innerText = currentDate.toDateString();

  var card = document.createElement("div");
  card.classList.add("card");

  var temp = document.createElement("p");
  temp.innerText =
    "Temperature: " + (data.list[0].main.temp - 273.15).toFixed(1) + "°C";

  var humidity = document.createElement("p");
  humidity.innerText = "Humidity: " + data.list[0].main.humidity + "%";

  var windSpeed = document.createElement("p");
  windSpeed.innerText = "Wind Speed: " + data.list[0].wind.speed + " km/h";

  card.append(dateEL);
  card.append(temp);
  card.append(humidity);
  card.append(windSpeed);

  cardContEl.append(card);
  cardDeck.append(card);

  for (let i = 0; i < data.list.length; i++) {
    var forecast = data.list[i];
    var date = new Date(forecast.dt * 1000);

    if (date.getUTCHours() === 12) {
      var card = document.createElement("div");
      card.classList.add("card");

      var dateEL = document.createElement("div");
      dateEL.innerText = date.toDateString();

      var temp = document.createElement("p");
      temp.innerText =
        "Temperature: " + (forecast.main.temp - 273.15).toFixed(1) + "°C";

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

var form = document.querySelector("#weather-form");
var cityInput = document.querySelector("#input-group");
var forecastSection = document.querySelector("#forecast-section");
var clearButton = document.createElement("button");

clearButton.innerHTML = "Clear";
clearButton.classList.add("btn", "btn-secondary", "btn-lg");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = cityInput.value.trim();
  if (city) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`
    );
    const data = await response.json();
    if (data.cod === 200) {
      forecastSection.innerHTML = "";
      GenerateCards(data);
      localStorage.setItem("city", city);

      if (!clearButton.parentNode) {
        form.appendChild(clearButton);
      }

      form.appendChild(clearButton);
    }
  }
});

clearButton.addEventListener("click", (event) => {
  localStorage.removeItem("city");
  forecastSection.innerHTML = "";
  clearButton.remove();
});
document.addEventListener("submit", handleSubmission);
