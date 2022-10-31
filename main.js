
//selector variable
var inputval = document.querySelector('#cityinput')
var btn = document.querySelector('#add');
var city = document.querySelector('#cityoutput')
var descrip = document.querySelector('#description')
var temp = document.querySelector('#temp')
var wind = document.querySelector('#wind')
var locationIcon=document.querySelector(".location")


var cityName = inputval;
console.log(cityName);
let latitude=0.0
let longitude=0.0
document.getElementById('gmap_canvass').src =`https://maps.google.com/maps?q=${cityName}&t=&z=13&ie=UTF8&iwloc=&output=embed`
inputval.addEventListener("keyup",function(event){
    if(event.keyCode===13){
        event.preventDefault();

        cityName=inputval.value
        getSearchWeather(cityName)
        console.log(cityName);
    }

})

apik = "3045dd712ffe6e702e3245525ac7fa38"
//kelvin to celcious

function convertion(val){
    return (val - 273).toFixed(2)
}

if("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError)
}

function setPosition(position){
    latitude= position.coords.latitude
    longitude = position.coords.longitude

    getWeather(latitude,longitude)
}

locationIcon.addEventListener("click",function(event){
    console.log('hey');
     getWeather(latitude,longitude)
})

function showError(error){
    alert(error.message)
} 




function getSearchWeather(cityName){
// fetch function
        fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputval.value+'&appid='+apik)
        .then(res => res.json())
         //.then(data => console.log(data))
        .then(data => {
            var nameval = data['name']
            var descrip = data['weather']['0']['description']
            var tempature = data['main']['temp']
            var wndspd = data['wind']['speed']
    
            city.innerHTML=`City: ${nameval}`
            temp.innerHTML = `Temperature: ${ convertion(tempature)} C`
            description.innerHTML = `Conditions: ${descrip}`
            wind.innerHTML = `Wind Speed: ${wndspd} km/h`
            document.getElementById('gmap_canvass').src =`https://maps.google.com/maps?q=${cityName}&t=&z=13&ie=UTF8&iwloc=&output=embed`
        })
        .catch(err => alert('You entered Wrong city name'))

    }   

function getWeather(latitude, longitude){
    

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apik}`)
        .then(res => res.json())
         //.then(data => console.log(data))
        .then(data => {
            var nameval = data['name']
            var descrip = data['weather']['0']['description']
            var tempature = data['main']['temp']
            var wndspd = data['wind']['speed']
    
            city.innerHTML=`City: ${nameval}`
            temp.innerHTML = `Temperature: ${ convertion(tempature)} C`
            description.innerHTML = `Conditions: ${descrip}`
            wind.innerHTML = `Wind Speed: ${wndspd} km/h`
    
        })
        .catch(err => alert('You entered Wrong city name'))

     
}

//fetch
    btn.addEventListener('click', getSearchWeather);
    // inputval.addEventListener('keypress', work);

