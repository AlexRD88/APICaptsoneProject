'use strict'

const mapModule = (function () {

  let _render;
  let map;

  function _renderContent(location) {

    return `
      <li data-id='${location.id}'>
        <a href="${location.website}" target="blank">${location.name}</a><br>
        ${location.streetAddress} <br>
        ${location.phoneNumber} <br>
        <i class="far fa-plus-square fa-2x addBtn" data-add-location></i>
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
      infowindow.open(map, marker);

    });
    google.maps.event.addListener(map, "click", function (e) {
      infowindow.close(e);

    });

    return marker;


  }

  function _renderMarkers(state) {
    const locationMarkers = state.locations.map(_makeMarker)


  }

  function _handleAddLocation(state) {
    $('#map').on('click', '[data-add-location]', function () {
      const dataId = $(this).closest('li').data('id');
      const addedLocation = state.locations.find(function (location) {
        return dataId === location.id
      })
      const newState = {
        ...state,
        userLocations: [...state.userLocations, addedLocation]
      }

      state.userLocations.push(addedLocation);
      _render(state);

    })
  }


  function initiate(mapRender, state) {
    if (map) {
      return;
    }

    _render = mapRender;
    
    

    let centerLocation = {
      lat: state.locations[0].latitude,
      lng: state.locations[0].longitude
    };
   console.log(centerLocation)
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: centerLocation
    });

    _handleAddLocation(state);
  }


  return {
    renderMarkers: _renderMarkers,
    initiate
  }
})();