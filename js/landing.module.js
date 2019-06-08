'use strict'
// landing module is our variable for our landing page which holds a self invoking function which 
// declares _render as a variable and holds all of our landing pages functions.
const landingModule = (function () {
  let _render;

  //this handlenextpage function takes in our state and sets an event listener to our submit button 
  // which changes the current page of of state to our results page.
  function handleSubmit(state) {
    $('#getResults').submit(function (event) {
      event.preventDefault();
      let searchCity = $('#cityName').val(); // start spinner

      apiModule.getBreweries(searchCity)
        .then(locations => { 
          state.locations = locations
          state.currentPage = 'results';
          _render(state);
          //need to show that request is in process loading spinner? 
        })
        .catch(err => {
          // handle error
        })
      })
  }

  function initiate(mainRender) {
    _render = mainRender;
  }

  function renderPage(state) {
    $('#map-container').hide();
    const html = `
      <div class="lp-container">
        <figure>
            <img class="beerLogo" src="images/beerLogo.png" alt="Brew App Logo">
        </figure>
        <h1>Enter a city name to begin!</h1>
        <form id="getResults">
          <input class="landingPageSearch city-name-input" id="cityName" type="text" placeholder="Miami, Los Angeles, New york" required>
          <button id="submitButton" class="landingPageButton city-name-search" type="submit" value="search">Find Breweries</button>
        </form>
      </div>
    `
    $('#root').html(html)
    handleSubmit(state);
  }

  return {
    render: renderPage,
    initiate

  }
})();

$(landingModule.initiate);


