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

      var temp = data.list[0].main.temp.toFixed(2) - 273.15;
      console.log(temp + "°C");
      var humidity = data.list[0].main.humidity;
      console.log(humidity + "%");
      var windSpeed = data.list[0].wind.speed;
      console.log(windSpeed + "km/h");

      for (var i = 0; i < data.list.length; i++) {
        var forecast = data.list[i];
        var date = new Date(forecast.dt * 1000);
        if (date.getUTCHours() === 12) {
          console.log("Date: " + date);
          console.log("Weather: " + forecast.weather[0].main);
          console.log("Icon: " + forecast.weather[0].icon);
          console.log("Temperature: " + forecast.main.temp);
          console.log("Wind Speed: " + forecast.wind.speed);
          console.log("Humidity: " + forecast.main.humidity);
        }
      }

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
document.addEventListener("submit", handleSubmission);
