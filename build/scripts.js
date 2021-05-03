const apiKey = 'Bearer RR7CdGkIgHbkAg0AEvTn0y4CZssHOyXchYdmcRWbn1d0xe7WQERLK7C6TvcgH3-C3Z9u5kF6bfgY0o735IiF_Gx5UrqEHBDOn-7YR2787Znrij9yTW-7fQFpEa98YHYx';
const yelpSearchUrl = 'https://api.yelp.com/v3/businesses/search';
const corsAnywhere = 'https://cors-anywhere.herokuapp.com';
const requestUrl = corsAnywhere + '/' + yelpSearchUrl;

function processZipCode() {
    const zipCodeInput = document.getElementById('zipcode-input');
    const zipCode = zipCodeInput.value;
    apiCall(zipCode);
}

function apiCall(zipCode) {
    var requestObj = {
        url: requestUrl,
        data: { term: 'restaurants', location: zipCode },
        headers: { 'Authorization': apiKey },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('AJAX error, jqXHR = ', jqXHR, ', textStatus = ', textStatus, ', errorThrown = ', errorThrown);
        }
    }
    $.ajax(requestObj)
        .done(function(response) {
            chooseRestaurant(response);
        })
}

function chooseRestaurant(restaurants){
    const randomNumber = Math.floor((Math.random() * 20));
    const selectedRestaurant = restaurants['businesses'][randomNumber];
    letThemKnow(selectedRestaurant);
}
function makeAddress(selectedRestaurant) {
    const restaurantLocation = selectedRestaurant.location.display_address;
    const restaurantLocationLength = restaurantLocation.length;
    let restaurantLocationString = '';
    for (i=0; i<restaurantLocationLength; i++) {
        let currentLine = restaurantLocation[i] + '<br/>'
        restaurantLocationString += currentLine;
    }
    return restaurantLocationString;
}
function letThemKnow(selectedRestaurant){
    const selectedRestaurantAddress = makeAddress(selectedRestaurant);
    const selectedRestaurantName = selectedRestaurant['name'];
    const resultsDiv = document.getElementById('start-hidden');
    resultsDiv.style.opacity = 1;
    const outputName = document.getElementById('output-name');
    outputName.innerHTML = selectedRestaurantName;
    const outputAddress = document.getElementById('output-address');
    outputAddress.innerHTML = selectedRestaurantAddress;
}

function handleSubmit() {
    processZipCode();
}

// todos
/*
make sure it's open, if not choose a new restaurant
add support for text string locations
add non-us location support 
add allergies and likes/dislikes
option to save your preferences via a user account 
    take a quick quiz to determine preferences
add auto-detect location
add 'get directions'
add map 
add pics
add cta to do something after you get your results
add ratings and reviews
filter out chains?
github repo w/ readme
rebuild using react
host this on github pages or heroku or
maybe add some sort of ads or monetization, or a coffee link
price selector
*/