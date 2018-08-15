//Time countdown
const xmasDate = new Date("Dec 24, 2017 00:00:00").getTime();

const x = setInterval(function() {

  const today = new Date().getTime();

  const timeGap = xmasDate - today;

  const days = Math.floor(timeGap / (24 *60 * 60 * 1000));
  const hours = Math.floor(
    (timeGap % (24 *60 * 60 * 1000)) / (60 * 60 * 1000)
  );
  const minutes = Math.floor((timeGap % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((timeGap % (60 * 1000)) / 1000);

  document.getElementById("xmas").innerHTML =
    days +
    " day(s) " +
    hours +
    " hour(s) " +
    minutes +
    " min(s) " +
    seconds +
    " second(s)";

   if (timeGap < 0) {
    clearInterval(x);
    document.getElementById("xmas").innerHTML = "Merry Christmas!";
  }
}, 1000);

//AJAX weather
function fetchWeatherInfo() {
    const urlString = "http://api.openweathermap.org/data/2.5/weather?q=helsinki&units=metric&APPID=32f1264bba3945837fa37cc1c29b4db1";
    
   const weatherQuery = new XMLHttpRequest();                   
    weatherQuery.onreadystatechange = weatherQueryListener;     
    weatherQuery.open("GET", urlString, true);                 
    weatherQuery.send();                                    
            
    
       function weatherQueryListener() {
        if (weatherQuery.readyState === 4 && weatherQuery.status === 200) {
            console.log("The weather service returned the following JSON string: \n\n" + weatherQuery.responseText); showWeatherInfo(weatherQuery.responseText);  
        }
    }
}

function showWeatherInfo(jsonText) {

    const JSoutput=JSON.parse(jsonText);
  
    const outputText = JSoutput.weather[0].description + "<br/>" + "Temperature(°C): " + JSoutput.main.temp +"<br/>"+ "Wind(m/s): " + JSoutput.wind.speed.toFixed(0) +"<br/>" + "Cloud(%): " + JSoutput.clouds.all;
    
    document.getElementById("divOutput").innerHTML=outputText;

}
fetchWeatherInfo();
