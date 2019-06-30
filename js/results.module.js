'use strict';



const resultsModule = (function () {

  let _render;

  function newSearch(state) {
    $('#getNewResults').submit(function (event) {
      event.preventDefault();
      let searchCity = $('#cityName').val();
      $(".spinner-wrapper").removeClass("hidden");
      apiModule.getBreweries(searchCity)
        .then(locations => {
          state.locations = locations
          state.currentCity = searchCity
          console.log(state)
          _render(state);
          $(".spinner-wrapper").addClass("hidden")
        })
        .catch(err => {
          // handle error
        })
    })
  }

  function initiate(resultsRender) {
    _render = resultsRender;

  }

  function drawerToggle(state) {
    $('#toggle-nav').click(function () {
      const newState = {
        ...state,
        drawerOpen: !state.drawerOpen
      };
      _render(newState);
    });
  }

  function removeLocation(state) {

    $('.resultsListNav').on('click', '.removeBtn', function () {

      const dataId = $(this).closest('li').data('id');

      // FLAG - be careful of implicit type conversion in filter. remember to change when we get real results from api.
      const updatedLocations = state.userLocations.filter(location => location.id !== dataId);

      const newState = {
        ...state,
        userLocations: updatedLocations
      }
      console.log("remove location", newState)

      _render(newState)

    });

  }

  function renderLocation(location) {
    return `
      <li data-id='${location.id}'>
        <div id="li-container">
        <div>
          <a href="${location.website}" target="blank">${location.name}</a><br>
          ${location.streetAddress} <br>
          ${location.phoneNumber} <br>
          ${location.established} <br>
        </div>
        <div id="trashCan"><i class="fa fa-trash fa-2x removeBtn" aria-hidden="true"></i></div>
        </div>
      </li>    
    `
  }


  function renderNavDrawer(state) {

    const userLocations = state.userLocations.map(renderLocation).join('')
    const isOpen = $(window).width() > 880 ? true : state.drawerOpen
    return `
       <nav id="drawer" class="${isOpen ? 'open' : ''}">
          <button id="js-create-route" class="resultsPageButton" type="button">Create Route</button>
            <ul class="resultsListNav">
            ${userLocations}
            </ul>
      </nav> `
  }

  function renderHeader() {
    return `
        <header class="main-header">
          <form id="getNewResults">
            <i id="toggle-nav" class="fa fa-bars fa-2x"></i>
            <input class="resultsPageSearch city-name-input" id="cityName" type="text" placeholder="Miami, Los Angeles, New york" required>
            <button id="submitButton" class="resultsPageFBSubmit city-name-search" type="submit" value="search">Find Breweries</button>
          </form>
        </header>
    `
  }

  function handleCreateRoute(state) {
    $('#js-create-route').click(function (e) {
      mapModule.createRoute(state.userLocations)
    })

  }

  function renderPage(state) {

    const header = renderHeader();
    const navDrawer = renderNavDrawer(state);

    const page = header + navDrawer;

    $('#root').html(page)
    drawerToggle(state);
    removeLocation(state);
    newSearch(state);
    handleCreateRoute(state);
    mapModule.initiate(_render, state);
    mapModule.renderMarkers(state);
    $('#map-container').show();

  }

  return {
    render: renderPage,
    initiate,

  }
})();

$(resultsModule.initiate);