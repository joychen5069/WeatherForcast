console.log("linked to html")

//API key
const APIkey = "db564efd201bdbb52479e58ddd22fc02"

//URLS
var city = $('#city-input').val();

var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIkey;

console.log("city", city)
console.log("queryURL", queryURL)

//search for a city
$('#find-city').on('click', function (event) {
    //prevent submit button from submitting the form
    event.preventDefault();

    var city = $('#city-input').val();
    $('#city-input').val('');
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIkey;

    console.log("city", city);
    console.log("queryURL", queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        $('.city-name').text(JSON.stringify(response.city.name))
        console.log(response.list[0].main.temp)
        $('.temp').text("Current Temperature: " + JSON.stringify(response.list[0].main.temp) + "°F")
    })

})

