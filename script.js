// DOM Elements
const time = document.querySelector('.time'),
  date = document.querySelector('.date'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus');

// show day
function getWeekDay(date) {
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Wednesday', 'Friday', 'Saturday'];
  return days[date.getDay()];
}
//show month
function getMonth(date) {
  let days = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return days[date.getMonth()];
}



// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();
 
  // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;

  setTimeout(showTime, 1000);
}

function showDay(){
  let today = new Date()
   let day = today.getDate();
  date.innerHTML = `${getWeekDay(today)}<span>, </span> ${day}<span> </span> ${getMonth(today)}`;
  console.log(date.innerHTML)
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();

  if (hour < 12 && hour > 6) {
    // Morning
    document.body.style.backgroundImage =
    "url('assets/images/morning/01.jpg')";
    greeting.textContent = 'Good Morning, ';
  } else if (hour < 18 && hour >= 12) {
    // day
    document.body.style.backgroundImage =
    "url('assets/images/day/01.jpg')";
    greeting.textContent = 'Good Day, ';
    document.body.style.color = 'white';
  } else if (hour < 6) {
      // Night
      document.body.style.backgroundImage = "url('assets/images/night/01.jpg')"
      greeting.textContent = 'Good Night, ';
      document.body.style.color = 'white'
  } else {
    // Evening
    document.body.style.backgroundImage =
      "url('assets/images/evening/07.jpg')";
      greeting.textContent = 'Good Evening, ';
      document.body.style.color = 'white';
  }
}

// Get Name
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
    } 
  else {
    localStorage.setItem('name', e.target.innerText);
  }
 
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}


name.addEventListener('keypress', setName);

name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

// Run
showTime();
showDay()
setBgGreet();
getName();
getFocus();

const base = 'assets/images/';
const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
let i = 0;
const evening = "evening/";
const night= 'night/';
const morning = "morning/";
const day = "day/"

function viewBgImage(data) {
  const body = document.querySelector('body');
  const src = data;
  const img = document.createElement('img');
  img.src = src;
  img.onload = () => {      
    body.style.backgroundImage = `url(${src})`;
    console.log (1)
  }; 
} 

function getImage() {
  const index = i % images.length;
  let today = new Date(),
      hour = today.getHours();
      if (hour < 12 && hour > 6) {
        const imageSrc = base + morning + images[index];
        viewBgImage(imageSrc);
        i++;
        bt.disabled = true;
        setTimeout(function() { bt.disabled = false }, 1000);
      } else if (hour < 18 && hour >= 12) {
        const imageSrc = base + day + images[index];
        viewBgImage(imageSrc);
        i++;
        bt.disabled = true;
        setTimeout(function() { bt.disabled = false }, 1000);
      } else if (hour < 6) {
        const imageSrc = base + night + images[index];
        viewBgImage(imageSrc);
        i++;
        bt.disabled = true;
        setTimeout(function() { bt.disabled = false }, 1000);
      } else {
        const imageSrc= base+ evening + images[index];
         viewBgImage(imageSrc);
        i++;
        bt.disabled = true;
        setTimeout(function() { bt.disabled = false }, 1000);
      }
  
  // viewBgImage(imageSrc);
  // i++;
  // bt.disabled = true;
  // setTimeout(function() { bt.disabled = false }, 1000);
  
} 
const bt = document.querySelector('.bt');
bt.addEventListener('click', getImage);

// цитата

const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const btn = document.querySelector('.btn');

async function getQuote() {  
  const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;
  const res = await fetch(url);
  const data = await res.json(); 
  blockquote.textContent = data.quoteText;
  figcaption.textContent = data.quoteAuthor;
}
document.addEventListener('DOMContentLoaded', getQuote);
btn.addEventListener('click', getQuote);



const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');

function setCity(e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      if( e.target.innerText !==""){
        localStorage.setItem('city', e.target.innerText);
        city.blur();
        getWeather();
      }
      else {
        localStorage.getItem('city')=e.target.innerText
      }
      }
    } 
  else {
    localStorage.setItem('city', e.target.innerText);
  }
 
}


async function getWeather() {
  if (localStorage.getItem('city') === null) {
    city.textContent= 'Kiev'
  } else {
    city.textContent = localStorage.getItem('city');
  }
  try{
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
  
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `t:${data.main.temp.toFixed(0)}°C w:${data.wind.speed.toFixed(0)}m/s h:${data.main.humidity.toFixed(0)}%`;
  }
  catch{
    alert('choose another city')
    city.textContent='city'
  }
  
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);
city.addEventListener('click', ()=>{city.textContent = ''})