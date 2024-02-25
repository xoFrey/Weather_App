const myPosition = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    let myPositionLat = position.coords.latitude;
    let myPositionLon = position.coords.longitude;
    console.log(myPositionLat, myPositionLon);
  });
};
myPosition();

fetch(
  `https://api.openweathermap.org/data/2.5/forecast?lat=54.0868608&lon=9.9844096&appid=13b6943af84bbae5e56e1975752bc696
  `
)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    data.list.forEach((item) => {
      console.log(item);

      let mytest = new Date(item.dt * 1000);
      let myDate = mytest.getDate();
      let myMonth = mytest.getMonth() + 1;
      let myYear = mytest.getFullYear();
      let myTime = mytest.getHours() - 1;
      let myString = `${myDate}-${myMonth}-${myYear}`;
      console.log(myTime);

      console.log(myString);

      if (!myString.includes("23-2-2024")) {
        if (myTime === 12) {
          return console.log("my item", item.main.temp);
        }
      } else {
        console.log("wuiiiiiiii");
      }
    });
  });
  i++;
  castTemp.textContent = item.main.temp;
  castDayP.textContent = castDate.toLocaleString("default", {
    weekday: "short",
  });

  weatherIcons(
    item.weather[0].main,
    iconPos,
    forecastDiv1,
    item.main.temp
  );