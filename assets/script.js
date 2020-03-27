console.log("linked to html")

//API key
const APIkey =  "db564efd201bdbb52479e58ddd22fc02"

//URLS
var city = $('#city-input').val();

var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIkey;

console.log("city", city)
console.log("queryURL", queryURL)


$('#find-city').on('click', function(event) {
    //prevent submit button from submitting the form
    event.preventDefault();

    var city = $('#city-input').val();

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIkey;
    
    console.log("city", city)
    console.log("queryURL", queryURL)

})