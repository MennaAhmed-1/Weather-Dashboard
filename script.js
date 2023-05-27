const parent0 = document.querySelector(".heading");
const parent1 = document.querySelector(".card-2");
const parent2 = document.querySelector(".card-1");
const parent3 = document.querySelector(".card-3");
const leftButton = document.querySelector(".left-button");
const rightButton = document.querySelector(".right-button");
let pointer = 0;
let data;

/* date formatted */
const currentDate = new Date();
const options = {
  weekday: "long",
  month: "long",
  day: "numeric",
};

const getData = async function (countryName) {
  const res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=40bb1bd50e9f44df86b224156221112&q=${countryName}&days=7&aqi=no&alerts=no`
  );
  const data = await res.json();
  console.log(data);
  return data;
};
const generateHeading = function (data) {
  // console.log(data.location);
  const html0 = `
  <div class="sub-heading">Forecast in <strong>${data.location.country}, ${
    data.location.name
  }</strong></div>
  <div class="date-heading">${currentDate.toLocaleDateString(
    "en-us",
    options
  )} at ${currentDate.toLocaleTimeString()}</div>
    </div> `;

  parent0.innerHTML = "";
  parent0.insertAdjacentHTML("afterbegin", html0);
};

const generateCard2 = function (data) {
  const html1 = `
    <ul>
    <li >
    <span> Visibility</span>
    <span> ${data.forecast.forecastday[pointer].day.avgvis_km}km <ion-icon class="icon"name="eye-outline"></ion-icon></span>
    </li>
    <li >
    <span> Dew Point</span>
    <span>${data.forecast.forecastday[pointer].hour[pointer].dewpoint_c}<ion-icon class="icon"name="water-outline"></ion-icon></span>
    </li>
    <li >
    <span>Humidity</span>
    <span> ${data.forecast.forecastday[pointer].day.avghumidity}% <ion-icon class="icon"name="flower-outline"></ion-icon></span>
    </li>
    <li>
    <span> Wind</span>
    <span>${data.forecast.forecastday[pointer].day.maxwind_kph} km/hr <ion-icon class="icon"name="bonfire-outline"></ion-icon></span>
    </li>
    <li >
    <span> Cloudiness</span>
    <span> ${data.current.cloud}<ion-icon class="icon"name="cloudy-outline"></ion-icon></span>
    </li>
    </ul>`;
  parent1.innerHTML = "";
  parent1.insertAdjacentHTML("afterbegin", html1);
};

const generateCard1 = function (data) {
  const html2 = `
    <div class="content1">
    <div class="degree-1"> <strong>${data.forecast.forecastday[pointer].day.avgtemp_c}&#8451;</strong></div>
    <div class="degree-2">
    <p class="degree">High ${data.forecast.forecastday[pointer].day.maxtemp_c}&#8451;</p>
    <p class="degree">low ${data.forecast.forecastday[pointer].day.mintemp_c} &#8451;</p>
    </div>
    </div>
    
    <div class="content2">
    <div class="content-left">
    <p>${data.forecast.forecastday[pointer].day.condition.text} Sky</p>
    <p>Feels like ${data.forecast.forecastday[pointer].day.avgtemp_c} &#8451 </p>
   
    </div>
    <div class="content-right">
    <!-- <img src="img/svg1.svg"/>' -->
    </div>`;

  parent2.innerHTML = "";
  parent2.insertAdjacentHTML("afterbegin", html2);
};

const generateCard3 = function (data) {
  const html3 = `
    <img class="img" src="img/weather.png" alt="weather">
    <div class="img-text">
    
    <div class="sunrise">
    <ion-icon name="sunny-outline"></ion-icon>
    
    <span > Sunrise</span>
    <span > ${data.forecast.forecastday[pointer].astro.sunrise}</span>
    </div>
    
    <div class="sunset">
    <ion-icon name="moon-outline"></ion-icon>
    
    <span > Sunset</span>
    <span > ${data.forecast.forecastday[pointer].astro.sunset}</span>
    </div>
</div>

</div>
</div>
`;

  parent3.innerHTML = "";
  parent3.insertAdjacentHTML("afterbegin", html3);
};

// svg images of card 1

const generateIcons = function (data) {
  if (data.forecast.forecastday[pointer].day.condition.text === "Mist") {
    const icon = document.querySelector(".content-right");
    img = '<img src="img/svg4.svg"/>';
    icon.innerHTML = "";
    icon.insertAdjacentHTML("afterbegin", img);
  } else if (
    data.forecast.forecastday[pointer].day.condition.text === "Light rain" ||
    data.forecast.forecastday[pointer].day.condition.text ===
      "Light rain shower" ||
    data.forecast.forecastday[pointer].day.condition.text ===
      "Light freezing rain"
  ) {
    const icon = document.querySelector(".content-right");
    img = '<img src="img/svg5.svg"/>';
    icon.innerHTML = "";
    icon.insertAdjacentHTML("afterbegin", img);
  } else if (
    data.forecast.forecastday[pointer].day.condition.text === "Clear"
  ) {
    const icon = document.querySelector(".content-right");
    img = '<img src="img/svg3.svg"/>';
    icon.innerHTML = "";
    icon.insertAdjacentHTML("afterbegin", img);
  } else if (
    data.forecast.forecastday[pointer].day.condition.text === "Sunny" ||
    data.forecast.forecastday[pointer].day.condition.text === "Sunny Sky"
  ) {
    const icon = document.querySelector(".content-right");
    img = '<img src="img/svg1.svg"/>';
    icon.innerHTML = "";
    icon.insertAdjacentHTML("afterbegin", img);
  } else if (
    data.forecast.forecastday[pointer].day.condition.text === "Overcast"
  ) {
    const icon = document.querySelector(".content-right");
    img = '<img src="img/svg6.svg"/>';
    icon.innerHTML = "";
    icon.insertAdjacentHTML("afterbegin", img);
  } else {
    const icon = document.querySelector(".content-right");
    img = '<img src="img/svg0.svg"/>';
    icon.innerHTML = "";
    icon.insertAdjacentHTML("afterbegin", img);
  }
};

// Images and data of card 3
const generateImages = function (data) {
  if (data.current.is_day == "0") {
    img1 = ` 
      <img class="img1" src="img/sunset.jpg"/>
      <div class="img-text">
      <div class="sunrise">
      <ion-icon name="sunny-outline"></ion-icon>
      
      <span > Sunrise</span>
      <span > ${data.forecast.forecastday[pointer].astro.sunrise}</span>
      </div>
      
      <div class="sunset">
      <ion-icon name="moon-outline"></ion-icon>
      
      <span > Sunset</span>
      <span > ${data.forecast.forecastday[pointer].astro.sunset}</span>
      </div>
      </div>
      
      </div>
      </div>
`;
    parent3.innerHTML = "";
    parent3.insertAdjacentHTML("afterbegin", img1);
  } else if (data.current.is_day == "1") {
    img = `<img class="img" src="img/weather.png" alt="weather">
  <div class="img-text">
  
  <div class="sunrise">
  <ion-icon name="sunny-outline"></ion-icon>
  
  <span > Sunrise</span>
  <span > ${data.forecast.forecastday[pointer].astro.sunrise}</span>
  </div>
  
  <div class="sunset">
  <ion-icon name="moon-outline"></ion-icon>
  
  <span > Sunset</span>
  <span > ${data.forecast.forecastday[pointer].astro.sunset}</span>
  </div>
  </div>
  
  </div>
  </div>
  `;
    parent3.innerHTML = "";
    parent3.insertAdjacentHTML("afterbegin", img);
  }
};

const generateRightButton = function (data) {
  const btn1 = `

  <div> Tomorrow</div>
<ion-icon name="sunny-outline"></ion-icon>
<p>${data.forecast.forecastday[pointer + 1].astro.sunrise}</p>
<p>High ${data.forecast.forecastday[pointer + 1].day.maxtemp_c} &#8451;</p>
<ion-icon class="page-icon"name="caret-forward-outline"></ion-icon>
<ion-icon name="moon-outline"></ion-icon>
<div> Sunset</div>
<p>${data.forecast.forecastday[pointer + 1].astro.sunset} </p>
<p>low ${data.forecast.forecastday[pointer + 1].day.mintemp_c} &#8451;</p>
</button>
`;

  rightButton.innerHTML = "";
  rightButton.insertAdjacentHTML("afterbegin", btn1);
  rightButton.disabled = false;
};

const generateLeftButton = function (data) {
  const btn1 = `
  <div> Yesterday</div>
<ion-icon name="sunny-outline"></ion-icon>
<p>${data.forecast.forecastday[pointer - 1].astro.sunrise}</p>
<p>High ${data.forecast.forecastday[pointer - 1].day.maxtemp_c} &#8451;</p>
<ion-icon class="page-icon" name="caret-back-outline"></ion-icon>
<ion-icon name="moon-outline"></ion-icon>
<div> Sunset</div>
<p>${data.forecast.forecastday[pointer - 1].astro.sunset} </p>
<p>low ${data.forecast.forecastday[pointer - 1].day.mintemp_c} &#8451;</p>
</button>
`;

  leftButton.innerHTML = "";
  leftButton.insertAdjacentHTML("afterbegin", btn1);
  leftButton.disabled = false;
};

const generateLeftButtonDisable = function () {
  const btn = `
  <div> Yesterday</div>
    <ion-icon class="page-icon" name="caret-back-outline"></ion-icon>
    </button>
      `;
  leftButton.innerHTML = "";
  leftButton.insertAdjacentHTML("afterbegin", btn);
  leftButton.disabled = true;
};

const generateRightButtonDisable = function () {
  const btn = `
        <div> Tomorrow</div>
        <ion-icon class="page-icon"name="caret-forward-outline"></ion-icon>
          </button>
            `;
  rightButton.innerHTML = "";
  rightButton.insertAdjacentHTML("afterbegin", btn);
  rightButton.disabled = true;
};

rightButton.addEventListener("click", function (e) {
  e.preventDefault();
  pointer++;
  generateHeading(data);
  generateCard2(data);
  generateCard1(data);
  generateCard3(data);
  generateIcons(data);
  generateImages(data);
  if (pointer === 2) {
    generateRightButtonDisable();
  } else {
    generateRightButton(data);
  }

  generateLeftButton(data);
});

leftButton.addEventListener("click", function (e) {
  e.preventDefault();
  pointer--;
  generateHeading(data);
  generateCard2(data);
  generateCard1(data);
  generateCard3(data);
  generateIcons(data);
  generateImages(data);
  if (pointer === 0) {
    generateLeftButtonDisable();
  } else {
    generateLeftButton(data);
  }

  generateRightButton(data);
});

// search part
const search = document.querySelector(".search-bar");
search.addEventListener("keypress", async (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    const search = document.querySelector(".search-bar").value;
    console.log(search);
    main(search);
    // pointer = 0;
  }
});

// main data
const main = async function (search) {
  pointer = 0;
  data = await getData(search);
  generateHeading(data);
  generateCard2(data);
  generateCard1(data);
  generateCard3(data);
  generateIcons(data);
  generateImages(data);
  generateRightButton(data);
  generateLeftButtonDisable();
};
main("egypt");
