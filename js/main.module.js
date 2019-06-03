//this is our data variable that holds our information about the brewing companies and is also 
// equal to our "state" of the page.

const STORE = {
  currentPage: "landing",
  drawerOpen: false,
  locations: [
    {
      website: "http://www.MIA.beer",
      name: "M.I.A. Beer Co",
      streetAddress: "10400 NW 33rd Street",
      latitude: 25.803728,
      longitude: -80.366022,
      phoneNumber: "(305) 567-5550",
      id: "1"
    },
    {
      website: "http://lincolnsbeardbrewing.com",
      name: "Lincoln's Beard Brewing",
      streetAddress: "7360 SW 41st St",
      latitude: 25.7321173,
      longitude: -80.3143611,
      phoneNumber: "(305) 567-5550",
      id: "2"
    }

  ],
  userLocations: [
    {
      website: "http://www.concretebeachbrewery.com",
      name: "Concrete Beach Brewery",
      streetAddress: "325 NW 25th St",
      phoneNumber: "305 972 3744",
      id: "1"
    },
    {
      website: "http://www.concretebeachbrewery.com",
      name: "Concrete Beach Brewery",
      streetAddress: "325 NW 25th St",
      phoneNumber: "305 972 3744",
      id: "2"
    },
    {
      website: "http://www.concretebeachbrewery.com",
      name: "Concrete Beach Brewery",
      streetAddress: "325 NW 25th St",
      phoneNumber: "305 972 3744",
      id: "3"
    }
  ]
}
// #2 our main module is a variable that is equal to a self invoking function that holds all of 
// our functions for the page.
const mainModule = (function (argument) {
  // PRIVATE
  // defined by function scope
  // our render function takes in our state as an argument and runs an if else which tells us which 
  //page to render. if the state of the page is equal to landing it renders the landing module.
// if the state of the current page is equal to results we render the results module
  function render(state) {
    if (state.currentPage === 'landing') {
      landingModule.render(state);
    } else if (state.currentPage === 'results') {
      // render results module
      resultsModule.render(state);
      
    }
  }
  // inside function scope
  // our run function is the first to start after page is fully loaded. it calls our landing modules
  //initiate function which passes in render as an argument. render is also invoked here and passed in
  //our STORE variable which is equal to state.(can that be state as well?)
  function run() {
  
    landingModule.initiate(render);
    resultsModule.initiate(render);
    render(STORE);
  }

  // PUBLIC INTERFACE
  // this return is assigned to mainModule
  // the return is what is publicly available and is used at the end of page loading to start the 
  //run function
  return {
    run: run
  }
})();
//this targets our mainModule in DOM and initiates our run function.
$(mainModule.run);




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