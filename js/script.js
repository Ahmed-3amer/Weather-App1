// Search Input --
let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");

// Today Data --
let todayName = document.getElementById("todayDate");
let todayNum = document.getElementById("dayNum");
let todayMonth = document.getElementById("monthNum");
let cityLocation = document.getElementById("city");
let todayTemp = document.getElementById("todayTemp");
let todayTempImg = document.getElementById("todayTempImg");
let todayTempText = document.getElementById("todayTempText");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let windDirection = document.getElementById("windDirection");

// Next Days Data --
let nextDayName = document.getElementsByClassName("nextDayName");
let nextTempImg = document.getElementsByClassName("nextTempImg");
let nextMaxTemp = document.getElementsByClassName("nextMaxTemp");
let nextMinTemp = document.getElementsByClassName("nextMinTemp");
let nextTempText = document.getElementsByClassName("nextTempText");

// Weather Data function --
async function getWeatherData(cityName) {
  let weatherResponse = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=6254596e39064a108d3211453242001&q=${cityName}&days=3&aqi=no&alerts=no`
  );
  let weatherData = await weatherResponse.json();
  return weatherData;
}
//display today data --
function displayTodayData(data) {
  let todayDate = new Date();
  todayName.innerHTML = todayDate.toLocaleDateString("en-US", {
    weekday: "long",
  });
  todayNum.innerHTML = todayDate.getDate();
  todayMonth.innerHTML = todayDate.toLocaleDateString("en-US", {
    month: "long",
  });
  cityLocation.innerHTML = data.location.name;
  todayTemp.innerHTML = data.current.temp_c;
  todayTempImg.setAttribute("src", "https:" + data.current.condition.icon);
  todayTempText.innerHTML = data.current.condition.text;
  humidity.innerHTML = data.current.humidity + "%";
  wind.innerHTML = data.current.wind_kph + " " + "km/h";
  windDirection.innerHTML = data.current.wind_dir;
  document.querySelector(
    ".weather-table"
  ).style.backgroundImage = `url("https://loremflickr.com/1600/900/${data.location.name}")`;
}

// display next days data --
function displaynextData(data) {
  let forecastData = data.forecast.forecastday;
  for (let i = 0; i < 2; i++) {
    let nextDate = new Date(forecastData[i + 1].date);
    nextDayName[i].innerHTML = nextDate.toLocaleDateString("en-US", {
      weekday: "long",
    });
    nextMaxTemp[i].innerHTML = forecastData[i + 1].day.maxtemp_c;
    nextMinTemp[i].innerHTML = forecastData[i + 1].day.mintemp_c;
    nextTempText[i].innerHTML = forecastData[i + 1].day.condition.text;
    nextTempImg[i].setAttribute(
      "src",
      "https:" + forecastData[i + 1].day.condition.icon
    );
  }
}

// all Weather Data
async function allWeatherData(city = "cairo") {
  let weatherData = await getWeatherData(city);
  if (!weatherData.error) {
    displayTodayData(weatherData);
    displaynextData(weatherData);
  }
}
allWeatherData();

// search location
searchInput.addEventListener("keyup", function () {
  allWeatherData(searchInput.value);
});

searchBtn.addEventListener("click", allWeatherData);
