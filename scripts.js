// 'use strict';

// const apiKey = 'f099de1efb32c7a5500f54ef59c38e66';
// const searchURL = "http://api.brewerydb.com/v2/locations";

// //Form Event Listener
// $(document).ready(function () {
//     watchSubmitForm();
// });

// //Watch the Submit Form Listeners
// function watchSubmitForm() {
//     $('.city-name-search').submit(e => {
//         e.preventDefault();
//         let searchCity = $('.city-name-input').val();
//         getBreweries(searchCity);
//     });
// }

// //Format search query through Params
// function formatQueryParams(params) {
//     const queryItems = Object.keys(params).map(
//         key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
//     );
//     return queryItems.join('&');
// }
// console.log(formatQueryParams);

// //GET Request to National Parks Service API
// function getBreweries(query) {
//     const params = {
//         locality: query,
//         api_key: apiKey
//     };

//     const queryString = formatQueryParams(params);
//     const url = searchURL + '?' + queryString;

//     //Catch error
//     console.log(url);

//     fetch(url)
//         .then(response => {
//             if (response.ok) {
//                 return response.json();
//             }
//         })
//         .then(responseJson => displayResults(responseJson))
//         .catch(err => {
//             console.log(err);
//             alert("Something went wrong, try again!");
//         });
// }

// //Show the Results
// function displayResults(responseJson) {
//     $("#js-resultsList").empty();
//     for (let i = 1; i < responseJson.data.length; i++) {
//         $("#js-resultsList").append(`
//         <br> 
//         <h3 class="results-title">${[i] + '.' + ' '}${responseJson.data[i].name}</h3>
//         <div class= "row>
//         <h4 class="results-description">${responseJson.data[i].description}</h4>
//         <br>
//         <br>
//         <a href=" ${responseJson.data[i].website}">Visit Brewery Website</a>
//         `);
//     }
//     $('#js-resultsList').removeClass('hidden');
// }

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
//     // function main() {
//     //     $('#toggle-nav').click(function(){
//     //         $('#drawer').toggleClass('open');
//     //     });
//     // };

//     // $(main);

// // module design pattern
// // immediately invoked function expression (IIFE)

// // API = Application Program Interface

// const breweryModule = (function() {
//     // private
//     function _getBreweries() {

//     }

//     function _renderBrewery() {

//     }

//     function _displayResults() {

// //     }

// //     // public
// //      function renderBreweryPage() {

// //      }


// //     // public interface
// //     return {
// //         render: renderBreweryPage
// //     }
// // })()

// // breweryModule.render();

// // const myModule = (function() {
// // private



