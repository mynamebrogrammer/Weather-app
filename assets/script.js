var key = "e065fc7e9b81d8076cdf23e93941524d";
var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=";

function handleSubmission(event) {
  event.preventDefault();


  var city = document.getElementById("input-group").value;
  console.log(city);


  fetch(apiUrl + city + "&appid=" + key , {
    headers: {
      "content-type": "application/json"
    },
    mode: 'no-cors'
  })
    .then(Response => Response.json())
    .then(data => {
      console.log(data.main[0].weather);
      
    })
  .catch(error => console.log(error));
  
  
}
document.addEventListener("submit", handleSubmission);
