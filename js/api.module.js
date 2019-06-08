'use strict'

const apiModule = (function () {



  function watchSubmitForm() {
    console.log("watchsubmit ran")
    $('#getResults').submit(e => {
      e.preventDefault();
      let searchCity = $('#cityName').val();
      getBreweries(searchCity);
    });

  }

  function getBreweries(searchCity) {

    const url = `https://cors-anywhere.herokuapp.com/http://api.brewerydb.com/v2/locations/?locality=${searchCity}&key=f099de1efb32c7a5500f54ef59c38e66&locationType=micro`

    // const promise = new Promise((resolve, reject) => {
    //   $.getJSON(url)
    //     .done(resolve)
    //     .fail(reject)
    // })
    // return promise

    return fetch(url)
      .then(response => {
        if (response.ok) {

          return response.json()
        }
      })
      .then(responseJson => formatLocations(responseJson.data))
      .catch(err => {
        console.log(err);
        throw err
      });

  }


  //format results for map  module.
  function formatLocations(locations) {
    
    return locations.map(location => {
      return {
        website: location.website || location.brewery.website,
        name: location.brewery.name,
        streetAddress: location.streetAddress || "",
        latitude: location.latitude,
        longitude: location.longitude,
        phoneNumber: location.phone || "",
        established: "Est. " + location.brewery.established || "",
        id: location.id
      }

    })

  }
  return {
    getBreweries

  }

})();