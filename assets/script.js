console.log("linked to html")

//API key
const APIkey = "db564efd201bdbb52479e58ddd22fc02"


//dates
var current = moment().format('ll');
$('.currentDate').append(current)



//when you click on City Search
$('#find-city').on('click', function (event) {
    //prevent submit button from submitting the form
    event.preventDefault();

    var city = $('#city-input').val();
    
    //run the function to search the city
    citySearch(city);

  })
//create function to search for the city
  function citySearch(city) {
    console.log("Searching for " + city)
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIkey;
    //pull from API
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(callCity)
//after you pull from API, record responses and append appropriately
}
function callCity(response) {
    console.log("test func");
    console.log(response);

    var icon = response.list[0].weather[0].icon
    console.log(icon)
    var iconURL = "http://openweathermap.org/img/w/" + icon + ".png";

    //append city name
    $('.city-name').text(response.city.name + " ")
    $('.icon').attr('src', iconURL)
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

    //create separate function for UV index since the API call is different
    get_uv_index(lat, lon);

    //create five day weather forcast
    var date = 1
    for (var i = 1; i < 6; i++) {
        var futureDay = moment().add(i, 'days').format('ll');
        // var day = JSON.parse($(".date" + i))
        $('#date' + i).empty();
        $('#date' + i).append(futureDay)
        console.log(futureDay)


        //add icon
        var iconFut = response.list[i].weather[0].icon
        var iconURLFut = "http://openweathermap.org/img/w/" + iconFut + ".png";
        console.log(iconURLFut)
        $('#icon' + i).attr('src', iconURLFut)

        //add temp
        var tempFut = ("Temp: " + JSON.stringify(response.list[i].main.temp) + " °F")
        console.log(tempFut)
        $('#temp' + i).empty();
        $('#temp' + i).append(tempFut)

        //add humidity 
        var humidFut = ("Humidity: " + JSON.stringify(response.list[i].main.humidity) + " %")
        console.log(humidFut)
        $('#humid' + i).empty();
        $('#humid' + i).append(humidFut)


    }



    //create old searches list in local storage
    if (localStorage.getItem('#list') === null) {
        var searchList = []
    }
    else {
        var searchList = JSON.parse(localStorage.getItem('#list'))
    }

    var citySearched = response.city.name
    searchList.push(citySearched)
    console.log(searchList)
    localStorage.setItem('#list', JSON.stringify(searchList))

    
    // var ul = document.createElement("ul");
    $('#list').empty();
    // $('#list').append(ul);

    //create a new list item for each city search and add to beginning of list
    searchList.forEach(function (searched_city) {
        console.log(searched_city)
        var li = document.createElement("li");
        var jq_li = $("<li>" + searched_city + "</li>")
        jq_li.attr("onClick", "citySearch('" + searched_city + "')" )
        // The below is applying these to ALL li items, not just the one we are creating
        // $("li").attr("onClick", "citySearch('" + searched_city + "')" )
        $("li").addClass("recent-search")
        // ul.prepend(li);
        $('#list').prepend(jq_li)
        // ul.prepend(jq_li);
        li.innerHTML += searched_city



    })
}

//UV index call
function get_uv_index(lat, lon) {

    var UVURL = "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=" + APIkey + "&lat=" + lat + "&lon=" + lon;
    $.ajax({
        url: UVURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        $('.UV').text("UV Index: " + JSON.stringify(response[0].value))

        var UVIndex = JSON.stringify(response[0].value)
        console.log(UVIndex)

        //add class to UV to add color later
        if (UVIndex < 3) {
            $('.UV').attr('class', 'UVlow btn')
        }
        else if (UVIndex >= 3 && UVIndex < 6) {
            $('.UV').attr('class', 'UVmed btn')
        }
        else if (UVIndex >= 6 && UVIndex < 8) {
            $('.UV').attr('class', 'UVhigh btn')
        }
        else if (UVIndex >= 8 && UVIndex < 11) {
            $('.UV').attr('class', 'UVvery btn')
        }
        else if (UVIndex >= 11) {
            $('.UV').attr('class', 'UVext btn')
        }
    })
}









