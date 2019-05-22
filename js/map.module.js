const mapModule = (function () {

  let _render;

  function initiate(mapRender) {
    _render = mapRender;
  }

  function renderMap() {

    return `
              <section class="map-section">
                <div id="map"></div>
              </section>
              `
  }
  

  function initMap() {
    let miami = {
      lat: 25.7617,
      lng: -80.1918
    }
    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: miami
    });

    let contentString = "filler text goes here"

    let infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 200
    });

    let marker = new google.maps.Marker({
      position: miami,
      map: map,
      title: 'Miami, Florida'
    });
    marker.addListener('click', function () {
      infowindow.open(map, marker);
    });
  }

  function renderPage() {
    const renderMap = renderMap();
    const initMap = initMap();
    const map = renderMap + initMap;

    $('#root').html(map)

  }

  return {
    renderPage,
    initiate
  }
})();

$(mapModule.initiate);