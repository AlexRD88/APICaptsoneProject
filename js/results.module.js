'use strict';
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









const resultsModule = (function () {
  let _render;

  function newSearch(state) {
    $('#findBrew').submit(function (event) {
      event.preventDefault();

      state.currentPage = 'results';

      _render(state);
    })
  }

  function initiate(resultsRender) {
    _render = resultsRender;
    
  }

  function drawerToggle() {
    $('#toggle-nav').click(function () {
      $('#drawer').toggleClass('open');
    });
  }

  function removeLocation(state){
   
    $('.resultsListNav').on('click', '.removeBtn',  function() {
      const dataId =  $(this).closest('li').attr('.data-id');
      const updatedLocations = state.userLocations.filter((location) => location.id !== dataId );
      const newState = {...state, userLocations: updatedLocations};
      _render(newState);
    });

  }

  function renderLocation(location) {
    return `
      <li data-id='${location.id}'>
        <a href="${location.url}" target="blank">1.${location.name}</a><br>
        ${location.location} <br>
        ${location.number} <br>
        <i class="far fa-minus-square fa-2x removeBtn"></i>
      </li>    
    `
  }
  

  function renderNavDrawer(state) {
    const userLocations = state.userLocations.map(renderLocation).join('')

    return `
       <nav id="drawer">
          <button class="resultsPageButton" type="button"><a href="details.html">Create Route</a></button>
            <ul class="resultsListNav">
            ${userLocations}
            </ul>
      </nav>
    `
  }

  function renderHeader() {
    return `
        <header class="main-header">
          <form>
            <i id="toggle-nav" class="fa fa-bars fa-2x"></i>
            <input class="navBarSearch city-name-input" type="text" placeholder="Miami, Los Angeles, New york" required>
            <button class="navBarButton city-name-search" type="submit" value="search">Find Breweries!</button>
          </form>
        </header>
    `
  }

  function renderPage(state) {
    const header = renderHeader();
    const navDrawer = renderNavDrawer(state);
    const page = header + navDrawer;

    $('#root').html(page)
    drawerToggle(); 
    removeLocation(state);
  }

  return {
    render: renderPage,
    initiate
  }
})();

$(resultsModule.initiate);



