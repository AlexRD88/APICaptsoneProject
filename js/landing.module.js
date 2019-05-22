// 'use strict'

// //Fetch City results and display

// const searchUrl = (cityName) => {
//     return (`https://api.openbrewerydb.org/breweries?by_city=${cityName}`);
// }

// //listen for city input and format url fetch

// function getBreweries() {
//     let cityName = $('.city-name-input').val();

//     let url = searchUrl(cityName);

//     fetch(url).then(response => {
//         if (response.ok) {
//             return (response.json());
//         }
//         throw new Error(response.statusText);
//     })
//     .then(responseJson => {
//         displayResults(responseJson);
//       })
//     .catch(error => alert(`Error!`));
// }


// function displayResults(responseJson) {
//     $('.js-results-list').empty();
//     for (let i = 0; i < responseJson.length; i++) {
//         $('.js-results-list').append(
//            `<li>
//                 <h3>${responseJson[i].name}</h3>
//                 <a href='${responseJson[i].website_url}'>Website</a>
//             </li>`);
//       }
//       $('.js-results').removeClass('hidden');
//     }

//     // listen for search button

//     function watchForm() {
//       $('.city-name-search').on('submit', event => {
//         event.preventDefault();
//         getBreweries();
//       });
//     }

const landingModule = (function () {
  let _render;

  function handleNextPage(state){
    $('#getResults').submit(function(event){
      event.preventDefault();

      state.currentPage = 'results';

      _render(state);
    })
  }

  function initiate(mainRender) {
    _render = mainRender;
  }

  function renderPage(state) {
    const html = `
      <div class="lp-container">
        <figure>
            <img class="beerLogo" src="images/beerLogo.png" alt="Brew App Logo">
        </figure>
        <h1>Enter a city name to begin!</h1>
        <form id="getResults">
          <input class="landingPageSearch city-name-input" type="text" placeholder="Miami, Los Angeles, New york" required>
          <button id="submitButton" class="landingPageButton city-name-search" type="submit" value="search">Find Breweries</button>
        </form>
      </div>
    `
    $('#root').html(html)
    handleNextPage(state);
  }

  return {
    render: renderPage,
    initiate

  }
})()

$(landingModule.initiate);

