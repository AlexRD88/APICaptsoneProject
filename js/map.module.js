// add locations array to state.
// ensure that the shape of the location objects in that array are matching how were using the location object.


const mapModule = (function () {

  let _render;
  let map;

  function _renderContent(location) {
  
    return `
      <li data-id='${location.id}'>
        <a href="${location.website}" target="blank">${location.name}</a><br>
        ${location.streetAddress} <br>
        ${location.phoneNumber} <br>
        <i class="far fa-plus-square fa-2x addBtn"></i>
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
      lat: Number(`${location.latitude}`),
      lng: Number(`${location.longitude}`)
    };
    
    let marker = new google.maps.Marker({
      position: latLng,
      map: map,
      title: `${location.name}`
    });
    

    marker.addListener('click', function () {
      infowindow.open(map, marker);
    });
    return marker;

  }

  function _renderMarkers(state) {
    const locationMarkers = state.locations.map(_makeMarker)
    // return `${locationMarkers}`
  }


  function initiate(mapRender, elId, state) {
    if (map) {
      return;
    }

    _render = mapRender;


    let miami = {
      lat: 25.7617,
      lng: -80.1918
    }
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: miami
    });

    // let contentString


    // let infowindow 

    // let marker 
  }

  return {
    renderMarkers: _renderMarkers,
    initiate
  }
})();

$(mapModule.initiate);