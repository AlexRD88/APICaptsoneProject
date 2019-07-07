'use strict'

const mapModule = (function () {

  let _render;
  let map;
  let directionsService;
  let directionsDisplay;


  function _renderContent(location) {

    return `
      <li data-id='${location.id}' class="markerInfoWindows">
        <a href="${location.website}" target="blank">${location.name}</a><br>
        ${location.streetAddress} <br>
        ${location.phoneNumber} <br>
        ${location.established} <br>
        <i class="fa fa-beer fa-2x addBtn" data-add-location id="beerGlass"></i>
      </li>    
    `
  }

  function _makeInfoWindow(contentString) {
    return new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 200
    });
  }

  function _makeMarker(location) {

    const contentString = _renderContent(location);
    const infowindow = _makeInfoWindow(contentString);
    const latLng = {
      lat: location.latitude,
      lng: location.longitude
    };

    let marker = new google.maps.Marker({
      position: latLng,
      map: map,
      title: `${location.name}`
    });

    marker.addListener('click', function () {
      infowindow.close();
      infowindow.open(map, this);

    });
    google.maps.event.addListener(map, "click", function (e) {
      infowindow.close(e);
    });

    return marker;
  }

  function _renderMarkers(state) {
    const locationMarkers = state.locations.map(_makeMarker)
    _handleAddLocation(state);
    geocodeAddress(state.currentCity)
      .then(location => {
        map.setCenter(location);
      })
      .catch(error => {
        console.log(error)
      })

  }

  function _handleAddLocation(state) {
    $('#map').on('click', '[data-add-location]', function () {
      const dataId = $(this).closest('li').data('id');
      const addedLocation = state.locations.find(function (location) {
        return dataId === location.id
      })
      if (addedLocation) {
        const newState = {
          ...state,
          userLocations: [...state.userLocations, addedLocation]
        }
        _render(newState);
      }

    })
  }

  function geocodeAddress(address) {
    let geocoder = new google.maps.Geocoder();
    return new Promise((resolve, reject) => {
      geocoder.geocode({
        'address': address
      }, function (results, status) {
        if (status === 'OK') {
          resolve(results[0].geometry.location);
        } else {
          reject(console.log('Geocode was not successful for the following reason: ' + status));
        }
      });
    })

  }

  function initiate(mapRender, state) {
    if (map) {
      return;
    }

    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: {
        lat: 0,
        lng: 0
      },
      styles: [{
        "featureType": "all",
        "elementType": "all",
        "stylers": [{
            "visibility": "on"
          },
          {
            "hue": "#ffaa00"
          }
        ]
      }]
    });

    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer({
      map: map,
      suppressMarkers: true
    });
    directionsDisplay.setPanel(document.getElementById('directions-display'));


    _render = mapRender;
    let address = state.currentCity;
    geocodeAddress(address)
      .then(location => {
        map.setCenter(location)
      })
  }

  function generateWaypoints(userLocations) {
    return userLocations.map(function (location) {
      return {
        location: new google.maps.LatLng(location.latitude, location.longitude),
        stopover: true
      }
    });
  }

  function createRoute(userLocations) {
    let waypts = generateWaypoints(userLocations);

    const removeOrigin = waypts.shift();
    const removeDestination = waypts.pop();

    const origin = {
      lat: userLocations[0].latitude,
      lng: userLocations[0].longitude
    }
    const destination = {
      lat: userLocations.slice(-1)[0].latitude,
      lng: userLocations.slice(-1)[0].longitude
    }

    directionsService.route({
      origin: origin,
      destination: destination,
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: 'DRIVING'
    }, function (response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      } else {
        console.log('Directions request failed due to ' + status);
      }
    })

  }



  return {
    renderMarkers: _renderMarkers,
    initiate,
    createRoute

  }
})();