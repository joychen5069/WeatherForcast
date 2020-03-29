console.log("linked to html")

//API key
const APIkey = "db564efd201bdbb52479e58ddd22fc02"

//URLS
// var city = $('#city-input').val();
// var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIkey;


//dates
var current = moment().format('LL');

// // console.log("city", city)
// console.log("queryURL", queryURL)

//search for a city
$('#find-city').on('click', function (event) {
    //prevent submit button from submitting the form
    event.preventDefault();

    var city = $('#city-input').val();
    var listCity = ['','','','',''];
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIkey;

    console.log("city", city);
    console.log("queryURL", queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        var icon =  "<img src='http://openweathermap.org/img/wn/";
        var iconEnd = "@3x.png' alt='Weather Icon'>";
        //append city name and icon
        $('.city-name').text(JSON.stringify(response.city.name) + " " + current)
      
        //add current temp
        console.log(response.list[0].main.temp)
        $('.temp').text("Current Temperature: " + JSON.stringify(response.list[0].main.temp) + " °F")

        //add current humidity
        $(".humid").text("Humidity: " + JSON.stringify(response.list[0].main.humidity) + " %")

        //add current windspeed
        $(".wind").text("Wind Speed: " + JSON.stringify(response.list[0].wind.speed) + " MPH")

        //add current UV index
        var lat = JSON.stringify(response.city.coord.lat);
        console.log(lat);
        var lon = JSON.stringify(response.city.coord.lon);
        console.log(lon)

        var UVURL = "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=" + APIkey + "&lat=" + lat + "&lon=" + lon;
        $.ajax({
            url: UVURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            $('.UV').text("UV Index: " + JSON.stringify(response[0].value))
        })

        //create five day weather forcast
        var date = 1
        for (var i = 1; i < 6; i++) {
            var futureDay = moment().add(i, 'days').calendar();
            // var day = JSON.parse($(".date" + i))
            $('#date'+ i).append(futureDay)
            console.log(futureDay)

            //add temp
            var tempFut = ("Temperature: " + JSON.stringify(response.list[i].main.temp) + " °F")
            console.log(tempFut)
            $('#temp' + i).append(tempFut)

            //add humidity 
            var humidFut = ("Humidity: " + JSON.stringify(response.list[i].main.humidity) + " %")
            console.log(humidFut)
            $('#humid' + i).append(humidFut)
            
        }


    })
    //create old searches list in local storage
    // if (localStorage.getItem('list') === null) {
    //     var list = [];
    // }
    // else {
    //     var list = localStorage.getItem('list')
    // }
    // console.log(city)
    // var cityArr = $.makeArray(city)
    // list.push(cityArr);
    // localStorage.setItem("list", list);

    // var ul = $('<ul></ul>')
    // ul.innerHTML = city
    // document.getElementById('list').appendChild(ul);
    // console.log(list)

    // list.forEach(function (list) {
    //     var li = $('<li></li>');
    //     ul.append(li);
    //     li.innerHTML += list;
    // })
    // $(".search-list").prepend(city)
})

