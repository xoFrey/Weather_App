const city_name = document.querySelector("#inputCity");
const color = document.querySelector(".night");

// Take Classes
const temp = document.querySelector(".temp div");
const min = document.querySelector(".min div");
const max = document.querySelector(".max div");
const feel = document.querySelector(".feel div");
const humidity = document.querySelector(".humid div");
const pressure = document.querySelector(".pressure div");
const sunrise = document.querySelector(".sunrise div");
const sunset = document.querySelector(".sunset div");
const windspeed = document.querySelector(".wind div");

// Create Elements
let temperature = document.createElement("p");
let tempMin = document.createElement("p");
let tempMax = document.createElement("p");
let tempFeel = document.createElement("p");
let tempHumid = document.createElement("p");
let tempPressure = document.createElement("p");
let tempSunrise = document.createElement("p");
let tempSunset = document.createElement("p");
let tempWind = document.createElement("p");

const weatherData = () => {
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city_name.value}&appid=13b6943af84bbae5e56e1975752bc696
    `
  )
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        console.log(data);

        let lat = item.lat;
        let lon = item.lon;
        let name = item.name;
        weatherInfo(lat, lon, name);
      });
    })
    .catch((error) => console.log("Geocoding API Error", error));
};

const weatherInfo = (lat, lon, name) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=13b6943af84bbae5e56e1975752bc696`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      // : Name (Default NMS!!!!!)
      document.querySelector("h1").textContent = name;

      // : Temp Min
      tempMin.textContent = Math.round(data.main.temp_min) + "°";
      min.appendChild(tempMin);

      // : Temp Max
      tempMax.textContent = Math.round(data.main.temp_max) + "°";
      max.appendChild(tempMax);

      // :Feels Like
      tempFeel.textContent = Math.round(data.main.feels_like) + "°";
      feel.appendChild(tempFeel);

      // : Humidity

      tempHumid.textContent = data.main.humidity + " %";
      humidity.appendChild(tempHumid);

      // : Pressure
      console.log(data.main.pressure);
      tempPressure.textContent = data.main.pressure + " hPa";
      pressure.appendChild(tempPressure);
      // : Sunrise
      let sunriseLocal = (data.sys.sunrise + data.timezone) * 1000;
      let sunriseTime = new Date(sunriseLocal);

      tempSunrise.textContent = sunriseTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      sunrise.appendChild(tempSunrise);

      // : Sunset
      let sunsetLocal = (data.sys.sunset + data.timezone) * 1000;
      let sunsetTime = new Date(sunsetLocal);

      tempSunset.textContent = sunsetTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      sunset.appendChild(tempSunset);

      // : Wind Speed
      console.log(data.wind.speed);
      tempWind.textContent = data.wind.speed + " m/s";
      windspeed.appendChild(tempWind);

      // # Color Change
      fetch(
        `https://api-bdc.net/data/timezone-by-location?latitude=${lat}&longitude=${lon}&key=bdc_1d040483f7a745a39f885c41502d07c0`
      )
        .then((res) => res.json())
        .then((data) => {
          let iso = data.localTime;
          let localDate = new Date(iso);

          // ! ==== Sunrise / Sunset und weather icons day night ====
          let getHoursLocal;
          let getHoursSunrise;
          let getHoursSunset;

          // Sunset and sunrise hours
          getHoursSunset = sunsetTime.getHours() - 1;
          getHoursSunrise = sunriseTime.getHours() - 1;
          getHoursLocal = localDate.getHours();
          console.log("LOCAL, SUNRISE, SUNSET");

          console.log(getHoursLocal);
          console.log(getHoursSunrise);
          console.log(getHoursSunset);

          if (
            getHoursLocal >= getHoursSunset ||
            getHoursLocal <= getHoursSunrise
          ) {
            color.classList.remove("day");
            color.classList.add("night");
          } else {
            color.classList.remove("night");
            color.classList.add("day");
          }
        });
    });
};

const myWeatherData = (lat, lon) => {
  fetch(
    `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=13b6943af84bbae5e56e1975752bc696
      `
  )
    .then((res) => res.json())
    .then((myData) => {
      weatherInfo(lat, lon, myData[0].name);
    });
};
const myPositionInfo = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    city_name.value = "";
    let myPositionLat = position.coords.latitude;
    let myPositionLon = position.coords.longitude;
    myWeatherData(myPositionLat, myPositionLon);
  });
};
myPositionInfo();
