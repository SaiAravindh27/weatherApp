let lat;
let lon;

let locationName = document.getElementById("locationName");
let seticon = document.getElementById("icon");
let desc = document.getElementById("description");
let temperature = document.getElementById("temperature");
let subtemps = document.getElementById("subtemps");
let maxTemp = document.getElementById("maxTemp");
let minTemp = document.getElementById("minTemp");
let windspeed = document.getElementById("windspeed");

if(navigator.geolocation){

    navigator.geolocation.getCurrentPosition(async position => {
        lat = position.coords.latitude
        lon = position.coords.longitude;
        console.log(lat , lon);
        let data = await getWeatherData(lat , lon);
        var map = L.map('map').setView([lat,lon], 6);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        var marker = L.marker([lat,lon]).addTo(map);
        marker.bindPopup(`<b>${data.name}</b>`).openPopup();

        
        
        map.on('click', async function(e){
            const data = await getWeatherData(e.latlng.lat, e.latlng.lng);
            marker.setLatLng([e.latlng.lat,e.latlng.lng]);
            marker.bindPopup(`<b>${data.name}</b>`).openPopup();
        });

        return data;
            
    })
    
};




async function getWeatherData(lat , lon){
    
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=4bafb59f098e8fbc66c33327a08a9e26`
    let response = await fetch(api)
    let data = await response.json(); 
    console.log(data);
    dataHandler(data);
    return data;
}

function dataHandler(data){
    const {temp} = data.main;
    const {description} = data.weather[0];
    const {temp_max} = data.main;
    const {temp_min} = data.main;
    const {speed } = data.wind;    
    const {icon} = data.weather[0]

    locationName.innerHTML = data.name;
    desc.innerHTML =  description;
    temperature.innerHTML = "Temapature : " + temp; 
    maxTemp.innerHTML = "Max_Temp : " + temp_max;
    minTemp.innerHTML = "Min_Temp : " + temp_min;
    windspeed.innerHTML = "Wind Speed : " + speed;
    seticon.style["background"] = `url(${setIconFunction(icon)})`
    




}

function setIconFunction(icon) {
 
    const icons = {
        "01d": "./animated/day.svg",
        "02d": "./animated/cloudy-day-1.svg",
        "03d": "./animated/cloudy-day-2.svg",
        "04d": "./animated/cloudy-day-3.svg",
        "09d": "./animated/rainy-1.svg",
        "10d": "./animated/rainy-2.svg",
        "11d": "./animated/rainy-3.svg",
        "13d": "./animated/snowy-6.svg",
        "50d": "./animated/mist.svg",
        "01n": "./animated/night.svg",
        "02n": "./animated/cloudy-night-1.svg",
        "03n": "./animated/cloudy-night-2.svg",
        "04n": "./animated/cloudy-night-3.svg",
        "09n": "./animated/rainy-1.svg",
        "10n": "./animated/rainy-2.svg",
        "11n": "./animated/rainy-3.svg",
        "13n": "./animated/snowy-6.svg",
        "50n": "./animated/mist.svg"
    };
 
    return icons[icon];
}












