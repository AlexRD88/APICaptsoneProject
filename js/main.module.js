// MAIN MODULE

// function render(state) {
//     if(state.currentPage === 'list') {
//       listModule.render(state)
//     } else if (state.currentPage === 'listDetail') {
//       renderDetailPage(state);
//     }
// }

// function main() {
//   render(STORE);
// }

// $(main);


// #1
// function createModule(argument) {
//   return {  
//     test: argument
//   }
// }

// const mainModule = createModule("string");
const STORE = {
  currentPage: 'landing',
  userLocations: [
    {
      url: 'http://www.concretebeachbrewery.com',
      name: 'Concrete Beach Brewery',
      location: '325 NW 25th St',
      phoneNumber: '305 972 3744',
      id: '1'
    },
    {
      url: 'http://www.concretebeachbrewery.com',
      name: 'Concrete Beach Brewery',
      location: '325 NW 25th St',
      phoneNumber: '305 972 3744',
      id: '2'
    },
    {
      url: 'http://www.concretebeachbrewery.com',
      name: 'Concrete Beach Brewery',
      location: '325 NW 25th St',
      phoneNumber: '305 972 3744',
      id: '3'
    }
  ]
}
// #2
const mainModule = (function (argument) {
  // PRIVATE
  // defined by function scope
  function render(state) {
    if (state.currentPage === 'landing') {
      landingModule.render(state);
    } else if (state.currentPage === 'results') {
      // render results module
      resultsModule.render(state);
    }
  }
  // inside function scope
  function run() {
    landingModule.initiate(render);

    render(STORE)
  }

  // PUBLIC INTERFACE
  // this return is assigned to mainModule
  return {
    run: run,
  }
})();

$(mainModule.run);