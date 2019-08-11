function myMap() {
  var mapProp = {
    center: new google.maps.LatLng(59.93859745, 30.32273805),
    zoom: 18,
  };
  var map = new google.maps.Map(document.getElementById("googleMap"), mapProp)
  var marker = new google.maps.Marker({
    position: mapProp.center,
    icon: '../img/map-pin.png'
  });
  marker.setMap(map);
}
