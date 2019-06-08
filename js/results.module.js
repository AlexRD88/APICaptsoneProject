'use strict';



const resultsModule = (function () {

  let _render;

  function newSearch(state) {
    $('#getNewResults').submit(function (event) {
      event.preventDefault();
      let searchCity = $('#cityName').val(); // start spinner

      apiModule.getBreweries(searchCity)
        .then(locations => {
          state.locations = locations
          _render(state);
         
          //need to show that request is in process loading spinner? 
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
        <a href="${location.website}" target="blank">${location.name}</a><br>
        ${location.streetAddress} <br>
        ${location.phoneNumber} <br>
        ${location.established} <br>
        <i class="far fa-minus-square fa-2x removeBtn"></i>
      </li>    
    `
  }


  function renderNavDrawer(state) {
    const userLocations = state.userLocations.map(renderLocation).join('')

    return `
       <nav id="drawer" class="${state.drawerOpen ? 'open' : ''}">
          <button class="resultsPageButton" type="button"><a href="details.html">Create Route</a></button>
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
 


  function renderPage(state) {

    const header = renderHeader();
    const navDrawer = renderNavDrawer(state);

    const page = header + navDrawer;

    $('#root').html(page)
    drawerToggle(state);
    removeLocation(state);
    newSearch(state);
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





// const googleMapsScript = document.createElement('script');
// googleMapsScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBJxFK2RGheNN2uiac-86L-5YGH_-M2eAA&callback=initMap';
// document.head.appendChild(googleMapsScript);




// render basic google map




// apiKey = 'f099de1efb32c7a5500f54ef59c38e66';
// searchURL = "http://api.brewerydb.com/v2/locations";

//display get results


// function watchForm() {
//     $('form').on('submit', function () {
//         event.preventDefault();
//         const cityName = $('.city-name-input').val();
//         $('#js-resultsList').empty();
//         getBreweries(cityName);
//     });
// }

// function getBreweries(cityName) {
//     fetch(`http://api.brewerydb.com/v2/locations/?key=f099de1efb32c7a5500f54ef59c38e66&locality=${cityName}`,{mode:'no-cors'})
//         .then(response => response.Json())
//         .then(responseJson => displayResults(responseJson, cityName))
//         .catch(error => alert('Something went wrong. Try again later.'));
// }

// function displayResults(responseJson) {
//     $("#js-resultsList").empty();
//     for (let i = 1; i < responseJson.data.length; i++) {
//         $("#js-resultsList")
//             .append(`
//                     <h3>${responseJson.data[i].name}</h3>
//                     <h4>${responseJson.data[i].description}</h4>
//                     <a href=" ${responseJson.data[i].website}">Visit Brewery Website</a>
//                     `);
//     }
//     $('#js-resultsList').removeClass('hidden');
// }

// function main() {
//     console.log('App loaded. Waiting for submit.');
//     watchForm();
// }

// $(main);

// const STORE = {
//   currentPage: 'list',
//   // landing, results, details
//   navDrawerOpen: false,
//   currentBrewery: null,
//   allBreweries: [],
//   selectedBrewery: []
// }

// LIST MODULE
// const listModule = (function(){

//   function renderItem(item) {
//     return `<li>${item.content}</li>`
//   }

//   function renderListPage(state) {
//     const renderedItems = state.list.map(renderItem);
//     const renderedList = `<ul>${renderedItems}</ul>`;

//     $('#root').html(renderedList);

//     handleDeleteItem(state);
//   }

//   function handleDeleteItem(state) {
//     $('li').click,'.removeBtn'(function() {
//       const content = $(this).text();
//       const newList= state.list.filter(item => item.content !== content);
//       const newState = { ...state, list: newList };

//       render(newState);
//     })
//   }

//   function handlePageChange(state) {
//     $('#details').click(function() {
//       state.currentPage = 'listDetail';
//       render(state);
//     })
//   }

//   return {
//     render: renderListPage,
//     handlePageChange

//   }
// })();