async function search(a) {
  let t = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=0da2e2be83b74dd48f7151915252404&q=${a}&days=3`
  );
  if (t.ok && 400 != t.status) {
    let a = await t.json();
    displayCurrent(a.location, a.current),
      displayAnother(a.forecast.forecastday);
  }
}
document.getElementById("search").addEventListener("keyup", (a) => {
  search(a.target.value);
});
var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
function displayCurrent(location, current) {
  if (!current) return;

  const updatedDate = new Date(current.last_updated.replace(" ", "T"));
  const dayName = days[updatedDate.getDay()];
  const dateString = `${updatedDate.getDate()} ${
    monthNames[updatedDate.getMonth()]
  }`;

  const html = `
      <div class="today forecast col-lg-4 col-md-6 col-sm-12">
        <div class="forecast-header fw-normal d-flex justify-content-between align-items-center" id="today">
          <div class="day text-white">${dayName}</div>
          <div class="date text-white">${dateString}</div>
        </div>
        <div class="forecast-content" id="current">
          <div class="location text-white">${location.name}</div>
          <div class="degree text-white fw-bold">
            <div class="num d-inline-block">${current.temp_c}<sup>o</sup>C</div>
            <div class="forecast-icon d-inline-block">
              <img src="https:${current.condition.icon}" alt="" width="90">
            </div>
          </div>
          <div class="custom text-white">${current.condition.text}</div>
          <span class="text-white"><img src="images/icon-umberella.png" alt="">20%</span>
          <span class="text-white"><img src="images/icon-wind.png" alt="">18km/h</span>
          <span class="text-white"><img src="images/icon-compass.png" alt="">East</span>
        </div>
      </div>
    `;

  document.getElementById("forecast").innerHTML = html;
}

function displayAnother(forecastArray) {
  let html = "";

  for (let i = 1; i < forecastArray.length; i++) {
    const day = forecastArray[i];
    const date = new Date(day.date.replace(" ", "T"));
    const dayName = days[date.getDay()];
    const icon = day.day.condition.icon;
    const max = day.day.maxtemp_c;
    const min = day.day.mintemp_c;
    const text = day.day.condition.text;

    html += `
        <div class="forecast col-lg-4 col-md-6 col-sm-12">
          <div class="forecast-header text-center fw-normal">
            <div class="day text-white">${dayName}</div>
          </div>
          <div class="forecast-content text-center">
            <div class="forecast-icon">
              <img src="https:${icon}" alt="" width="48">
            </div>
            <div class="degree text-white fw-bold">${max}<sup>o</sup>C</div>
            <small class="text-white">${min}<sup>o</sup></small>
            <div class="custom text-white">${text}</div>
          </div>
        </div>
      `;
  }

  document.getElementById("forecast").innerHTML += html;
}

search("cairo");
