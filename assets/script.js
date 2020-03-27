console.log("linked to html")

//API key
const APIkey =  "db564efd201bdbb52479e58ddd22fc02"

//URLS
var city = "orlando"
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIkey;
//obviously change the city to whatever they searched

console.log("city", city)
console.log("queryURL", queryURL)


